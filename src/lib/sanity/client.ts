import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  // Warn at startup — won't throw so the app can still build without credentials
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. " +
      "CMS data will not be available until the environment variable is configured."
  );
}

/**
 * Sanity client configured for public reads via the CDN.
 * For draft/preview mode, set `useCdn: false` and pass a token.
 */
export const client = createClient({
  projectId: projectId ?? "",
  dataset,
  apiVersion: "2024-01-01", // pin to a stable API date
  useCdn: true, // CDN for fast public reads; disable for draft previews
});

/**
 * Typed fetch helper — wraps `client.fetch` with a generic type parameter
 * so callers get full TypeScript inference on the returned data.
 *
 * @example
 * const events = await sanityFetch<Event[]>(ALL_EVENTS_QUERY);
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {});
}
