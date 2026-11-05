import type { Evidence } from "@/lib/cases";

// Drawn illustrations standing in for courier photos and GPS traces (demo data).
function Scene({ e }: { e: Evidence }) {
  if (e.kind === "door") {
    const light = e.door.toUpperCase() === "#F4F2EE";
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${e.title}: ${e.note}`}>
        <rect width="200" height="130" fill={light ? "#D8D4CC" : "#C9B79C"} />
        <rect y="102" width="200" height="28" fill={light ? "#B9B3A8" : "#A89478"} />
        <rect x="64" y="16" width="72" height="88" rx="3" fill={e.door} stroke={light ? "#C9C4BA" : "none"} />
        <rect x="71" y="23" width="58" height="34" fill="#000" opacity="0.06" />
        <rect x="71" y="63" width="58" height="34" fill="#000" opacity="0.06" />
        <circle cx="128" cy="62" r="2.5" fill={light ? "#8D8678" : "#D9C27A"} />
        {e.plate && (
          <g>
            <rect x="86" y="3" width="28" height="11" rx="2" fill="#45464D" />
            <text x="100" y="11.5" fontSize="7" fontWeight="600" fill="#fff" textAnchor="middle" fontFamily="Inter, sans-serif">{e.plate}</text>
          </g>
        )}
        {e.parcel && (
          <g>
            <rect x="90" y="90" width="32" height="20" rx="2" fill="#D7B88A" />
            <rect x="90" y="97" width="32" height="3" fill="#B8925E" />
          </g>
        )}
      </svg>
    );
  }
  if (e.kind === "gate") {
    return (
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${e.title}: ${e.note}`}>
        <rect width="200" height="130" fill="#CFD6DA" />
        <rect y="100" width="200" height="30" fill="#A9B1B5" />
        <rect x="20" y="30" width="70" height="72" fill="#E9E4D8" />
        <rect x="32" y="44" width="46" height="24" fill="#8FA7B5" />
        <text x="55" y="88" fontSize="8" fontWeight="600" fill="#45464D" textAnchor="middle" fontFamily="Inter, sans-serif">SECURITY</text>
        {[100, 112, 124, 136, 148, 160, 172, 184].map((x) => (
          <rect key={x} x={x} y="40" width="4" height="62" fill="#5C5D65" />
        ))}
        <rect x="96" y="40" width="96" height="4" fill="#5C5D65" />
        <rect x="56" y="88" width="30" height="18" rx="2" fill="#D7B88A" />
      </svg>
    );
  }
  if (e.kind === "map") {
    const far = e.metres > 100;
    const end = far ? { x: 172, y: 26 } : { x: 62, y: 96 };
    return (
      <svg viewBox="0 0 230 130" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${e.title}: ${e.note}`}>
        <rect width="230" height="130" fill="#EFEFF1" />
        <path d="M0 36H230M0 92H230M58 0V130M150 0V130" stroke="#fff" strokeWidth="9" />
        <path d="M0 64H230M104 0V130" stroke="#fff" strokeWidth="4" />
        {far && <path d={`M48 104L${end.x} ${end.y}`} stroke="#0D0D10" strokeWidth="1.5" strokeDasharray="4 4" />}
        <circle cx="48" cy="104" r="7" fill="#0D0D10" />
        <circle cx="48" cy="104" r="2.5" fill="#fff" />
        <circle cx={end.x} cy={end.y} r="7" fill={far ? "#D2342B" : "#1E9E61"} />
        <circle cx={end.x} cy={end.y} r="2.5" fill="#fff" />
        {far && (
          <g>
            <rect x="88" y="55" width="54" height="18" rx="9" fill="#fff" />
            <text x="115" y="67.5" fontSize="10" fontWeight="700" fill="#0D0D10" textAnchor="middle" fontFamily="Inter, sans-serif">
              {e.metres >= 1000 ? `${(e.metres / 1000).toFixed(1)} km` : `${e.metres} m`}
            </text>
          </g>
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${e.title}: ${e.note}`}>
      <rect width="200" height="130" fill="#F7F7F8" />
      <rect x="0.5" y="0.5" width="199" height="129" rx="11.5" fill="none" stroke="#D1D1D6" strokeDasharray="5 5" />
      <text x="100" y="69" fontSize="11" fill="#6B6C74" textAnchor="middle" fontFamily="Inter, sans-serif">No photo</text>
    </svg>
  );
}

export function EvidenceTile({ e }: { e: Evidence }) {
  return (
    <figure className="tile">
      <Scene e={e} />
      <figcaption>
        <b>{e.title}</b>
        <span>{e.note}</span>
      </figcaption>
    </figure>
  );
}
