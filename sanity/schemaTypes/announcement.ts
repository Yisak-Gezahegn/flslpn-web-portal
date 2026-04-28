import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().min(1).error("Title is required"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description: "Full announcement content (rich text)",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description: "Controls ordering on the About page (newest first)",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Only active announcements are shown on the site",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Published Date, Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      isActive: "isActive",
    },
    prepare({ title, publishedAt, isActive }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "No date";
      return {
        title: title ?? "Untitled Announcement",
        subtitle: `${date} · ${isActive ? "Active" : "Inactive"}`,
      };
    },
  },
});
