import type { Event } from "@/types";
import { EventCard } from "@/components/events/EventCard";
import { Skeleton } from "@/components/ui/Skeleton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * EventGrid — responsive grid of EventCard components for the /events listing page.
 *
 * Shows Skeleton placeholders while content is loading.
 * Requirements: 8.2, 8.3
 */
export function EventGrid({ events, isLoading = false }: EventGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-60 w-full rounded-2xl" />
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-navy/50 dark:text-white/50 text-lg">
          No events published yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} variant="full" />
      ))}
    </div>
  );
}
