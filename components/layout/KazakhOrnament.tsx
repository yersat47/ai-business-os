function KazakhBorderTop({ y }: { y: number }) {
  const pattern = [];
  for (let x = 0; x < 1920; x += 16) {
    pattern.push(
      <rect key={`t1-${x}`} x={x} y={y} width={6} height={6} fill="#C9963A" />
    );
    pattern.push(
      <rect key={`t2-${x}`} x={x + 8} y={y + 6} width={6} height={6} fill="#C9963A" />
    );
  }
  return <g>{pattern}</g>;
}

function KazakhBorderBottom({ y }: { y: number }) {
  const pattern = [];
  for (let x = 0; x < 1920; x += 16) {
    pattern.push(
      <rect key={`b1-${x}`} x={x} y={y + 6} width={6} height={6} fill="#C9963A" />
    );
    pattern.push(
      <rect key={`b2-${x}`} x={x + 8} y={y} width={6} height={6} fill="#C9963A" />
    );
  }
  return <g>{pattern}</g>;
}

function KazakhCorner({
  x,
  y,
  flip,
  flipY,
}: {
  x: number;
  y: number;
  flip?: boolean;
  flipY?: boolean;
}) {
  const sx = flip ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${sy})`}>
      <rect x="0" y="0" width="6" height="6" fill="#C9963A" />
      <rect x="8" y="0" width="6" height="6" fill="#C9963A" />
      <rect x="0" y="8" width="6" height="6" fill="#C9963A" />
      <rect x="8" y="8" width="6" height="6" fill="#C9963A" />
      <rect x="16" y="0" width="6" height="6" fill="#C9963A" />
      <rect x="0" y="16" width="6" height="6" fill="#C9963A" />
      <rect x="24" y="8" width="6" height="6" fill="#C9963A" />
      <rect x="8" y="24" width="6" height="6" fill="#C9963A" />
    </g>
  );
}

export function KazakhOrnament() {
  return (
    <div
      className="fixed inset-0 z-[3] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.04 }}
      >
        <KazakhBorderTop y={0} />
        <KazakhBorderBottom y={1072} />
        <rect x="0" y="0" width="1.5" height="1080" fill="#C9963A" />
        <rect x="1918.5" y="0" width="1.5" height="1080" fill="#C9963A" />
        <KazakhCorner x={8} y={8} />
        <KazakhCorner x={1912} y={8} flip />
        <KazakhCorner x={8} y={1072} flipY />
        <KazakhCorner x={1912} y={1072} flip flipY />
        <g transform="translate(960, 540)" opacity="0.3">
          <circle
            r="200"
            fill="none"
            stroke="#C9963A"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle
            r="140"
            fill="none"
            stroke="#C9963A"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle r="60" fill="none" stroke="#C9963A" strokeWidth="1" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 60}
                y1={Math.sin(a) * 60}
                x2={Math.cos(a) * 200}
                y2={Math.sin(a) * 200}
                stroke="#C9963A"
                strokeWidth="0.4"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
