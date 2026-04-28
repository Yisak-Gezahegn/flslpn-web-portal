import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

/**
 * Sanity image URL builder instance, bound to the project client.
 * Use `urlFor(source).width(800).url()` to generate optimised image URLs.
 */
const builder = imageUrlBuilder(client);

/**
 * Returns an image URL builder for the given Sanity image source.
 *
 * @example
 * // Basic usage
 * <img src={urlFor(coverImage).width(800).url()} alt={coverImage.alt} />
 *
 * @example
 * // With format conversion and quality
 * urlFor(photo).width(400).height(400).fit("crop").format("webp").quality(80).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
