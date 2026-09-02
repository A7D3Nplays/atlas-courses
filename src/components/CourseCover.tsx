import type { Course } from '@/data/courses';

/**
 * Procedural course cover art — code-drawn SVG, no external images.
 * Each course renders two deterministic variants (A/B); cards crossfade
 * between them on hover, per the editorial-commerce reference pattern.
 */
export default function CourseCover({
  course,
  variant = 'a',
  className = '',
}: {
  course: Course;
  variant?: 'a' | 'b';
  className?: string;
}) {
  const { bg, fg, accent, pattern } = course.palette;
  const flip = variant === 'b';
  const p = flip ? accent : bg;
  const q = flip ? bg : fg;
  const r = flip ? fg : accent;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={`${course.title} cover art`}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <rect width="400" height="300" fill={p} />
      {pattern === 'stripes' && (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x={i * 50 - 10}
              y={flip ? (i % 2 === 0 ? 0 : 60) : 0}
              width={22}
              height={flip ? (i % 2 === 0 ? 300 : 240) : 300}
              fill={i % 3 === 0 ? r : q}
              opacity={i % 3 === 0 ? 1 : 0.16}
            />
          ))}
        </g>
      )}
      {pattern === 'grid' && (
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 66} y1="0" x2={i * 66} y2="300" stroke={q} strokeWidth="1" opacity="0.35" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 75} x2="400" y2={i * 75} stroke={q} strokeWidth="1" opacity="0.35" />
          ))}
          <rect x={flip ? 198 : 66} y={flip ? 75 : 150} width="132" height="150" fill={r} />
          <circle cx={flip ? 330 : 264} cy="75" r="38" fill={q} opacity="0.9" />
        </g>
      )}
      {pattern === 'arcs' && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={flip ? 400 : 0}
              cy={flip ? 0 : 300}
              r={70 + i * 52}
              fill="none"
              stroke={i % 2 === 0 ? r : q}
              strokeWidth={i % 2 === 0 ? 26 : 2}
              opacity={i % 2 === 0 ? 1 : 0.5}
            />
          ))}
          <rect x={flip ? 40 : 260} y="110" width="90" height="90" fill={r} />
        </g>
      )}
      {pattern === 'dots' && (
        <g>
          {Array.from({ length: 10 }).map((_, x) =>
            Array.from({ length: 8 }).map((_, y) => {
              const on = (x + y * 2) % 5 === 0;
              return (
                <circle
                  key={`${x}-${y}`}
                  cx={x * 44 + 22}
                  cy={y * 42 + 20}
                  r={on ? 13 : 4}
                  fill={on ? r : q}
                  opacity={on ? 1 : 0.4}
                />
              );
            })
          )}
        </g>
      )}
      {pattern === 'wave' && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M -20 ${60 + i * 52} C 100 ${20 + i * 52}, 300 ${100 + i * 52}, 420 ${60 + i * 52}`}
              fill="none"
              stroke={i === 2 ? r : q}
              strokeWidth={i === 2 ? 20 : 2}
              opacity={i === 2 ? 1 : 0.4}
            />
          ))}
          <rect x={flip ? 270 : 40} y={flip ? 30 : 190} width="70" height="70" fill={r} transform={flip ? 'rotate(45 305 65)' : 'rotate(45 75 225)'} />
        </g>
      )}
      {pattern === 'blocks' && (
        <g>
          <rect x={flip ? 200 : 0} y="0" width="200" height="150" fill={q} opacity="0.92" />
          <rect x={flip ? 0 : 200} y="150" width="200" height="150" fill={r} />
          <rect x={flip ? 60 : 260} y={flip ? 190 : 40} width="80" height="80" fill={p} stroke={q} strokeWidth="2" />
        </g>
      )}
      {/* monogram strip — ties every cover back to the wordmark system */}
      <text
        x="20"
        y="284"
        fontFamily="JetBrains Mono, monospace"
        fontSize="13"
        letterSpacing="3"
        fill={q}
        opacity="0.85"
      >
        {course.category.toUpperCase()} / {course.id.slice(0, 4).toUpperCase()}
      </text>
    </svg>
  );
}
