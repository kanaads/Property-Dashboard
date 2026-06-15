import { useEffect, useState } from 'react';

interface ValueGaugeProps {
  score: number; // 1–100
  size?: number;
  /** Compact variant hides the label ring for tight spaces (e.g. cards). */
  showTrack?: boolean;
}

/** Map a 1–100 score to a tier color. */
function tierColor(score: number): string {
  if (score >= 80) return 'var(--color-gauge-high)';
  if (score >= 65) return 'var(--color-gauge-mid)';
  return 'var(--color-gauge-low)';
}

/**
 * Radial "latent value" gauge — the dashboard's signature element.
 * Encodes Propvia's core promise (surfacing hidden value) as a visual figure.
 *
 * On mount the arc draws in from zero, framing the score as something being
 * "revealed" rather than just displayed. Scores of 80+ ("strong" tier) get a
 * soft halo glow — the one deliberate visual flourish in the product,
 * reserved for listings that are genuinely worth a second look.
 */
export function ValueGauge({ score, size = 56, showTrack = true }: ValueGaugeProps) {
  const stroke = size * 0.12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.round(Math.max(0, Math.min(100, score)));
  const targetOffset = c - (clamped / 100) * c;
  const color = tierColor(clamped);
  const isStrong = clamped >= 80;

  // Start fully "empty" and animate to the target offset after mount so the
  // arc draws on — the gauge "reveals" the score.
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOffset(targetOffset));
    return () => cancelAnimationFrame(frame);
  }, [targetOffset]);

  return (
    <div
      role="img"
      aria-label={`Latent value score ${clamped} out of 100`}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {isStrong && <span className="gauge-halo" aria-hidden="true" />}
      <svg width={size} height={size} className="relative -rotate-90">
        {showTrack && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--color-slate-50)"
            strokeWidth={stroke}
          />
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="gauge-arc"
        />
      </svg>
      <span
        className="absolute font-mono font-bold leading-none text-slate-900 tabular-nums"
        style={{ fontSize: size * 0.3 }}
      >
        {clamped}
      </span>
    </div>
  );
}

