import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: only one document of this type should exist.
  // Managed via custom structure in sanity.config.ts
  fields: [
    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "array",
      description: "Exactly 3 images are required for the home page carousel",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Required: describe the image for screen readers",
              validation: (r) =>
                r.required().error("Alt text is required for accessibility"),
            }),
          ],
        },
      ],
      validation: (r) =>
        r
          .required()
          .min(3)
          .max(3)
          .error("Exactly 3 hero images are required"),
    }),
    defineField({
      name: "aboutText",
      title: "About / Mission Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text displayed on the About page and Home page summary",
    }),
    defineField({
      name: "missionStatement",
      title: "Mission Statement",
      type: "string",
      description: "Short mission statement shown as overlay on hero carousel",
      validation: (r) => r.required().error("Mission statement is required"),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Primary contact email displayed in the footer and contact page",
      validation: (r) =>
        r
          .required()
          .email()
          .error("A valid contact email is required"),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
