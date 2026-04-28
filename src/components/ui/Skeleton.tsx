// Skeleton is a Server Component — no interactivity needed

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkeletonProps {
  /** Additional Tailwind classes — use to set width, height, rounded, etc. */
  className?: string;
  /** Number of skeleton blocks to render. Defaults to 1. */
  count?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Skeleton — animated pulse placeholder shown while content is loading.
 *
 * Renders `count` blocks (default 1), each with a shimmer animation.
 * Pass `className` to control dimensions and shape per use-case.
 *
 * @example
 * // Single card placeholder
 * <Skeleton className="h-48 w-full rounded-xl" />
 *
 * @example
 * // Three event card placeholders
 * <Skeleton className="h-64 w-full rounded-xl" count={3} />
 */
export function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`
            animate-pulse
            bg-navy-light/40 dark:bg-white/10
            rounded-lg
            ${className}
          `}
        />
      ))}
    </>
  );
}
