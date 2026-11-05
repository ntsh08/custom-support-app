// Small authored icon set: 20px grid, 1.6px stroke, round caps.
const PATHS: Record<string, string> = {
  inbox: "M3 12h4l2 3h6l2-3h4M5.5 5h13L21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  check: "M5 12.5l4.5 4.5L19 7.5",
  undo: "M9 14L4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11",
  send: "M4 12l16-8-6 16-2.5-6.5z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z",
  play: "M8 5v14l11-7z",
};

export function Icon({ name, size = 20 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
