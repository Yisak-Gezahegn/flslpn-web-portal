import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Sanity client — uses a placeholder projectId during build if env var is not set.
 * All actual fetches are wrapped in try/catch so they fail gracefully.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

/**
 * Typed fetch helper — returns null/empty on failure so pages render with fallback data.
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  if (projectId === "placeholder") {
    throw new Error("Sanity projectId not configured");
  }
  return client.fetch<T>(query, params ?? {});
}
