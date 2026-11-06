"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, GROUPS, type Case, type Msg, type Option, type Stage } from "@/lib/cases";
import { EvidenceTile } from "./EvidenceTile";
import { Icon } from "./Icon";

type CaseState = { stage: string; extra: Msg[] };
type Undo = { caseId: string; prev: CaseState; label: string };

const initial = (): Record<string, CaseState> =>
  Object.fromEntries(CASES.map((c) => [c.id, { stage: c.start, extra: [] }]));

const channelOf = (c: Case) => (c.thread.some((m) => m.kind === "customer" && m.channel === "email") ? "mail" : "chat");
const channels = (c: Case) => {
  const ch = new Set(c.thread.flatMap((m) => (m.kind === "customer" ? [m.channel] : [])));
  return ch.size > 1 ? "Email + chat" : ch.has("email") ? "Email" : "Chat";
};
const statusTone = (s: Stage) => (s.group === "closed" || s.group === "ai" ? "ok" : s.urgent ?? "");

export function Workspace() {
  const [states, setStates] = useState(initial);
  const [selected, setSelected] = useState("ananya");
  const [confirming, setConfirming] = useState<Option | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [undo, setUndo] = useState<Undo | null>(null);
  const [compare, setCompare] = useState(false);
  const threadEnd = useRef<HTMLDivElement>(null);

  const ordered = useMemo(
    () => GROUPS.flatMap((g) => CASES.filter((c) => c.stages[states[c.id].stage].group === g.id)),
    [states],
  );
  const c = CASES.find((x) => x.id === selected)!;
  const st = states[c.id];
  const stage = c.stages[st.stage];
  const thread = [...c.thread, ...st.extra];
  const draft = drafts[c.id + st.stage] ?? stage.draft ?? "";
  const canCompare = c.evidence.filter((e) => e.kind === "door").length >= 2;
  const needs = ordered.filter((x) => x.stages[states[x.id].stage].group === "needs").length;

  function select(id: string) {
    setSelected(id);
    setConfirming(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "TEXTAREA" || t.tagName === "INPUT") return;
      if (e.key !== "j" && e.key !== "k") return;
      const i = ordered.findIndex((x) => x.id === selected);
      select(ordered[Math.min(ordered.length - 1, Math.max(0, i + (e.key === "j" ? 1 : -1)))].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ordered, selected]);

  // Deep links for demos and review captures: ?case=rohan&stage=failed&confirm=retry&compare=1
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const cs = CASES.find((x) => x.id === q.get("case"));
    if (!cs) return;
    setSelected(cs.id);
    if (q.get("compare")) setCompare(true);
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
    setStates((s) => ({ ...s, [c.id]: { ...s[c.id], extra: [...s[c.id].extra, { kind: "agent", who: "You", time: "Now", text: draft }] } }));
    setDrafts((d) => ({ ...d, [c.id + st.stage]: "" }));
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
          <button className="ri on" aria-label="Queue" aria-current="page"><Icon name="inbox" /></button>
          <button className="ri" aria-label="Waiting"><Icon name="clock" /></button>
          <button className="ri" aria-label="Search"><Icon name="search" /></button>
        </nav>

        <aside className="queue" aria-label="Queue">
          <div className="bar"><span className="ttl">Delivered, not received</span><span className="cnt">{needs} need you</span></div>
          <div className="qscroll">
            {GROUPS.map((g) => {
              const items = ordered.filter((x) => x.stages[states[x.id].stage].group === g.id);
              if (!items.length) return null;
              return (
                <section key={g.id}>
                  <h2 className="grp">{g.label} · {items.length}</h2>
                  {items.map((x) => {
                    const s = x.stages[states[x.id].stage];
                    return (
                      <button key={x.id} className={`qi${x.id === selected ? " on" : ""}`} onClick={() => select(x.id)}>
                        <span className="ch"><Icon name={channelOf(x)} size={14} /></span>
                        <span className="txt">
                          <span className="l1">{x.customer}{s.timeLeft && <span className={s.urgent ?? ""}>{s.timeLeft}</span>}</span>
                          <span className="l2" style={{ display: "block" }}>{x.item.split(",")[0]} · {x.value} · {s.nextStep}</span>
                        </span>
                      </button>
                    );
                  })}
                </section>
              );
            })}
          </div>
        </aside>

        <main className="case" key={c.id}>
          <header className="head">
            <span className="tile"><Icon name="box" /></span>
            <div className="hx">
              <h1 className="t">{c.headline}</h1>
              <p className="m">
                {c.order}<span>·</span><Icon name={channelOf(c)} size={13} />{channels(c)}{c.language ? ` · ${c.language}` : ""}<span>·</span>
                <span className={`st ${statusTone(stage)}`}>{stage.status ?? (stage.timeLeft ? `${stage.timeLeft} left` : stage.nextStep)}</span>
              </p>
            </div>
            <button className="ob"><Icon name="assign" />Assign</button>
            <button className="ob" aria-label="More"><Icon name="more" /></button>
          </header>

          <div className="thread" aria-label="Conversation">
            {thread.map((m, i) => <Message key={i} m={m} customer={c.customer} />)}
            <div ref={threadEnd} />
          </div>

          {stage.group !== "closed" && stage.group !== "ai" && (
            <div className="composer">
              <textarea
                aria-label={`Reply to ${c.customer}`}
                value={draft}
                placeholder={`Reply to ${c.customer.split(" ")[0]}`}
                onChange={(e) => setDrafts((d) => ({ ...d, [c.id + st.stage]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) { e.preventDefault(); send(); } }}
              />
              <div className="row">
                <span>{stage.draft && draft === stage.draft ? <><i className="ai-tag" style={{ fontStyle: "normal" }}>AI</i>Draft · sends with your decision, or now</> : "⌘↵ to send"}</span>
                <button className="ob" onClick={send} disabled={!draft.trim()}><Icon name="send" size={14} />Send</button>
              </div>
            </div>
          )}
        </main>

        <aside className="panel" aria-label="Order and evidence">
          <div className="bar" style={{ justifyContent: "space-between" }}><span className="ttl">Order</span><span className="cnt">{c.order}</span></div>
          <div className="pscroll">
            <dl className="sec">
              <div className="kv"><dt><Icon name="box" />Item</dt><dd>{c.item}</dd></div>
              <div className="kv"><dt><Icon name="card" />Paid</dt><dd>{c.value} · {c.payment.replace("Prepaid · ", "")}</dd></div>
              <div className="kv"><dt><Icon name="truck" />Courier</dt><dd>{c.courier}</dd></div>
            </dl>

            <section className="sec">
              <h3>
                Delivery evidence
                {canCompare && (
                  <button aria-pressed={compare} onClick={() => setCompare((v) => !v)}>
                    <Icon name={compare ? "shrink" : "expand"} size={13} />{compare ? "Smaller" : "Compare"}
                  </button>
                )}
              </h3>
              <div className={`thumbs n${c.evidence.length}${compare && canCompare ? " big" : ""}`}>
                {c.evidence.map((e, i) => <EvidenceTile key={i} e={e} big={compare && canCompare} />)}
              </div>
              <p className="illus">Illustrations · demo data</p>
              <dl>
                {c.facts.map((f) => (
                  <div className="kv" key={f.label}><dt>{f.icon && <Icon name={f.icon} />}{f.label}</dt><dd className={f.tone ?? ""}>{f.value}</dd></div>
                ))}
              </dl>
              {c.signals && (
                <div className="signals">
                  <p><Icon name="lock" size={14} />Only your team sees this</p>
                  <ul>{c.signals.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
            </section>
          </div>

          <div className="decide">
            {confirming?.confirm ? (
              <div className="confirm" role="group" aria-label={confirming.confirm.title}>
                <h3>{confirming.confirm.title}</h3>
                <dl>{confirming.confirm.lines.map(([k, v]) => <div className="kv" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <p>{confirming.confirm.note}</p>
                <div className="btns">
                  <button className="pb" onClick={() => goTo(c.id, confirming.next, confirming.label)}><Icon name="check" size={14} />{confirming.confirm.cta}</button>
                  <button className="ob" onClick={() => setConfirming(null)}>Back</button>
                </div>
              </div>
            ) : (
              <>
                {stage.ai && <p className="ai"><span className="ai-tag">AI</span><span>{stage.ai}</span></p>}
                {(stage.options.length > 0 || stage.simulate) && (
                  <div className="btns">
                    {stage.options.map((o) => (
                      <button key={o.id} className={o.primary ? "pb" : "ob"} onClick={() => act(o)}>{o.label}</button>
                    ))}
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
        </aside>
      </div>

      {undo && (
        <div className="toast" role="status">
          <span>{undo.label} · done</span>
          <button onClick={() => { setStates((s) => ({ ...s, [undo.caseId]: undo.prev })); select(undo.caseId); setUndo(null); }}>
            <Icon name="undo" size={14} />Undo
          </button>
        </div>
      )}
    </>
  );
}

function Message({ m, customer }: { m: Msg; customer: string }) {
  if (m.kind === "event") {
    return (
      <p className="ev">
        {m.ai ? <span className="ai-tag">AI</span> : <Icon name="clock" size={14} />}
        <span>{m.text}</span>
        <time>{m.time}</time>
      </p>
    );
  }
  const mine = m.kind === "agent";
  return (
    <div className={`msg${mine ? " mine" : ""}`}>
      <p className="who">
        {mine ? <><b>{m.who}</b><span>{m.time}</span></> : <><Icon name={m.channel === "email" ? "mail" : "chat"} size={14} /><b>{customer}</b><span>{m.channel === "email" ? "Email" : "Chat"} · {m.time}</span></>}
      </p>
      <div>
        {m.text}
        {m.gloss && <span className="gloss">{m.gloss}</span>}
      </div>
    </div>
  );
}
