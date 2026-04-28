import type { TeamMember } from "@/types";
import { TeamCard } from "@/components/team/TeamCard";
import { Skeleton } from "@/components/ui/Skeleton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamGridProps {
  members: TeamMember[];
  isLoading?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * TeamGrid — responsive grid of TeamCard components.
 * 1 column on mobile / 2 on tablet / 3 on desktop.
 * Shows Skeleton placeholders while loading.
 * Requirements: 9.2, 9.6
 */
export function TeamGrid({ members, isLoading = false }: TeamGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <Skeleton className="h-5 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-navy/50 dark:text-white/50 text-lg">
          Team information coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {members.map((member) => (
        <TeamCard key={member._id} member={member} />
      ))}
    </div>
  );
}
