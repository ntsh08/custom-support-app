"use client";

import Link from "next/link";
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CASES, STATUS, TITLE, type Case, type Group, type Msg, type Option, type Stage, type Task } from "@/lib/cases";
import { EvidenceTile } from "./EvidenceTile";
import { Icon, type IconName } from "./Icon";
import { Commentary } from "./Commentary";

type CaseState = { stage: string; extra: Msg[]; status?: Group };
type Undo = { caseId: string; prev: CaseState; label: string };

const REASONS = ["Wrong address", "Lost in transit", "Disputed delivery", "Early scan", "Left with guard"];

const TAGS = ["Order not received", "Payment issue", "Refund requested", "Replacement requested", "Courier dispute", "Early scan", "Out of stock", "Repeat claim", "Cash on delivery", "Urgent"];
const EMOJI: Record<string, string> = { Angry: "😠", Frustrated: "😤", Neutral: "😐", Happy: "🙂" };
const MOOD: Record<string, string> = { Angry: "bad", Frustrated: "warn", Neutral: "", Happy: "good" };

const initial = (): Record<string, CaseState> =>
  Object.fromEntries(CASES.map((c) => [c.id, { stage: c.start, extra: [] }]));

const hasEmail = (c: Case) => c.thread.some((m) => m.kind === "customer" && m.channel === "email");
const channelIcon = (c: Case): IconName => (hasEmail(c) ? "mail" : "chat");
const channels = (c: Case) => {
  const ch = new Set(c.thread.flatMap((m) => (m.kind === "customer" ? [m.channel] : [])));
  return ch.size > 1 ? "Chat + email merged" : ch.has("email") ? "Email" : "Chat";
};
const owner = (g: Group, s: Stage) => (g === "escalated" ? "Priya" : s.by === "AI" ? "AI" : "You");
const waitingG = (g: Group) => g === "customer" || g === "others";
type SortBy = "due" | "newest" | "oldest";
const SORTS: { id: SortBy; label: string; hint: string }[] = [
  { id: "due", label: "Due time", hint: "Soonest reply or follow-up" },
  { id: "newest", label: "Newest", hint: "Latest tickets first" },
  { id: "oldest", label: "Oldest", hint: "Earliest tickets first" },
];
/** Most urgent statuses first in the single list. */
const order = (g: Group) => ["reply", "first", "escalated", "others", "customer", "closed"].indexOf(g);
/** The demo's "now" is about 10:30 am. A follow-up at "Today, 4 pm" shows as "5 h", in the same format as reply timers, so the list reads in one unit. */
const fromNow = (d: string) => {
  const m = d.match(/(\d{1,2})(?::(\d\d))? ?([ap]m)/i);
  if (!m || !/^Today/.test(d)) return d.replace("Today, ", "");
  const mins = ((+m[1] % 12) + (/p/i.test(m[3]) ? 12 : 0)) * 60 + (+(m[2] ?? 0)) - (10 * 60 + 30);
  return mins < 60 ? `${Math.max(mins, 0)} min` : `${Math.round(mins / 60)} h`;
};
/** Minutes left on the reply timer, for sorting. */
const mins = (t?: string) => (!t ? 1e9 : t === "Now" ? 0 : /h/.test(t) ? parseFloat(t) * 60 : parseFloat(t));

