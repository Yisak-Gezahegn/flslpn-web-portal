/**
 * Shared utility functions used across the portal.
 */

/**
 * Formats an ISO 8601 datetime string into a human-readable date.
 *
 * @example
 * formatDate("2024-03-15T10:00:00Z") // → "March 15, 2024"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats an ISO 8601 datetime string into a short date (e.g. for cards).
 *
 * @example
 * formatDateShort("2024-03-15T10:00:00Z") // → "Mar 15, 2024"
 */
export function formatDateShort(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Converts a string into a URL-safe slug.
 * Lowercases, strips non-alphanumeric characters, and replaces spaces with hyphens.
 *
 * @example
 * slugify("Hello World!") // → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove non-word chars (except hyphens)
    .replace(/[\s_]+/g, "-")    // replace spaces and underscores with hyphens
    .replace(/--+/g, "-")       // collapse multiple hyphens
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if truncated.
 *
 * @example
 * truncate("Hello World", 8) // → "Hello Wo…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Returns the current year as a number — used in the Footer copyright notice.
 */
export function currentYear(): number {
  return new Date().getFullYear();
}
