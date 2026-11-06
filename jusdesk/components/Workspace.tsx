"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, GROUPS, TITLE, type Case, type Msg, type Option, type Stage, type Task } from "@/lib/cases";
import { EvidenceTile } from "./EvidenceTile";
import { Icon, type IconName } from "./Icon";

type CaseState = { stage: string; extra: Msg[] };
type Undo = { caseId: string; prev: CaseState; label: string };

const REASONS = ["Wrong address", "Lost in transit", "Disputed delivery", "Early scan", "Left with guard"];

const initial = (): Record<string, CaseState> =>
  Object.fromEntries(CASES.map((c) => [c.id, { stage: c.start, extra: [] }]));

const hasEmail = (c: Case) => c.thread.some((m) => m.kind === "customer" && m.channel === "email");
const channelIcon = (c: Case): IconName => (hasEmail(c) ? "mail" : "chat");
const channels = (c: Case) => {
  const ch = new Set(c.thread.flatMap((m) => (m.kind === "customer" ? [m.channel] : [])));
  return ch.size > 1 ? "Chat + email merged" : ch.has("email") ? "Email" : "Chat";
};
const owner = (s: Stage) => (s.group === "lead" ? "Priya" : s.group === "ai" ? "AI" : "You");
const STATUS: Record<string, string> = { needs: "New", lead: "With your lead", waiting: "Waiting", ai: "Handled by AI", closed: "Closed" };
const groupLabel = (s: Stage) => STATUS[s.group];
const linkIcon = (k: string): IconName => (/refund/i.test(k) ? "card" : /courier/i.test(k) ? "truck" : /lead/i.test(k) ? "user" : "box");

// Free Hugeicons are stroke-only, so the selected nav icon is drawn filled here.
function FilledInbox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M5.2 3.5h13.6c1 0 1.9.7 2.1 1.7L22 12v5.5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V12l1.1-6.8c.2-1 1.1-1.7 2.1-1.7Z" />
      <path d="M2.5 12.5h5.2l1.6 2.6h5.4l1.6-2.6h5.2" fill="none" stroke="var(--rail-on)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}


