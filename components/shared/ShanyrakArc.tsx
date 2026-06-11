export function ShanyrakArc({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="200" cy="200" r="180" stroke="#C9923A" strokeWidth="1" opacity="0.15" />
      <circle cx="200" cy="200" r="140" stroke="#C9923A" strokeWidth="1" opacity="0.1" />
      <circle cx="200" cy="200" r="100" stroke="#C9923A" strokeWidth="1" opacity="0.08" />
      <circle cx="200" cy="200" r="60" stroke="#C9923A" strokeWidth="1" opacity="0.05" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="200"
          y1="200"
          x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
          y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
          stroke="#C9923A"
          strokeWidth="0.5"
          opacity="0.06"
        />
      ))}
    </svg>
  );
}