/** "Today, 4 pm" → "at 4 pm", "Mon" → "on Mon", "In 5 days" → "in 5 days", "Today" → "now". */
const when = (d: string) => (d === "Today" ? "now" : d.startsWith("Today, ") ? `at ${d.slice(7)}` : /^In /.test(d) ? d.toLowerCase() : `on ${d}`);
type Sugg = { text: string; due: string; taskId?: string };
/** Due time read from a suggestion ("due 4 pm", "by 4 pm"), else today. */
const dueOf = (t: string) => {
  const time = t.match(/(?:due|by) (\d{1,2}(?::\d\d)? ?[ap]m)/i);
  if (time) return `Today, ${time[1]}`;
  const day = t.match(/(?:on|by) (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
  if (day) return day[1].slice(0, 3);
  const days = t.match(/in (\d+) days/i);
  return days ? `In ${days[1]} days` : "Today";
};
/** A status-change line for the conversation. */
const statusLine = (g: Group, by: "You" | "AI"): Msg => ({
  kind: "event", time: "Now", ai: by === "AI", status: g,
  text: g === "escalated" ? `${by === "AI" ? "AI" : "You"} escalated to Priya (team lead)` : g === "closed" ? `${by} closed the ticket` : `${by} changed status to ${STATUS[g]}`,
});
const shown = (m: Msg) => m.kind !== "event" || !!m.status || !!m.assign || !!m.merge || !!m.flag || !!m.investigation;

/** Check reply: the AI reads the draft against the customer's ask, mood, policy and language. */
type Note = { text: string; ok?: boolean; fix?: (d: string) => string };
const todo = (n: Note[]) => n.filter((x) => !x.ok).length;
function checkReply(c: Case, d: string): Note[] {
  const notes: Note[] = [];
  const first = c.customer.split(" ")[0];
  const t = d.toLowerCase();
  const asked = c.thread.filter((m) => m.kind === "customer").map((m) => m.text.toLowerCase()).join(" ");
  if (/saturday/.test(asked)) {
    notes.push(/friday|saturday|today|tomorrow/.test(t)
      ? { text: `${first} needs it by Saturday, and your reply gives a date before that.`, ok: true }
      : { text: `${first} needs it by Saturday. Say when it will reach her.` });
  }
  if ((c.sentiment.label === "Frustrated" || c.sentiment.label === "Angry") && !/sorry|apolog/.test(t)) {
    notes.push({ text: `${first} is ${c.sentiment.label.toLowerCase()}. Open with a short apology.`, fix: (x) => x.replace(/^(Hi [^,]+,\s*)(.)/, (_m, hi: string, ch: string) => `${hi}I'm sorry for the trouble. ${ch.toUpperCase()}`) });
  }
  if (/refund/.test(t) && /Priya|lead/.test(c.rec?.title ?? "")) {
    notes.push({ text: "A refund this size needs Priya's approval. Don't promise it yet.", fix: (x) => x.replace(/(we('| a)?ll|i('| wi)?ll) (refund|send (you )?a refund)[^.]*\./i, "I've asked my team lead to approve your refund and will update you today.") });
  }
  if (c.history.risk.level === "Review" && /fraud|claim(ed)? before|suspici/.test(t)) {
    notes.push({ text: "Don't mention earlier claims or suspicion to the customer." });
  }
  if (c.language && c.language !== "English" && /^[\x00-\x7F]*$/.test(d)) {
    notes.push({ text: `${first} wrote in ${c.language}. Send it in ${c.language}?` });
  }
  return notes;
}
/** A reply timer only runs while the ball is with the agent. */
const dueFor = (g: Group) => g === "first" || g === "reply";
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
  const [tab, setTab] = useState<"details" | "copilot">("details");
  // Collapsed right-panel sections, by title. Stays the same across tickets.
  const [shut, setShut] = useState<Record<string, boolean>>({});
  const toggle = (t: string) => setShut((m) => ({ ...m, [t]: !m[t] }));
  const [check, setCheck] = useState<Note[] | null>(null);
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  // The summary "writes" for a moment each time a case opens (E4), then settles (B6).
  const [writing, setWriting] = useState(true);
  const [vote, setVote] = useState<Record<string, "up" | "down" | undefined>>({});
  const [undo, setUndo] = useState<Undo | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Record<string, Task[]>>(() => Object.fromEntries(CASES.map((c) => [c.id, c.tasks])));
  const [reasons, setReasons] = useState<Record<string, string | undefined>>(() => Object.fromEntries(CASES.map((c) => [c.id, c.reasonTag])));
  const [tags, setTags] = useState<Record<string, string[]>>(() => Object.fromEntries(CASES.map((c) => [c.id, c.tags])));
  const [tagMenu, setTagMenu] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { q: string; a: string }[]>>({});
  // Copilot turn in progress (INA pattern): think (shimmering step labels) → type (answer streams in) → follow (follow-up placeholders) → done.
  const [coRun, setCoRun] = useState<{ id: string; idx: number; phase: "think" | "type" | "follow"; n: number; label: string } | null>(null);
  const coScroll = useRef<HTMLDivElement>(null);
  const [ask, setAsk] = useState("");
  const [newTask, setNewTask] = useState<string | null>(null);
  const threadEnd = useRef<HTMLDivElement>(null);

  const statusOf = (id: string): Group => {
    const cs = CASES.find((x) => x.id === id)!;
    return states[id].status ?? cs.stages[states[id].stage].group;
  };
  const [sort, setSort] = useState<SortBy>("due");
  const [sortMenu, setSortMenu] = useState(false);
  const [statusMenu, setStatusMenu] = useState(false);
  const [addMenu, setAddMenu] = useState<string | null>(null);
  const [photo, setPhoto] = useState<Case["evidence"][number] | null>(null);
  const ordered = useMemo(() => {
    const left = (x: Case) => mins(x.stages[states[x.id].stage].timeLeft);
    // Due: reply timers first, then follow-ups, then the rest; closed last.
    const due = (x: Case) => { const g = statusOf(x.id); return g === "closed" ? 3e9 : dueFor(g) && x.stages[states[x.id].stage].timeLeft ? left(x) : x.followUp ? 1e9 : 2e9; };
    const num = (x: Case) => parseInt(x.ticket.slice(1));
    const cmp: Record<SortBy, (a: Case, b: Case) => number> = {
      due: (a, b) => due(a) - due(b) || order(statusOf(a.id)) - order(statusOf(b.id)),
      newest: (a, b) => num(b) - num(a),
      oldest: (a, b) => num(a) - num(b),
    };
    return [...CASES].sort(cmp[sort]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, sort]);
  const c = CASES.find((x) => x.id === selected)!;
  const st = states[c.id];
  const stage = c.stages[st.stage];
  const atStart = st.stage === c.start;
  const thread = [...c.thread, ...st.extra];

  const key = c.id + st.stage + mode;
  const draft = drafts[key] ?? "";
  const status = statusOf(c.id);
  const open = status !== "closed";
  const setStatus = (g: Group) => setStates((s) => (g === status ? s : { ...s, [c.id]: { ...s[c.id], status: g, extra: [...s[c.id].extra, statusLine(g, "You")] } }));

  // Suggestions for the executive come from the assistant's investigation; shown inside the summary card.
  const nextSteps = [...thread].reverse().map((m) => (m.kind === "agent" || m.kind === "event" ? m.next : undefined)).find((n) => n && n.length) ?? (open ? c.suggest ?? [] : []);
  // One list of AI suggestions: the investigation's next steps, plus the AI-suggested tasks (no longer shown in the panel).
  const suggestions: Sugg[] = [
    ...nextSteps.map((t) => ({ text: t, due: dueOf(t) })),
  ];
  // Open tickets get AI suggestions; closed tickets get the AI summary.
  const cardKind = open ? "AI suggestion" : "AI summary";
  const summaryCard = open && suggestions.length === 0 ? null : hidden[c.id] ? (
    <button className="sum-show" onClick={() => setHidden((h) => ({ ...h, [c.id]: false }))}><Icon name="spark" size={14} />Show {cardKind}</button>
  ) : (
    <div className="sumwrap">
      <section className={`sum${writing ? " writing" : ""}`} aria-label={cardKind} aria-busy={writing}>
        <span className="lbl"><Icon name="spark" size={14} /><span>{writing ? (open ? "Thinking…" : "Writing summary…") : cardKind}</span><em className="team"><Icon name="lock" size={12} />Only your team sees this</em></span>
        {!open && <><h3>{c.hook}</h3><p>{c.handoff.join(" ")}</p></>}
        {open && <ol className="sugg">{suggestions.map((x) => {
          const t = tasks[c.id].find((y) => y.text === x.text);
          const aiCan = !/\bcall\b/i.test(x.text);
          const sa = c.actions?.find((z) => x.text.includes(z.match));
          const opt = sa?.option ? c.stages[c.start].options.find((o) => o.id === sa.option) : undefined;
          const optDone = !!sa?.option && st.stage !== c.start;
          const actionBtn = !sa ? null
            : sa.option ? (optDone ? <em className="added"><Icon name="check" size={12} />Done</em> : opt && <button className="sa pri" onClick={() => act(opt)}>{sa.label}</button>)
            : sa.schedule ? (t?.owner === "ai" ? <em className="added"><Icon name="check" size={12} />Scheduled</em> : <button className="sa pri" onClick={() => assign({ ...x, due: sa.schedule! }, "ai")}>{sa.label}</button>)
            : <button className="sa pri" onClick={() => setFlash("Calling the rider through the Ekart hub (prototype)")}>{sa.label}</button>;
          return (
            <Fragment key={x.text}>
            <li>
              <span>{x.text}</span>
              {actionBtn}
              {!sa && <span className="addwrap">
                {t ? (
                  <button className={`added${t.owner === "ai" ? " ai" : ""}`} aria-haspopup="menu" aria-expanded={addMenu === x.text} onClick={() => setAddMenu(addMenu === x.text ? null : x.text)}>
                    {t.owner === "ai" ? "Assigned to AI" : "Assigned to you"}<Icon name="chev" size={12} />
                  </button>
                ) : (
                  <button className="addtask pri" aria-haspopup="menu" aria-expanded={addMenu === x.text} onClick={() => setAddMenu(addMenu === x.text ? null : x.text)}>Add task<Icon name="chev" size={12} /></button>
                )}
                {addMenu === x.text && (
                  <ul className="sortmenu addmenu" role="menu" ref={(el) => { el?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }} onMouseLeave={() => setAddMenu(null)}>
                    <li className="mh">Who does it?</li>
                    <li role="none"><button role="menuitem" onClick={() => assign(x, "me")}><span><b>Me</b><em>Goes to your tasks</em></span>{t && t.owner !== "ai" && <Icon name="check" size={14} />}</button></li>
                    <li role="none"><button role="menuitem" disabled={!aiCan} onClick={() => assign(x, "ai")}><span><b>AI</b><em>{aiCan ? `Does it ${when(x.due)} and reports back` : "AI can't make calls"}</em></span>{t?.owner === "ai" && <Icon name="check" size={14} />}</button></li>
                    {t && <li role="none"><button role="menuitem" className="rm" onClick={() => assign(x, null)}>Remove task</button></li>}
                  </ul>
                )}
              </span>}
            </li>
            </Fragment>
          );
        })}</ol>}
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
  const caseTasks = tasks[c.id].filter((t) => !t.ai);
  /** Add, reassign or remove the task for a suggestion. */
  function assign(x: Sugg, owner: "me" | "ai" | null) {
    setTasks((all) => {
      const rest = all[c.id].filter((t) => t.text !== x.text);
      const prev = all[c.id].find((t) => t.text === x.text);
      return { ...all, [c.id]: owner ? (prev ? all[c.id].map((t) => (t.text === x.text ? { ...t, owner } : t)) : [...rest, { id: `s${Date.now()}`, text: x.text, due: x.due, owner }]) : rest };
    });
    setAddMenu(null);
    setFlash(owner === "ai" ? "Assigned to AI · it reports back" : owner === "me" ? "Assigned to you" : "Task removed");
  }
  const linked = stage.linked ?? c.linked;
  const thread_ = answers[c.id] ?? [];
  const running = coRun && coRun.id === c.id ? coRun : null;
  const chips = (c.asks ?? []).filter((a) => !thread_.some((x) => x.q === a.q));

  function select(id: string) {
    setSelected(id);
    setConfirming(null);
    setMode("reply");
    setAsk("");
    setNewTask(null);
    setCheck(null);
    setStatusMenu(false);
  }

  useEffect(() => {
    setWriting(true);
    const t = setTimeout(() => setWriting(false), 1800);
    return () => clearTimeout(t);
  }, [selected]);

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

  // Drive the Copilot turn. Each phase sets its own timers once; typing advances word by word.
  const coKey = coRun ? `${coRun.id}:${coRun.idx}:${coRun.phase}` : "";
  useEffect(() => {
    if (!coRun) return;
    if (coRun.phase === "think") {
      const a = setTimeout(() => setCoRun((r) => r && { ...r, label: "Checking the evidence" }), 1000);
      const b = setTimeout(() => setCoRun(null), 2000);
      return () => { clearTimeout(a); clearTimeout(b); };
    }
    if (coRun.phase === "follow") {
      const t = setTimeout(() => setCoRun(null), 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coKey]);
  useEffect(() => {
    if (!coRun || coRun.phase !== "type") return;
    const words = (answers[coRun.id]?.[coRun.idx]?.a ?? "").split(" ").length;
    const t = coRun.n >= words
      ? setTimeout(() => setCoRun((r) => r && { ...r, phase: "follow" }), 150)
      : setTimeout(() => setCoRun((r) => r && { ...r, n: r.n + 1 }), 45);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coKey, coRun?.n]);

  // Follow the Copilot conversation as it grows.
  useEffect(() => {
    coScroll.current?.scrollTo({ top: coScroll.current.scrollHeight, behavior: "smooth" });
  }, [coRun?.phase, coRun?.n, answers]);

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
      const from = prev.status ?? cs.stages[prev.stage].group;
      const to = cs.stages[next];
      const log: Msg[] = from === to.group ? [] : [statusLine(to.group, to.by === "AI" ? "AI" : "You")];
      return { ...s, [caseId]: { stage: next, extra: [...prev.extra, ...(to.adds ?? []), ...log] } };
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
    setStates((s) => ({ ...s, [c.id]: { ...s[c.id], extra: [...s[c.id].extra, msg], ...(mode === "reply" ? { status: "customer" as Group } : {}), ...(mode === "reply" && status !== "customer" ? { extra: [...s[c.id].extra, msg, statusLine("customer", "You")] } : {}) } }));
    setDrafts((d) => ({ ...d, [key]: "" }));
    if (mode === "reply") { setFlash(`Sent · ${STATUS.customer}`); setCheck(null); }
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
    if (coRun) return;
    const idx = (answers[c.id] ?? []).length;
    setAnswers((a) => ({ ...a, [c.id]: [...(a[c.id] ?? []), { q, a: known?.a ?? "In the prototype, only the suggested questions have answers." }] }));
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) setCoRun({ id: c.id, idx, phase: "think", n: 0, label: "Reading the ticket" });
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
          <Link className="nav" title="Team overview (team lead)" href="/lead"><Icon name="dashboard" size={18} /></Link>
        </nav>

        {/* Queue */}
        <aside className="queue" aria-label="Queue">
          <header className="bar qbar">
            <b>All tickets<span>{ordered.length}</span></b>
            <div className="qtools">
              <button className="qsort" aria-haspopup="listbox" aria-expanded={sortMenu} onClick={() => setSortMenu((o) => !o)}><Icon name="sort" size={14} />{SORTS.find((x) => x.id === sort)!.label}</button>
              <button className="qicon" aria-label="Filter" title="Filter (not in the prototype)" onClick={() => setFlash("Filters aren't wired up in the prototype")}><Icon name="filter" size={16} /></button>
              {sortMenu && (
                <ul className="sortmenu" role="listbox" aria-label="Sort tickets" onMouseLeave={() => setSortMenu(false)}>
                  <li className="mh">Sort by</li>
                  {SORTS.map((o) => (
                    <li key={o.id} role="option" aria-selected={sort === o.id}>
                      <button onClick={() => { setSort(o.id); setSortMenu(false); }}>
                        <span><b>{o.label}</b><em>{o.hint}</em></span>
                        {sort === o.id && <Icon name="check" size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>
          <div className="scroll">
            {ordered.map((x) => {
              const s = x.stages[states[x.id].stage];
              const g = statusOf(x.id);
              return (
                <button key={x.id} className={`row${x.id === selected ? " on" : ""}`} onClick={() => select(x.id)}>
                  <span className="rt">
                    <span className="l1">
                      <b>{x.customer}</b>
                      {s.reopened && !states[x.id].status && <i className="reo">Reopened</i>}
                      {s.timeLeft && dueFor(g) ? <em className={s.urgent ?? ""}>{s.timeLeft}</em> : waitingG(g) && x.followUp ? <em>{fromNow(x.followUp)}</em> : null}
                    </span>
                    <span className="l2">{TITLE}</span>
                    <span className="l3"><span className="tk"><Icon name="ticket" size={12} />{x.ticket}</span><span className={`st st-${g}`}>{STATUS[g]}</span></span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Case */}
        <main className="case" key={c.id}>
          <header className="head">
            <div className="hrow">
              <h1>{TITLE}</h1>
              <div className={`split st-${status}`}>
                <button className="sp-main" aria-haspopup="listbox" onClick={() => setStatusMenu((o) => !o)}>{STATUS[status]}</button>
                <button className="sp-more" aria-label="Change status" aria-haspopup="listbox" aria-expanded={statusMenu} onClick={() => setStatusMenu((o) => !o)}><Icon name="chev" size={14} /></button>
                {statusMenu && (
                  <ul className="sortmenu stmenu" role="listbox" aria-label="Change status" onMouseLeave={() => setStatusMenu(false)}>
                    <li className="mh">Change status</li>
                    {(Object.keys(STATUS) as Group[]).map((g) => (
                      <li key={g} role="option" aria-selected={status === g}>
                        <button onClick={() => { setStatus(g); setStatusMenu(false); }}>
                          <span className="stline"><i className={`dot st-${g}`} />{STATUS[g]}</span>
                          {status === g && <Icon name="check" size={14} />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="tags">
              <span><Icon name="ticket" size={14} />{c.ticket}</span>
              <span><Icon name="user" size={14} />{c.customer}</span>
              <span><Icon name="translate" size={14} />{c.language ?? "English"}</span>
              {dueFor(status) && stage.timeLeft && <span className={stage.urgent ?? ""}><Icon name="clock" size={14} />{stage.timeLeft === "Now" ? "Reply now" : `Reply in ${stage.timeLeft}`}</span>}
            </div>
          </header>

          <div className="thread" aria-label="Conversation">
            <div className="inner">
            {thread.filter(shown).map((m, i, all) => (
              <div key={i} className="grpmsg">
                {(i === 0 || (all[i - 1].day ?? "Today") !== (m.day ?? "Today")) && <p className="day"><span>{m.day ?? "Today"}</span></p>}
                {m.kind === "event" && m.investigation ? (
                  <section className="invcard" aria-label="AI investigation">
                    <p className="ihead"><Icon name="aisearch" size={14} /><b>AI investigation</b><span>{m.time}</span><em><Icon name="lock" size={12} />Only your team sees this</em></p>
                    <p className="isum">{m.evidence}{m.policy && <> As per our policy, {m.policy}</>}</p>
                    <Trace steps={m.investigation} />
                  </section>
                ) : m.kind === "event" ? (
                  <p className="stchg">{m.text}<span>· {m.time}</span></p>
                ) : <Message m={m} customer={c.customer} email={c.email} language={c.language} onAction={msgAction} />}
                {i === c.thread.filter(shown).length - 1 && summaryCard}
              </div>
            ))}
            <div ref={threadEnd} />
            </div>
          </div>

          {open && (
            <div className="cwrap"><div className={`composer${mode === "note" ? " is-note" : ""}`}>
              <ComposerTabs mode={mode} onChange={setMode} />
              <textarea
                key={mode}
                aria-label={mode === "note" ? "Internal note" : `Reply to ${c.customer}`}
                value={draft}
                placeholder={mode === "note" ? "Only your team sees this" : "Write a reply, or start with an AI draft"}
                onChange={(e) => { setDrafts((d) => ({ ...d, [key]: e.target.value })); setCheck(null); }}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) { e.preventDefault(); send(); } }}
              />
              {mode === "reply" && check && (
                <div className="reveal"><div>
                <div className="check" role="status">
                  <p className="chead"><Icon name="spark" size={14} />{todo(check) ? `${todo(check)} suggestion${todo(check) > 1 ? "s" : ""}` : "Looks good. Nothing to change."}<button aria-label="Close check" onClick={() => setCheck(null)}><Icon name="x" size={12} /></button></p>
                  {check.map((n) => (
                    <div key={n.text} className={`cnote ${n.ok ? "ok" : ""}`}>
                      <Icon name={n.ok ? "check" : "alert"} size={14} />
                      <span>{n.text}</span>
                      {n.fix && <button onClick={() => { setDrafts((d) => ({ ...d, [key]: n.fix!(draft) })); setCheck((cs) => cs && cs.filter((x) => x !== n)); }}>Apply</button>}
                    </div>
                  ))}
                </div></div></div>
              )}
              <div className="crow">
                {mode === "reply" ? <>
                  <button className="gh" onClick={() => { if (stage.draft) { setDrafts((d) => ({ ...d, [key]: stage.draft! })); setCheck(null); } else setFlash("Nothing to draft at this step"); }}><Icon name="spark" size={14} />AI draft</button>
                  <button className="gh" disabled={!draft.trim()} onClick={() => setFlash("Rephrase isn't wired up in the prototype")}><Icon name="pen" size={14} />Rephrase</button>
                  <button className="gh" disabled={!draft.trim()} onClick={() => setFlash("Translate isn't wired up in the prototype")}><Icon name="translate" size={14} />Translate</button>
                  <button className={`gh${check ? " on" : ""}`} disabled={!draft.trim()} onClick={() => setCheck(check ? null : checkReply(c, draft))}><Icon name="textcheck" size={14} />Check reply</button>
                  <i className="sp" />
                </> : <i className="sp" />}
                <button className="gh" aria-label="Attach" onClick={() => setFlash("Attachments aren't wired up in the prototype")}><Icon name="attach" size={14} /></button>
                <button className="pri sendbtn" onClick={send} disabled={!draft.trim()}>
                  <span key={mode} className="swap"><Icon name={mode === "reply" ? "send" : "note"} size={14} />{mode === "reply" ? "Send" : "Add note"}</span>
                </button>
              </div>
            </div></div>
          )}
        </main>

        {/* Right panel: AI first, then tasks, linked work, evidence, order */}
        <aside className="panel" aria-label="AI and case details">
          <header className="bar ptabs" role="tablist">
            {(["details", "copilot"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t === "details" ? "Details" : "Copilot"}</button>
            ))}
          </header>
          <div className="scroll" hidden={tab !== "details"}>
            <section className={`blk${shut["Order details"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Order details"]} onClick={() => toggle("Order details")}><Icon name="chev" size={14} />Order details</button></h4>
              <dl className="dkv">
                <div><dt><Icon name="box" size={14} />Item</dt><dd>{c.item}</dd></div>
                <div><dt><Icon name="rupee" size={14} />Amount</dt><dd>{c.value}</dd></div>
                <div><dt><Icon name="wallet" size={14} />Payment type</dt><dd>{/cash on delivery/i.test(c.payment) ? "Cash on delivery (COD)" : "Prepaid"}</dd></div>
                <div><dt><Icon name="card" size={14} />Payment method</dt><dd>{/cash on delivery/i.test(c.payment) ? "Cash" : c.payment.replace("Prepaid · ", "")}</dd></div>
              </dl>
            </section>

            <section className={`blk${shut["Properties"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Properties"]} onClick={() => toggle("Properties")}><Icon name="chev" size={14} />Properties</button></h4>
              <dl className="dkv">
                <div className={status === "customer" ? "tagrow" : ""}><dt><Icon name="inbox" size={14} />Status</dt><dd className="stat">
                  <Pick label="Status" chip={`st st-${status}`} value={status} options={(Object.keys(STATUS) as Group[]).map((g) => ({ value: g, label: STATUS[g], dot: g }))} onChange={(v) => setStatus(v as Group)} />
                  {status === "customer" && <span>AI nudges on day 3 and 7, closes on day 14 if there&apos;s no reply</span>}
                </dd></div>
                <div><dt><Icon name="user" size={14} />Owner</dt><dd>{owner(status, stage)}</dd></div>
                {dueFor(status) && stage.timeLeft && <div><dt><Icon name="clock" size={14} />Reply due</dt><dd className={stage.urgent ?? ""}>{stage.timeLeft === "Now" ? "Now" : `In ${stage.timeLeft}`}</dd></div>}
                {open && c.followUp && <div><dt><Icon name="calendar" size={14} />Follow up</dt><dd>{c.followUp}</dd></div>}
                <div><dt><Icon name="flag" size={14} />Reason</dt><dd>
                  <Pick label="Contact reason" missing={!reasons[c.id]} value={reasons[c.id] ?? ""} options={[{ value: "", label: "Not set" }, ...REASONS.map((r) => ({ value: r, label: r }))]} onChange={(v) => setReasons((r) => ({ ...r, [c.id]: v || undefined }))} />
                </dd></div>
                <div><dt><Icon name={channels(c).includes("merged") ? "merge" : channelIcon(c)} size={14} />Channel</dt><dd>{channels(c)}</dd></div>
                <div className="tagrow"><dt><Icon name="smile" size={14} />Sentiment</dt><dd className="mood2" title={`Read by AI: ${c.sentiment.why}`}><span className={`mpill m-${c.sentiment.label.toLowerCase()}`}>{EMOJI[c.sentiment.label]} {c.sentiment.label}</span></dd></div>
                <div className="tagrow"><dt><Icon name="tag" size={14} />Tags</dt><dd>
                  <div className="tags">
                    {(tags[c.id] ?? []).map((t) => (
                      <span key={t} className="tg">{t}<button aria-label={`Remove ${t}`} onClick={() => setTags((m) => ({ ...m, [c.id]: m[c.id].filter((x) => x !== t) }))}><Icon name="x" size={12} /></button></span>
                    ))}
                    <button className="tgadd" aria-expanded={tagMenu} onClick={() => setTagMenu((o) => !o)}><Icon name="plus" size={12} />Add</button>
                  </div>
                  {tagMenu && (
                    <ul className="tagmenu" role="listbox" aria-multiselectable="true" onMouseLeave={() => setTagMenu(false)}>
                      {TAGS.map((t) => {
                        const on = (tags[c.id] ?? []).includes(t);
                        return (
                          <li key={t} role="option" aria-selected={on}>
                            <button onClick={() => setTags((m) => ({ ...m, [c.id]: on ? m[c.id].filter((x) => x !== t) : [...(m[c.id] ?? []), t] }))}>
                              <Icon name={on ? "checked" : "unchecked"} size={14} />{t}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </dd></div>
              </dl>
            </section>

            <section className={`blk${shut["Customer history"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Customer history"]} onClick={() => toggle("Customer history")}><Icon name="chev" size={14} />Customer history</button></h4>
              <dl className="dkv">
                <div className="tagrow"><dt><Icon name="alert" size={14} />Signals</dt><dd className="sig"><span className={`sigchip sig-${c.history.signal.tone}`}><Icon name={c.history.signal.tone === "high" ? "alert" : "check"} size={12} />{c.history.signal.label}</span></dd></div>
                <div><dt><Icon name="user" size={14} />Customer since</dt><dd>{c.history.since}</dd></div>
                <div><dt><Icon name="bag" size={14} />Orders</dt><dd>{c.history.orders} · {c.history.spent}</dd></div>
                <div><dt><Icon name="alert" size={14} />Past claims</dt><dd className={c.history.claims === "None" ? "good" : "bad"}>{c.history.claims}</dd></div>
                <div><dt><Icon name="card" size={14} />Refunds</dt><dd>{c.history.refunds}</dd></div>
                <div><dt><Icon name="pin" size={14} />Address</dt><dd className={/Shared/.test(c.history.address) ? "bad" : ""}>{c.history.address}</dd></div>
              </dl>
              <button className="seeprev" onClick={() => setFlash(c.history.past.length ? `${c.history.past.length} previous tickets (prototype)` : "No previous tickets")}>View previous tickets</button>
            </section>

            <section className={`blk${shut["Linked tickets"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Linked tickets"]} onClick={() => toggle("Linked tickets")}><Icon name="chev" size={14} />Linked tickets</button></h4>
              {c.linkedTickets?.length ? (
                <ul className="lt">{c.linkedTickets.map((t) => (
                  <li key={t.id}><span className="tk"><Icon name="ticket" size={12} />{t.id}</span>Merged {t.channel.toLowerCase()} ticket</li>
                ))}</ul>
              ) : <p className="hint">No linked tickets.</p>}
            </section>

            <section className={`blk${shut["Tasks and follow-ups"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Tasks and follow-ups"]} onClick={() => toggle("Tasks and follow-ups")}><Icon name="chev" size={14} />Tasks and follow-ups</button><button onClick={() => setNewTask("")}><Icon name="plus" size={14} />Add</button></h4>
              {caseTasks.length === 0 && newTask === null && <p className="hint">No follow-ups on this case.</p>}
              <ul className="tasks">
                {caseTasks.map((t) => (
                  <li key={t.id} className={`${t.ai ? "sug" : ""}${t.done ? " done" : ""}`}>
                    {t.ai || t.owner === "ai" ? <Icon name="spark" size={16} /> : (
                      <button className="tick" aria-label={t.done ? "Mark not done" : "Mark done"} onClick={() => updateTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}>
                        <Icon name={t.done ? "checked" : "unchecked"} size={16} />
                      </button>
                    )}
                    <span className="tbody">
                      <span className="ttext">{t.text}</span>
                      <span className="tmeta">{t.owner === "ai" ? <i className="owner"><Icon name="spark" size={12} />AI</i> : <i className="owner me"><Icon name="user" size={12} />You</i>}<span>{t.due}</span></span>
                    </span>
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
            </section>

            <section className={`blk${shut["Delivery evidence"] ? " shut" : ""}`} hidden={tab !== "details"}>
              <h4><button className="fold" aria-expanded={!shut["Delivery evidence"]} onClick={() => toggle("Delivery evidence")}><Icon name="chev" size={14} />Delivery details</button></h4>
              <dl className="dkv">
                <div><dt><Icon name="truck" size={14} />Courier</dt><dd>{c.courier}</dd></div>
                {c.facts.filter((f) => f.label === "Delivery OTP").map((f) => <div key={f.label}><dt><Icon name="key" size={14} />Delivery OTP</dt><dd className={f.tone ?? ""}>{f.value}</dd></div>)}
                {c.evidence.filter((e) => e.kind !== "map").map((e) => (
                  <div key={e.title}><dt><Icon name="attach" size={14} />{e.title}</dt><dd>{e.kind === "missing" ? <span className="mute">{e.note}</span> : <button className="viewlink" onClick={() => setPhoto(e)}>View photo</button>}</dd></div>
                ))}
                {c.evidence.filter((e): e is Extract<typeof e, { kind: "map" }> => e.kind === "map").map((e) => (
                  <div key={e.title}><dt><Icon name="pin" size={14} />Rider&apos;s GPS</dt><dd className={e.metres > 100 ? "bad" : ""}>{e.metres >= 1000 ? `${(e.metres / 1000).toFixed(1)} km` : `${e.metres} m`} from address</dd></div>
                ))}
                {c.facts.filter((f) => f.label !== "Delivery OTP").map((f) => <div key={f.label}><dt>{f.icon && <Icon name={f.icon} size={14} />}{f.label}</dt><dd className={f.tone ?? ""}>{f.value}</dd></div>)}
              </dl>
            </section>

          </div>
          {tab === "copilot" && (
            <div className="copilot">
              <div className="cothread" ref={coScroll}>
                {thread_.length === 0 ? (
                  <div className="coempty"><span className="cologo"><svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="cog" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2F6547" /><stop offset=".35" stopColor="#3A7C57" /><stop offset=".75" stopColor="#7CC4A0" /><stop offset="1" stopColor="#5EB8A8" /></linearGradient></defs><path fill="url(#cog)" d="M14.5 3c.4 2.9 1.1 4.6 2.2 5.7 1.1 1.1 2.8 1.8 5.3 2.3-2.5.5-4.2 1.2-5.3 2.3-1.1 1.1-1.8 2.8-2.2 5.7-.4-2.9-1.1-4.6-2.2-5.7C11.2 12.2 9.5 11.5 7 11c2.5-.5 4.2-1.2 5.3-2.3C13.4 7.6 14.1 5.9 14.5 3Z"/><path fill="url(#cog)" d="M6.5 13.5c.2 1.5.6 2.4 1.1 2.9.5.5 1.4.9 2.9 1.1-1.5.2-2.4.6-2.9 1.1-.5.5-.9 1.4-1.1 2.9-.2-1.5-.6-2.4-1.1-2.9-.5-.5-1.4-.9-2.9-1.1 1.5-.2 2.4-.6 2.9-1.1.5-.5.9-1.4 1.1-2.9Z"/></svg></span><p>Ask anything about this ticket: the customer, the evidence or what to do next.</p></div>
                ) : thread_.map((x, i) => (
                  <div key={i} className="coturn">
                    <p className="coq">{x.q}</p>
                    {running && running.idx === i && running.phase === "think" ? (
                      <div className="cothink"><span className="coorb"><Icon name="spark" size={16} /></span><span className="coshimmer">{running.label}…</span></div>
                    ) : (
                      <div className="coa">
                        <span className="lbl"><Icon name="spark" size={14} />Copilot</span>
                        <p>{x.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="cobottom">
                {running ? null : chips.length > 0 && (
                  <div className="cochips" key={thread_.length}>{chips.slice(0, thread_.length ? 2 : 3).map((a) => (
                    <button key={a.q} onClick={() => askAI(a.q)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v8a3 3 0 0 0 3 3h10M15 11l4 4-4 4" /></svg>{a.q}</button>
                  ))}</div>
                )}
                <form className={`cobox${running ? " busy" : ""}`} onSubmit={(e) => { e.preventDefault(); askAI(ask); }}>
                  <textarea rows={2} placeholder="Ask a follow-up" value={ask} onChange={(e) => setAsk(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askAI(ask); } }} />
                  <div className="corow">
                    <button type="button" className="coattach" aria-label="Attach" onClick={() => setFlash("Attachments aren't wired up in the prototype")}><Icon name="attach" size={16} /></button>
                    <button type="submit" className="cosend" aria-label="Send" disabled={!ask.trim()}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </aside>
      </div>
      {confirming?.confirm && (
        <div className="sheet-scrim" onClick={() => setConfirming(null)}>
          <aside className="sheet" role="dialog" aria-modal="true" aria-label={confirming.confirm.title} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Escape") setConfirming(null); }}>
            <header>
              <b>{confirming.confirm.title}</b>
              <button className="sheet-x" aria-label="Close" onClick={() => setConfirming(null)}><Icon name="x" size={14} /></button>
            </header>
            {confirming.confirm.to ? (
              <div className="sheet-body esc">
                <div className="esc-to"><span className="esc-av">{confirming.confirm.to.initials}</span><div><b>{confirming.confirm.to.name}</b><span>{confirming.confirm.to.role}</span></div></div>
                <div className="esc-req">
                  <p><b>{confirming.confirm.amount}</b><span>{confirming.confirm.sub}</span></p>
                  <div className="esc-tags">{confirming.confirm.reasons?.map((r) => <span key={r}>{r}</span>)}</div>
                </div>
                <label className="esc-note"><span>Your note</span><textarea rows={2} defaultValue={confirming.confirm.draftNote} /></label>
              </div>
            ) : (
              <div className="sheet-body">
                <dl className="dkv">{confirming.confirm.lines.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                {confirming.confirm.note && <p className="sheet-note">{confirming.confirm.note}</p>}
              </div>
            )}
            <footer>
              <button className="sec" onClick={() => setConfirming(null)}>Cancel</button>
              <button className="pri" autoFocus onClick={() => goTo(c.id, confirming.next, confirming.label)}>{confirming.confirm.cta}</button>
            </footer>
          </aside>
        </div>
      )}
      {photo && (
        <div className="sheet-scrim" onClick={() => setPhoto(null)}>
          <aside className="sheet photo" role="dialog" aria-modal="true" aria-label={photo.title} onClick={(e) => e.stopPropagation()}>
            <header><b>{photo.title}</b><button className="sheet-x" aria-label="Close" onClick={() => setPhoto(null)}><Icon name="x" size={14} /></button></header>
            <div className="sheet-body"><EvidenceTile e={photo} /><p className="hint">{photo.note} · illustration, demo data</p></div>
          </aside>
        </div>
      )}
      <Commentary caseId={c.id} customer={c.customer} onGo={select} />

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
  const [orig, setOrig] = useState(true);
  const lang = language ?? "another language";
  const body = (g?: string) => g ? <div>{orig ? <span lang="hi">{m.text}</span> : g}</div> : <div>{m.text}</div>;
  const link = (g: string | undefined, side: string, verb: string) => g && (
    <p className={`trlink ${side}`}><Icon name="translate" size={14} /><button onClick={() => setOrig((v) => !v)}>{orig ? "See translation" : "See original"}</button></p>
  );
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
    return (<>
      <article className={`msg ours${bot ? " bot" : ""}`}>
        <p className="who">{bot && <span className="ai">AI</span>}<b>{m.who}</b><span>{m.time}</span></p>
        {body(m.gloss)}
        <Actions m={m} onAction={onAction} />
      </article>
      {link(m.gloss, "ours", "Sent in")}
    </>);
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
  return (<>
    <article className="msg theirs">
      <p className="who"><b>{customer}</b><span>Chat · {m.time}</span></p>
      {body(m.gloss)}
      <Actions m={m} onAction={onAction} translate />
    </article>
    {link(m.gloss, "theirs", "Translated from")}
  </>);
}

/** The assistant's work before a reply, after the INA agent trace: one line, opens to the steps. */
/** Dropdown in our design system (replaces the OS select): ghost trigger with chevron, white menu, tick on the current option. */
function Pick({ label, value, options, onChange, missing, chip }: { label: string; value: string; options: { value: string; label: string; dot?: string }[]; onChange: (v: string) => void; missing?: boolean; chip?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  const cur = options.find((o) => o.value === value);
  return (
    <span className="pickwrap" ref={ref}>
      <button type="button" className={`pick2${missing ? " missing" : ""}${chip ? ` chip ${chip}` : ""}`} aria-label={label} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {cur?.label ?? "Not set"}<Icon name="chev" size={12} />
      </button>
      {open && (
        <ul className="sortmenu pickmenu" role="listbox" aria-label={label}>
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button type="button" onClick={() => { onChange(o.value); setOpen(false); }}>
                <span className="stline">{o.dot && <i className={`dot st-${o.dot}`} />}{o.label}</span>
                {o.value === value && <Icon name="check" size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}

function Trace({ steps }: { steps: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="trace">
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{open ? "Hide investigation" : "Show investigation"}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none" }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className={`steps${open ? " open" : ""}`}><div>
        <ol>{steps.map((t) => <li key={t}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{t}</li>)}</ol>
      </div></div>
    </div>
  );
}

/** Reply / Internal note tabs with one pill that slides to the selected tab. */
function ComposerTabs({ mode, onChange }: { mode: "reply" | "note"; onChange: (m: "reply" | "note") => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(`[data-m="${mode}"]`);
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
  }, [mode]);
  return (
    <div ref={ref} className="tabs" role="tablist">
      {pill && <span className="tabpill" aria-hidden style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />}
      <button role="tab" data-m="reply" aria-selected={mode === "reply"} className={mode === "reply" ? "on" : ""} onClick={() => onChange("reply")}><Icon name="reply" size={14} />Reply</button>
      <button role="tab" data-m="note" aria-selected={mode === "note"} className={mode === "note" ? "on" : ""} onClick={() => onChange("note")}><Icon name="lock" size={14} />Internal note</button>
    </div>
  );
}