export function Workspace() {
  const [states, setStates] = useState(initial);
  const [selected, setSelected] = useState("ananya");
  const [confirming, setConfirming] = useState<Option | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<"reply" | "note">("reply");
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [vote, setVote] = useState<Record<string, "up" | "down" | undefined>>({});
  const [undo, setUndo] = useState<Undo | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Record<string, Task[]>>(() => Object.fromEntries(CASES.map((c) => [c.id, c.tasks])));
  const [reasons, setReasons] = useState<Record<string, string | undefined>>(() => Object.fromEntries(CASES.map((c) => [c.id, c.reasonTag])));
  const [answers, setAnswers] = useState<Record<string, { q: string; a: string } | undefined>>({});
  const [ask, setAsk] = useState("");
  const [newTask, setNewTask] = useState<string | null>(null);
  const threadEnd = useRef<HTMLDivElement>(null);

  const ordered = useMemo(
    () => GROUPS.flatMap((g) => CASES.filter((c) => c.stages[states[c.id].stage].group === g.id)),
    [states],
  );
  const c = CASES.find((x) => x.id === selected)!;
  const st = states[c.id];
  const stage = c.stages[st.stage];
  const atStart = st.stage === c.start;
  const thread = [...c.thread, ...st.extra];

  const key = c.id + st.stage + mode;
  const draft = drafts[key] ?? (mode === "reply" ? stage.draft ?? "" : "");
  const open = stage.group !== "closed" && stage.group !== "ai";

  const summaryCard = hidden[c.id] ? (
    <button className="sum-show" onClick={() => setHidden((h) => ({ ...h, [c.id]: false }))}><Icon name="spark" size={14} />Show AI summary</button>
  ) : (
    <div className="sumwrap">
      <section className="sum" aria-label="AI summary">
        <span className="lbl"><Icon name="spark" size={14} />AI summary</span>
        <h3>{c.hook}</h3>
        <p>{c.handoff.join(" ")}</p>
      </section>
      <div className="foot">
        <span>Helpful?</span>
        <button aria-label="Helpful" aria-pressed={vote[c.id] === "up"} className={vote[c.id] === "up" ? "on" : ""} onClick={() => setVote((v) => ({ ...v, [c.id]: v[c.id] === "up" ? undefined : "up" }))}><Icon name="up" size={14} /></button>
        <button aria-label="Not helpful" aria-pressed={vote[c.id] === "down"} className={vote[c.id] === "down" ? "on" : ""} onClick={() => setVote((v) => ({ ...v, [c.id]: v[c.id] === "down" ? undefined : "down" }))}><Icon name="down" size={14} /></button>
        <i />
        <button onClick={() => setHidden((h) => ({ ...h, [c.id]: true }))}>Hide</button>
      </div>
    </div>
  );
  const caseTasks = tasks[c.id];
  const linked = stage.linked ?? c.linked;
  const answer = answers[c.id];

  function select(id: string) {
    setSelected(id);
    setConfirming(null);
    setMode("reply");
    setAsk("");
    setNewTask(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (["TEXTAREA", "INPUT", "SELECT"].includes(t.tagName)) return;
      if (e.key !== "j" && e.key !== "k") return;
      const i = ordered.findIndex((x) => x.id === selected);
      select(ordered[Math.min(ordered.length - 1, Math.max(0, i + (e.key === "j" ? 1 : -1)))].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ordered, selected]);

  // Deep links for demos and review captures: ?case=rohan&stage=failed&confirm=retry
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const cs = CASES.find((x) => x.id === q.get("case"));
    if (!cs) return;
    setSelected(cs.id);
    const sk = q.get("stage");
    if (sk && cs.stages[sk]) {
      const path = Object.keys(cs.stages);
      const extra = path.slice(0, path.indexOf(sk) + 1).flatMap((k) => (k === cs.start ? [] : cs.stages[k].adds ?? []));
      setStates((s) => ({ ...s, [cs.id]: { stage: sk, extra } }));
      const o = cs.stages[sk].options.find((x) => x.id === q.get("confirm"));
      if (o) setConfirming(o);
    }
  }, []);

  useEffect(() => {
    threadEnd.current?.scrollIntoView({ block: "end" });
  }, [selected, st.extra.length]);

  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => setUndo(null), 8000);
    return () => clearTimeout(t);
  }, [undo]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3000);
    return () => clearTimeout(t);
  }, [flash]);

  function goTo(caseId: string, next: string, label?: string) {
    const cs = CASES.find((x) => x.id === caseId)!;
    setStates((s) => {
      const prev = s[caseId];
      if (label) setUndo({ caseId, prev, label });
      return { ...s, [caseId]: { stage: next, extra: [...prev.extra, ...(cs.stages[next].adds ?? [])] } };
    });
    setConfirming(null);
  }

  function act(o: Option) {
    if (o.confirm) setConfirming(o);
    else goTo(c.id, o.next, o.label);
  }

  function send() {
    if (!draft.trim()) return;
    const msg: Msg = mode === "note" ? { kind: "note", who: "You", time: "Now", text: draft } : { kind: "agent", who: "You", time: "Now", text: draft };
    setStates((s) => ({ ...s, [c.id]: { ...s[c.id], extra: [...s[c.id].extra, msg] } }));
    setDrafts((d) => ({ ...d, [key]: "" }));
  }

  function updateTasks(fn: (t: Task[]) => Task[]) {
    setTasks((all) => ({ ...all, [c.id]: fn(all[c.id]) }));
  }

  function msgAction(kind: "copy" | "quote" | "task" | "translate", m: Msg) {
    if (kind === "copy") { navigator.clipboard?.writeText(m.text); setFlash("Copied"); }
    if (kind === "quote") { setMode("reply"); setDrafts((d) => ({ ...d, [c.id + st.stage + "reply"]: `> ${m.text}\n\n` })); }
    if (kind === "task") { updateTasks((ts) => [...ts, { id: `m${Date.now()}`, text: `Follow up: ${m.text.length > 48 ? m.text.slice(0, 48) + "…" : m.text}`, due: "Today" }]); setFlash("Task added to this case"); }
    if (kind === "translate") setFlash("Translate isn't wired up in the prototype");
  }

  function askAI(q: string) {
    if (!q.trim()) return;
    const known = c.asks?.find((x) => x.q === q);
    setAnswers((a) => ({ ...a, [c.id]: { q, a: known?.a ?? "In the prototype, only the suggested questions have answers." } }));
    setAsk("");
  }


  return (
    <>
      <div className="narrow" role="note">
        <div className="logo" aria-hidden="true">J</div>
        <h1>JusDesk is a desktop workspace</h1>
        <p>Open it on a screen at least 1100 px wide to work the queue and a case side by side.</p>
      </div>

      <div className="app">
        <nav className="rail" aria-label="Main">
          <div className="logo" aria-label="JusDesk">J</div>
          <button className="nav on" aria-current="page" title="Queue"><FilledInbox /></button>
          <button className="nav" title="My tasks"><Icon name="tasks" size={18} /></button>
          <button className="nav" title="Waiting"><Icon name="clock" size={18} /></button>
          <button className="nav" title="Search"><Icon name="search" size={18} /></button>
        </nav>

        {/* Queue */}
        <aside className="queue" aria-label="Queue">
          <header className="bar"><b>All tickets</b><span>{ordered.length}</span></header>
          <div className="scroll">
            {GROUPS.map((g) => {
              const items = ordered.filter((x) => x.stages[states[x.id].stage].group === g.id);
              if (!items.length) return null;
              return (
                <section key={g.id}>
                  <h2 className="grp">{g.label}<span>{items.length}</span></h2>
                  {items.map((x) => {
                    const s = x.stages[states[x.id].stage];
                    return (
                      <button key={x.id} className={`row${x.id === selected ? " on" : ""}`} onClick={() => select(x.id)}>
                        <span className="rt">
                          <span className="l1"><b>{x.customer}</b>{s.timeLeft && <em className={s.urgent ?? ""}>{s.timeLeft}</em>}</span>
                          <span className="l2">{x.item.split(",")[0]} · {x.value} · {s.nextStep}</span>
                        </span>
                      </button>
                    );
                  })}
                </section>
              );
            })}
          </div>
        </aside>

        {/* Case */}
        <main className="case" key={c.id}>
          <header className="head">
            <h1>{TITLE}</h1>
            <div className="tags">
              <span><Icon name="box" size={14} />{c.order}</span>
              <span><Icon name="user" size={14} />{c.customer}</span>
              {c.email && <span><Icon name="mail" size={14} />{c.email}</span>}
              {!c.email && <span><Icon name="chat" size={14} />Chat</span>}
              {c.language && <span><Icon name="translate" size={14} />{c.language}</span>}
              {open && stage.timeLeft && <span className={stage.urgent ?? ""}><Icon name="clock" size={14} />{stage.timeLeft === "Now" ? "Reply due now" : `Reply due in ${stage.timeLeft}`}</span>}
            </div>
          </header>

          <div className="thread" aria-label="Conversation">
            <div className="inner">
            {thread.filter((m) => m.kind !== "event").map((m, i, all) => (
              <div key={i} className="grpmsg">
                {(i === 0 || (all[i - 1].day ?? "Today") !== (m.day ?? "Today")) && <p className="day"><span>{m.day ?? "Today"}</span></p>}
                <Message m={m} customer={c.customer} email={c.email} language={c.language} onAction={msgAction} />
                {i === c.thread.filter((x) => x.kind !== "event").length - 1 && summaryCard}
              </div>
            ))}
            <div ref={threadEnd} />
            </div>
          </div>

          {open && (
            <div className="cwrap"><div className={`composer${mode === "note" ? " is-note" : ""}`}>
              <div className="tabs" role="tablist">
                <button role="tab" aria-selected={mode === "reply"} className={mode === "reply" ? "on" : ""} onClick={() => setMode("reply")}>Reply</button>
                <button role="tab" aria-selected={mode === "note"} className={mode === "note" ? "on" : ""} onClick={() => setMode("note")}><Icon name="lock" size={14} />Internal note</button>
              </div>
              <textarea
                aria-label={mode === "note" ? "Internal note" : `Reply to ${c.customer}`}
                value={draft}
                placeholder={mode === "note" ? "Only your team sees this" : `Reply to ${c.customer.split(" ")[0]}`}
                onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) { e.preventDefault(); send(); } }}
              />
              <div className="crow">
                <span className="src">
                  {mode === "reply" && stage.draft && draft === stage.draft ? <><span className="ai">AI</span>Draft from the evidence · sends with your decision, or now</> : "⌘↵ to send"}
                </span>
                {mode === "reply" && <>
                  <button className="gh" onClick={() => setFlash("Rephrase isn't wired up in the prototype")}><Icon name="spark" size={14} />Rephrase</button>
                  <button className="gh" onClick={() => setFlash("Translate isn't wired up in the prototype")}><Icon name="translate" size={14} />Hindi</button>
                </>}
                <button className="gh" aria-label="Attach" onClick={() => setFlash("Attachments aren't wired up in the prototype")}><Icon name="attach" size={14} /></button>
                <button className="pri" onClick={send} disabled={!draft.trim()}>
                  <Icon name={mode === "note" ? "note" : "send"} size={14} />{mode === "note" ? "Add note" : "Send"}
                </button>
              </div>
            </div></div>
          )}
        </main>

        {/* Right panel: AI first, then tasks, linked work, evidence, order */}
        <aside className="panel" aria-label="AI and case details">
          <header className="bar"><b>Details</b></header>
          <div className="scroll">
            <section className="blk">
              <h4>Order details</h4>
              <dl className="dkv">
                <div><dt><Icon name="box" size={14} />Item</dt><dd>{c.item}</dd></div>
                <div><dt><Icon name="card" size={14} />Paid</dt><dd>{c.value} · {c.payment.replace("Prepaid · ", "")}</dd></div>
                <div><dt><Icon name="truck" size={14} />Courier</dt><dd>{c.courier}</dd></div>
                <div><dt><Icon name="chat" size={14} />Language</dt><dd>{c.language ?? "English"}</dd></div>
              </dl>
            </section>
            <section className="blk">
              <div className="card rec">
                {confirming?.confirm ? (
                  <div className="confirm" role="group" aria-label={confirming.confirm.title}>
                    <h3>{confirming.confirm.title}</h3>
                    <dl className="dkv">{confirming.confirm.lines.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                    <p className="policy">{confirming.confirm.note}</p>
                    <div className="btns">
                      <button className="pri" onClick={() => goTo(c.id, confirming.next, confirming.label)}><Icon name="check" size={14} />{confirming.confirm.cta}</button>
                      <button className="sec" onClick={() => setConfirming(null)}>Back</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {atStart && c.rec ? (
                      <>
                        <p className="eyebrow">Recommended <span className={`conf ${c.rec.confidence.toLowerCase()}`}>{c.rec.confidence} confidence</span></p>
                        <h3>{c.rec.title}</h3>
                        <p className="analysis"><b>AI analysis:</b> {c.rec.reasons.map((r) => r.text).join(" ")}</p>
                        <p className="policy"><Icon name="key" size={14} />{c.rec.policy}</p>
                      </>
                    ) : (
                      <>
                        <p className="eyebrow">{stage.status ?? stage.nextStep}</p>
                        {stage.ai && <p>{stage.ai}</p>}
                      </>
                    )}
                    {(stage.options.length > 0 || stage.simulate) && (
                      <div className="btns">
                        {stage.options.map((o) => <button key={o.id} className={o.primary ? "pri" : "sec"} onClick={() => act(o)}>{o.label}</button>)}
                        {stage.simulate && (
                          <button className="proto" onClick={() => goTo(c.id, stage.simulate!.next)} title="Prototype only: simulates an outside event">
                            <Icon name="play" size={12} />{stage.simulate.label}
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <form className="ask" onSubmit={(e) => { e.preventDefault(); askAI(ask); }}>
                <Icon name="ask" size={16} />
                <input placeholder="Ask about this case" value={ask} onChange={(e) => setAsk(e.target.value)} />
              </form>
              {answer ? (
                <div className="answer"><b>{answer.q}</b><p>{answer.a}</p></div>
              ) : c.asks && (
                <div className="chips">{c.asks.map((a) => <button key={a.q} onClick={() => askAI(a.q)}>{a.q}</button>)}</div>
              )}
            </section>

            <section className="blk">
              <h4>Properties</h4>
              <dl className="dkv">
                <div><dt><Icon name="inbox" size={14} />Status</dt><dd>{groupLabel(stage)}</dd></div>
                <div><dt><Icon name="user" size={14} />Owner</dt><dd>{owner(stage)}</dd></div>
                {open && stage.timeLeft && <div><dt><Icon name="clock" size={14} />Reply due</dt><dd className={stage.urgent ?? ""}>{stage.timeLeft === "Now" ? "Now" : `In ${stage.timeLeft}`}</dd></div>}
                {open && c.followUp && <div><dt><Icon name="calendar" size={14} />Follow up</dt><dd>{c.followUp}</dd></div>}
                <div><dt><Icon name="flag" size={14} />Reason</dt><dd>
                  <select className={`pick${reasons[c.id] ? "" : " missing"}`} aria-label="Contact reason" value={reasons[c.id] ?? ""} onChange={(e) => setReasons((r) => ({ ...r, [c.id]: e.target.value || undefined }))}>
                    <option value="">Not set</option>
                    {REASONS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </dd></div>
                <div><dt><Icon name={channels(c).includes("merged") ? "merge" : channelIcon(c)} size={14} />Channel</dt><dd>{channels(c)}</dd></div>
              </dl>
            </section>

            <section className="blk">
              <h4>Linked tickets</h4>
              <dl className="dkv">
                {linked.map(([k, v]) => (
                  <div key={k}><dt><Icon name={linkIcon(k)} size={14} />{k}</dt><dd className={/^(none|not )/i.test(v) ? "mute" : /failed/i.test(v) ? "bad" : ""}>{v}</dd></div>
                ))}
              </dl>
            </section>

            <section className="blk">
              <h4>Tasks and follow-ups <button onClick={() => setNewTask("")}><Icon name="plus" size={14} />Add</button></h4>
              {caseTasks.length === 0 && newTask === null && <p className="hint">No follow-ups on this case.</p>}
              <ul className="tasks">
                {caseTasks.map((t) => (
                  <li key={t.id} className={`${t.ai ? "sug" : ""}${t.done ? " done" : ""}`}>
                    {t.ai ? <Icon name="spark" size={16} /> : (
                      <button className="tick" aria-label={t.done ? "Mark not done" : "Mark done"} onClick={() => updateTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}>
                        <Icon name={t.done ? "checked" : "unchecked"} size={16} />
                      </button>
                    )}
                    <span>{t.text}</span>
                    <em>{t.due}</em>
                    {t.ai && <button className="add" onClick={() => updateTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, ai: false } : x)))}>Add</button>}
                  </li>
                ))}
                {newTask !== null && (
                  <li>
                    <Icon name="unchecked" size={16} />
                    <form onSubmit={(e) => { e.preventDefault(); if (newTask.trim()) updateTasks((ts) => [...ts, { id: `n${Date.now()}`, text: newTask, due: "Today" }]); setNewTask(null); }}>
                      <input autoFocus placeholder="New task, due today" value={newTask} onChange={(e) => setNewTask(e.target.value)} onBlur={() => !newTask.trim() && setNewTask(null)} />
                    </form>
                  </li>
                )}
              </ul>
              {open && <p className="hint">The case stays open until {c.customer.split(" ")[0]} is told the outcome. Sending a reply doesn&apos;t close it.</p>}
            </section>

            <section className="blk">
              <h4>Delivery evidence</h4>
              <div className={`thumbs n${c.evidence.length}`}>{c.evidence.map((e, i) => <EvidenceTile key={i} e={e} />)}</div>
              <p className="hint">Illustrations · demo data</p>
              <dl className="dkv">
                {c.facts.map((f) => <div key={f.label}><dt>{f.icon && <Icon name={f.icon} size={14} />}{f.label}</dt><dd className={f.tone ?? ""}>{f.value}</dd></div>)}
              </dl>
              {c.signals && (
                <div className="signals">
                  <p><Icon name="lock" size={14} />Only your team sees this</p>
                  <ul>{c.signals.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
            </section>

          </div>
        </aside>
      </div>

      {(undo || flash) && (
        <div className="toast" role="status">
          <span>{undo ? `${undo.label} · done` : flash}</span>
          {undo && (
            <button onClick={() => { setStates((s) => ({ ...s, [undo.caseId]: undo.prev })); select(undo.caseId); setUndo(null); }}>
              <Icon name="undo" size={14} />Undo
            </button>
          )}
        </div>
      )}
    </>
  );
}

type MsgAction = "copy" | "quote" | "task" | "translate";

function Actions({ m, onAction, translate }: { m: Msg; onAction: (k: MsgAction, m: Msg) => void; translate?: boolean }) {
  return (
    <div className="acts" role="toolbar" aria-label="Message actions">
      <button title="Quote in reply" onClick={() => onAction("quote", m)}><Icon name="undo" size={14} /></button>
      <button title="Create task from this" onClick={() => onAction("task", m)}><Icon name="tasks" size={14} /></button>
      {translate && <button title="Translate" onClick={() => onAction("translate", m)}><Icon name="translate" size={14} /></button>}
      <button title="Copy" onClick={() => onAction("copy", m)}><Icon name="copy" size={14} /></button>
    </div>
  );
}

function Message({ m, customer, email, language, onAction }: { m: Msg; customer: string; email?: string; language?: string; onAction: (k: MsgAction, m: Msg) => void }) {
  if (m.kind === "event") {
    return (
      <p className="ev">
        {m.ai ? <span className="ai">AI</span> : <Icon name="clock" size={14} />}
        <span>{m.text}</span>
        <time>{m.time}</time>
      </p>
    );
  }
  if (m.kind === "note") {
    return (
      <article className="msg note">
        <p className="who"><Icon name="lock" size={14} /><b>Internal note</b><span>{m.who} · {m.time}</span></p>
        <div>{m.text}</div>
        <Actions m={m} onAction={onAction} />
      </article>
    );
  }
  if (m.kind === "agent") {
    const bot = /assistant/i.test(m.who);
    return (
      <article className={`msg ours${bot ? " bot" : ""}`}>
        <p className="who">{bot && <span className="ai">AI</span>}<b>{m.who}</b><span>{m.time}</span>{m.gloss && <em className="tr"><Icon name="translate" size={14} />Sent in {language ?? "another language"}</em>}</p>
        {bot && m.steps && <Trace steps={m.steps} />}
        {m.gloss ? <><div className="orig" lang="hi">{m.text}</div><div>{m.gloss}</div></> : <div>{m.text}</div>}
        <Actions m={m} onAction={onAction} />
      </article>
    );
  }
  if (m.channel === "email") {
    return (
      <article className="msg theirs mail">
        <p className="who"><b>{customer}</b><span>Email · {m.time}</span></p>
        <hr />
        {m.subject && <h4 className="subj">{m.subject}</h4>}
        <div className="mbody">{m.text}</div>
        <Actions m={m} onAction={onAction} translate />
      </article>
    );
  }
  return (
    <article className="msg theirs">
      <p className="who"><b>{customer}</b><span>Chat · {m.time}</span>{m.gloss && <em className="tr"><Icon name="translate" size={14} />Translated from {language ?? "another language"}</em>}</p>
      {m.gloss ? <><div className="orig" lang="hi">{m.text}</div><div>{m.gloss}</div></> : <div>{m.text}</div>}
      <Actions m={m} onAction={onAction} translate />
    </article>
  );
}

/** The assistant's work before a reply, after the INA agent trace: one line, opens to the steps. */
function Trace({ steps }: { steps: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="trace">
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{open ? "Hide thinking" : "Show thinking"}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className={`steps${open ? " open" : ""}`}><div>
        <ol>{steps.map((t) => <li key={t}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{t}</li>)}</ol>
      </div></div>
    </div>
  );
}
