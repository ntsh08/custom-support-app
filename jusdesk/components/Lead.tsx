"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/**
 * Team Lead overview: one screen, no flows behind the items (decision 2026-11-05).
 * Leads with what needs the lead now, then patterns the AI spotted, then how the team
 * is doing, with speed always paired with an outcome (research: personas, insight 8 and 9).
 * All numbers are demo data; the cases match the executive workspace.
 */

type Need = { kind: string; tone: "escalated" | "reply" | "first" | "others"; title: string; who: string; ticket: string; why: string; owner: string; age: string; urgent?: boolean };

const NEEDS: Need[] = [
  { kind: "Approval", tone: "escalated", title: "Approve ₹6,500 refund", who: "Rohan Shah", ticket: "#1039", why: "No proof of delivery, GPS 1.1 km off, size L out of stock. Above the ₹5,000 executive limit.", owner: "Escalated by Ritika", age: "12 min", urgent: true },
  { kind: "Review", tone: "escalated", title: "Review potential fraud", who: "Meera Iyer", ticket: "#1044", why: "OTP verified at her door, 3rd claim in 2 months, shared address, 1 chargeback.", owner: "Escalated by Arjun", age: "20 min", urgent: true },
  { kind: "Failed refund", tone: "reply", title: "Refund failed at the bank", who: "Sana Kapoor", ticket: "#1031", why: "₹2,400 to UPI bounced: ID inactive. No money moved; executive is asking for a new UPI ID.", owner: "Neha is on it", age: "35 min" },
  { kind: "Courier", tone: "others", title: "Ekart reply due at 4 pm", who: "Kavya Pillai", ticket: "#1045", why: "Scanned delivered while the rider was 4.2 km away. If Ekart doesn't confirm, the rider needs a call.", owner: "Ritika", age: "6 h left" },
  { kind: "First reply", tone: "first", title: "3 tickets close to the first-reply deadline", who: "Meera Iyer and 2 more", ticket: "#1044", why: "Oldest has 9 minutes left. Arjun has 12 open tickets, the most on the team.", owner: "Arjun", age: "9 min left", urgent: true },
];

const KPIS: { label: string; value: string; note: string; pair: string; pairValue: string; bad?: boolean }[] = [
  { label: "Open tickets", value: "47", note: "12 with the AI", pair: "Waiting on couriers", pairValue: "9" },
  { label: "First reply, P90", value: "14 min", note: "Target 15 min", pair: "Reopened this week", pairValue: "3.2%" },
  { label: "Resolved today", value: "132", note: "+18 vs last Friday", pair: "Came back within 7 days", pairValue: "4.1%" },
  { label: "AI resolved alone", value: "58%", note: "76 of 132", pair: "Handed to people", pairValue: "31", bad: false },
];

const PATTERNS = [
  { title: "Shadowfax · pincode 560034", stat: "4 “not received” claims this week", usual: "Usually about 1", detail: "Tickets #1039, #1042 and 2 more. All marked delivered with no OTP; two had GPS over 500 m off.", act: "Raise with Shadowfax" },
  { title: "Delhivery · OTP-verified claims", stat: "3 claims from 2 linked accounts", usual: "Usually 0", detail: "Same address, OTP entered at the door each time. Signals, not a verdict.", act: "Review accounts" },
];

const TEAM = [
  { name: "Ritika", open: 9, frt: "11 min", reopen: "2%", load: 9 },
  { name: "Arjun", open: 12, frt: "17 min", reopen: "5%", load: 12, warn: true },
  { name: "Neha", open: 7, frt: "9 min", reopen: "1%", load: 7 },
  { name: "AI assistant", open: 19, frt: "1 min", reopen: "3%", load: 19, ai: true },
];

// "Not received" tickets per hour today. One series, so no legend; the title names it.
const HOURS = [
  { h: "8 am", n: 6 }, { h: "9 am", n: 9 }, { h: "10 am", n: 14 }, { h: "11 am", n: 11 },
  { h: "12 pm", n: 8 }, { h: "1 pm", n: 10 }, { h: "2 pm", n: 7 },
];

