'use client';

export function RoadBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sepia gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-asphalt via-asphalt-light to-asphalt" />

      {/* Animated road dashes on the right side */}
      <div className="absolute right-[15%] top-0 bottom-0 w-px opacity-[0.06]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-rockport-dim"
            style={{
              height: '40px',
              top: `${i * 14}%`,
              animation: `road-dash ${6 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Road dashes on left side */}
      <div className="absolute left-[12%] top-0 bottom-0 w-px opacity-[0.04]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-rockport-dim"
            style={{
              height: '30px',
              top: `${i * 18}%`,
              animation: `road-dash ${8 + i * 0.7}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      {/* Horizontal speed lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`speed-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-rockport-dim to-transparent opacity-[0.05]"
          style={{
            top: `${20 + i * 20}%`,
            width: '200px',
            animation: `speed-line ${4 + i * 2}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Corner vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.8)_100%)]" />
    </div>
  );
}
