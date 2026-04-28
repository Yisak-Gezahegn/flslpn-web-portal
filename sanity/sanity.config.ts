import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "flslpn-studio",
  title: "FLSLPN Studio",

  // Hardcoded for deployed studio — env vars are not available in the built bundle
  projectId: "defd0jhe",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("event").title("Events"),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.documentTypeListItem("announcement").title("Announcements"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
