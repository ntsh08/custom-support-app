"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, GROUPS, type Msg, type Option } from "@/lib/cases";
import { EvidenceTile } from "./EvidenceTile";
import { Icon } from "./Icon";

type CaseState = { stage: string; extra: Msg[] };
type Undo = { caseId: string; prev: CaseState; label: string };

const initial = (): Record<string, CaseState> =>
  Object.fromEntries(CASES.map((c) => [c.id, { stage: c.start, extra: [] }]));

export function Workspace() {
  const [states, setStates] = useState(initial);
  const [selected, setSelected] = useState("ananya");
  const [confirming, setConfirming] = useState<Option | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [undo, setUndo] = useState<Undo | null>(null);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "TEXTAREA" || t.tagName === "INPUT") return;
      if (e.key !== "j" && e.key !== "k") return;
      const i = ordered.findIndex((x) => x.id === selected);
      const n = ordered[Math.min(ordered.length - 1, Math.max(0, i + (e.key === "j" ? 1 : -1)))];
      setSelected(n.id);
      setConfirming(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ordered, selected]);

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

  const needs = ordered.filter((x) => c && states[x.id] && x.stages[states[x.id].stage].group === "needs").length;

  return (
    <div className="app">
      <nav className="rail" aria-label="Main">
        <div className="logo" aria-label="JusDesk">J</div>
        <button className="ri on" aria-label="Queue" aria-current="page"><Icon name="inbox" /></button>
        <button className="ri" aria-label="Waiting"><Icon name="clock" /></button>
        <button className="ri" aria-label="Search"><Icon name="search" /></button>
        <button className="ri" aria-label="Reports"><Icon name="chart" /></button>
      </nav>

      <aside className="queue" aria-label="Queue">
        <header className="qh">
          <h1>Delivered, not received</h1>
          <p>{needs} need you · J / K to move</p>
        </header>
        {GROUPS.map((g) => {
          const items = ordered.filter((x) => x.stages[states[x.id].stage].group === g.id);
          if (!items.length) return null;
          return (
            <section key={g.id} className="qg">
              <h2>{g.label} <span>{items.length}</span></h2>
              {items.map((x) => {
                const s = x.stages[states[x.id].stage];
                return (
                  <button key={x.id} className={`qi${x.id === selected ? " on" : ""}`} onClick={() => { setSelected(x.id); setConfirming(null); }}>
                    <span className="qtop"><b>{x.customer}</b>{s.timeLeft && <span className={s.urgent ?? ""}>{s.timeLeft}</span>}</span>
                    <span className="qitem">{x.item.split(",")[0]} · {x.value}</span>
                    <span className="qnext">{s.nextStep}</span>
                  </button>
                );
              })}
            </section>
          );
        })}
      </aside>

      <main className="case" key={c.id}>
        <header className="ch">
          <p className="meta">{c.order} · {c.item} · {c.value} · {c.payment} · {c.courier}{c.language ? ` · Writes in ${c.language}` : ""}</p>
          <h2>{c.headline}</h2>
          <p className="sum">{c.summary}</p>
          {stage.status && <p className={`status g-${stage.group}`}><span className="sd" />{stage.status}</p>}
        </header>

        <div className="body">
          <section className="thread" aria-label="Conversation">
            <div className="msgs">
              {thread.map((m, i) => <Message key={i} m={m} />)}
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
                <div className="crow">
                  <span>{stage.draft && draft === stage.draft ? <><i className="ai">AI</i>Drafted for you · sends with your decision, or now</> : "⌘↵ to send"}</span>
                  <button className="btn s sm" onClick={send} disabled={!draft.trim()}><Icon name="send" size={16} />Send now</button>
                </div>
              </div>
            )}
          </section>

          <section className="evidence" aria-label="Evidence">
            <div className="escroll">
              <div className={`strip n${c.evidence.length}`}>
                {c.evidence.map((e, i) => <EvidenceTile key={i} e={e} />)}
              </div>
              <p className="illus">Illustrations of courier evidence · demo data</p>
              <dl className="facts">
                {c.facts.map((f) => (
                  <div key={f.label}><dt>{f.label}</dt><dd className={f.tone ?? ""}>{f.value}</dd></div>
                ))}
              </dl>
              {c.signals && (
                <div className="signals">
                  <p className="sh"><Icon name="lock" size={16} />Only your team sees this</p>
                  <ul>{c.signals.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              )}
            </div>

            <div className="decide">
              {confirming?.confirm ? (
                <div className="confirm" role="group" aria-label={confirming.confirm.title}>
                  <h3>{confirming.confirm.title}</h3>
                  <dl>{confirming.confirm.lines.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                  <p>{confirming.confirm.note}</p>
                  <div className="row">
                    <button className="btn g" onClick={() => setConfirming(null)}>Back</button>
                    <button className="btn p grow" autoFocus onClick={() => goTo(c.id, confirming.next, confirming.label)}><Icon name="check" size={18} />{confirming.confirm.cta}</button>
                  </div>
                </div>
              ) : (
                <>
                  {stage.ai && <p className="ailine"><i className="ai">AI</i>{stage.ai}</p>}
                  <div className="row">
                    {stage.options.map((o) => (
                      <button key={o.id} className={`btn ${o.primary ? "p" : "s"}`} onClick={() => act(o)}>{o.label}</button>
                    ))}
                    {stage.simulate && (
                      <button className="btn proto" onClick={() => goTo(c.id, stage.simulate!.next)} title="Prototype only: simulates an outside event">
                        <Icon name="play" size={14} />{stage.simulate.label}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {undo && (
        <div className="toast" role="status">
          <span>{undo.label} · done</span>
          <button onClick={() => { setStates((s) => ({ ...s, [undo.caseId]: undo.prev })); setSelected(undo.caseId); setUndo(null); }}>
            <Icon name="undo" size={16} />Undo
          </button>
        </div>
      )}
    </div>
  );
}

function Message({ m }: { m: Msg }) {
  if (m.kind === "event") {
    return <p className={`ev${m.ai ? " evai" : ""}`}>{m.ai && <i className="ai">AI</i>}{m.text}<span>{m.time}</span></p>;
  }
  const mine = m.kind === "agent";
  return (
    <div className={`msg${mine ? " mine" : ""}`}>
      <p className="who">{mine ? m.who : `Customer · ${m.channel}`} · {m.time}</p>
      <div className="bubble">
        {m.text}
        {m.gloss && <span className="gloss">{m.gloss}</span>}
      </div>
    </div>
  );
}
