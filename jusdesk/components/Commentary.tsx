"use client";

import { useRef, useState } from "react";
import { COMMENTARY } from "@/lib/commentary";

/**
 * Floating presenter notes for the open case. Black, draggable by its header,
 * can shrink to its header or be closed. Not saved: it comes back on refresh.
 */
export function Commentary({ caseId, customer, onGo }: { caseId: string; customer: string; onGo: (id: string) => void }) {
  const [open, setOpen] = useState(true);
  const [small, setSmall] = useState(false);
  const [pos, setPos] = useState({ x: 16, y: -16 }); // from the bottom-left corner
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const c = COMMENTARY[caseId];
  const order = Object.entries(COMMENTARY).sort((a, b) => a[1].n - b[1].n).map(([id]) => id);
  const i = order.indexOf(caseId);
  if (!open || !c) return null;

  function down(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest("button")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - (window.innerHeight + pos.y) };
  }
  function move(e: React.PointerEvent) {
    if (!drag.current) return;
    const x = Math.min(Math.max(8, e.clientX - drag.current.dx), window.innerWidth - 120);
    const top = Math.min(Math.max(8, e.clientY - drag.current.dy), window.innerHeight - 40);
    setPos({ x, y: top - window.innerHeight });
  }
  function up() { drag.current = null; }

  return (
    <aside className="cmt" style={{ left: pos.x, bottom: -pos.y }} aria-label="Presenter notes">
      <header onPointerDown={down} onPointerMove={move} onPointerUp={up}>
        <b>Nitish&apos;s commentary</b>
        <span className="cmt-sp" />
        <button aria-label={small ? "Expand notes" : "Shrink notes"} onClick={() => setSmall((v) => !v)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">{small ? <path d="M6 15l6-6 6 6" /> : <path d="M5 12h14" />}</svg>
        </button>
        <button aria-label="Close notes" onClick={() => setOpen(false)}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </header>
      {!small && <p className="cmt-note">All five tickets are edge cases of one complaint: &ldquo;Marked delivered, but not received&rdquo;. Each shows a different way it can go.</p>}
      {!small && (
        <div className="cmt-nav">
          <button aria-label="Previous case" disabled={i <= 0} onClick={() => onGo(order[i - 1])}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <span className="cmt-case"><span className="cmt-n">Case {c.n} of {order.length}</span>{customer}</span>
          <button aria-label="Next case" disabled={i >= order.length - 1} onClick={() => onGo(order[i + 1])}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
      {!small && (
        <dl>
          <dt>What&apos;s happening</dt>
          <dd>{c.happening}</dd>
          <dt>What it shows</dt>
          <dd>{c.shows}</dd>
        </dl>
      )}
    </aside>
  );
}