function Bars() {
  const [hover, setHover] = useState<number | null>(null);
  const max = 16, W = 300, H = 120, gap = 2, bw = (W - gap * (HOURS.length - 1)) / HOURS.length;
  return (
    <figure className="ld-chart">
      <svg viewBox={`0 0 ${W} ${H + 18}`} role="img" aria-label="Not received tickets per hour today">
        {[0, 8, 16].map((t) => <line key={t} x1="0" x2={W} y1={H - (t / max) * H} y2={H - (t / max) * H} className="ld-grid" />)}
        {HOURS.map((d, i) => {
          const h = (d.n / max) * H, x = i * (bw + gap);
          return (
            <g key={d.h} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <rect x={x} y="0" width={bw} height={H} fill="transparent" />
              <path d={`M${x},${H} V${H - h + 4} q0,-4 4,-4 h${bw - 8} q4,0 4,4 V${H} Z`} className={`ld-bar${hover === i ? " on" : ""}`} />
              <text x={x + bw / 2} y={H + 14} textAnchor="middle" className="ld-axis">{d.h}</text>
            </g>
          );
        })}
      </svg>
      {hover !== null && <div className="ld-tip" style={{ left: `${((hover + 0.5) / HOURS.length) * 100}%` }}><b>{HOURS[hover].n}</b> tickets · {HOURS[hover].h}</div>}
      <figcaption>Peak at 10 am, after the morning Shadowfax run.</figcaption>
    </figure>
  );
}

export function Lead() {
  return (
    <div className="ld">
      <nav className="rail" aria-label="Main">
        <div className="logo" aria-label="JusDesk">J</div>
        <a className="nav" title="Tickets" href="/"><Icon name="inbox" size={18} /></a>
        <span className="nav on" aria-current="page" title="Team overview"><Icon name="dashboard" size={18} /></span>
      </nav>

      <main className="ld-main">
        <header className="ld-head">
          <div>
            <h1>Team overview</h1>
            <p>Friday, 7 Nov · Priya, team lead · “Marked delivered, but not received” queue</p>
          </div>
          <span className="ld-live"><i />Live · updated 2 min ago</span>
        </header>

        <div className="ld-body">
          <section className="ld-kpis" aria-label="How the team is doing">
            {KPIS.map((k) => (
              <div key={k.label} className="ld-kpi">
                <span className="ld-kl">{k.label}</span>
                <b>{k.value}</b>
                <span className="ld-kn">{k.note}</span>
                <span className="ld-kp"><span>{k.pair}</span><em>{k.pairValue}</em></span>
              </div>
            ))}
          </section>

          <div className="ld-grid2">
            <section className="ld-card" aria-label="Needs you now">
              <h2>Needs you now <span>{NEEDS.length}</span></h2>
              <ul className="ld-needs">
                {NEEDS.map((n) => (
                  <li key={n.title}>
                    <div className="ld-nl">
                      <span className={`st st-${n.tone}`}>{n.kind}</span>
                      <span className="tk"><Icon name="ticket" size={12} />{n.ticket}</span>
                    </div>
                    <div className="ld-nm">
                      <b>{n.title}</b>
                      <span className="ld-who">{n.who} · {n.owner}</span>
                      <p>{n.why}</p>
                    </div>
                    <em className={n.urgent ? "bad" : ""}>{n.age}</em>
                  </li>
                ))}
              </ul>
            </section>

            <div className="ld-side">
              <section className="ld-card ld-ai" aria-label="Patterns the AI spotted">
                <h2><Icon name="spark" size={14} />Patterns the AI spotted</h2>
                {PATTERNS.map((p) => (
                  <div key={p.title} className="ld-pat">
                    <b>{p.title}</b>
                    <span className="ld-stat">{p.stat} <em>{p.usual}</em></span>
                    <p>{p.detail}</p>
                    <span className="ld-act">{p.act}</span>
                  </div>
                ))}
              </section>

              <section className="ld-card" aria-label="Not received tickets per hour">
                <h2>“Not received” tickets per hour</h2>
                <Bars />
              </section>
            </div>
          </div>

          <section className="ld-card" aria-label="Team today">
            <h2>Team today</h2>
            <table className="ld-team">
              <thead><tr><th>Owner</th><th>Open</th><th>First reply, P90</th><th>Reopened</th><th>Load</th></tr></thead>
              <tbody>
                {TEAM.map((t) => (
                  <tr key={t.name}>
                    <td>{t.ai ? <span className="ld-ain"><Icon name="spark" size={12} />{t.name}</span> : t.name}</td>
                    <td>{t.open}</td>
                    <td className={t.warn ? "warn" : ""}>{t.frt}{t.warn && " · over target"}</td>
                    <td>{t.reopen}</td>
                    <td><span className="ld-load"><i style={{ width: `${(t.load / 20) * 100}%` }} className={t.warn ? "warn" : t.ai ? "ai" : ""} /></span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}

