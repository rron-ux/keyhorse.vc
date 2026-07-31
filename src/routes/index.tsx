import { createFileRoute } from "@tanstack/react-router";
import Site from "@/components/keyhorse/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keyhorse Capital — Kentucky venture capital and the record" },
      {
        name: "description",
        content:
          "Keyhorse Capital backs tech-enabled founders across Kentucky and reports every disclosed round in the Commonwealth.",
      },
      {
        property: "og:title",
        content: "Keyhorse Capital — Kentucky venture capital and the record",
      },
      {
        property: "og:description",
        content:
          "Investor and publication: three funds, five industry pillars, and the published record of Kentucky venture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Site />;
}
