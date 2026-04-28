import { redirect } from "next/navigation";

/**
 * Redirects to the hosted Sanity Studio.
 * The embedded studio has dependency conflicts with Next.js 16 + Turbopack.
 */
export default function StudioRedirect() {
  redirect("https://defd0jhe.sanity.studio");
}
