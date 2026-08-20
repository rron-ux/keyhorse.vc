import { createFileRoute } from "@tanstack/react-router";
import Site from "@/components/keyhorse/Site";
import type { PageId } from "@/components/keyhorse/shared";

const IDS: PageId[] = [
  "about",
  "industries",
  "portfolio",
  "media",
  "resources",
  "partners",
  "apply",
];

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Keyhorse Capital — Kentucky venture capital" },
      {
        name: "description",
        content:
          "Industries, companies, coverage and funds from Keyhorse Capital, the venture arm backing Kentucky founders.",
      },
      { property: "og:title", content: "Keyhorse Capital — Kentucky venture capital" },
      {
        property: "og:description",
        content:
          "Industries, companies, coverage and funds from Keyhorse Capital, the venture arm backing Kentucky founders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatchAll,
});

function CatchAll() {
  const { _splat } = Route.useParams();
  const parts = (_splat || "").split("/");
  const raw = parts[0] === "companies" ? "portfolio" : parts[0];
  const first = raw as PageId;
  if (first === "media" && parts[1] === "record") return <Site initialPage="record" />;
  if ((first === "media" || first === "post") && parts[1])
    return <Site initialPage="post" initialSlug={parts[1]} />;
  const page = IDS.includes(first) ? first : "home";
  return <Site initialPage={page} />;
}

