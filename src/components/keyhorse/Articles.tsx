import { useMemo, useState } from "react";
import { ARTICLES, type Article } from "@/data/articles";
import { CoverImg, MEDIA_RETURN_KEY, SectionLabel } from "./Media";
import { useSite } from "./shared";

const ts = (d: string) => Date.parse(d) || 0;
const SORTED = [...ARTICLES].sort((a, b) => ts(b.date) - ts(a.date));

const CHIPS = [
  ["all", "All"],
  ["news", "News"],
  ["reports", "Reports"],
  ["stories", "Stories"],
] as const;
type ChipId = (typeof CHIPS)[number][0];

function catOf(a: Article): ChipId {
  if (a.category === "announcements") return "news";
  if (a.category === "perspectives") return "reports";
  return "stories";
}
const CAT_LABEL: Record<ChipId, string> = {
  all: "All",
  news: "News",
  reports: "Reports",
  stories: "Stories",
};

const SERIES_LABEL: Record<Article["series"], string> = {
  founding: "Founding Stories",
  behind: "Behind the Scenes",
  cycle: "Investment Cycle",
};

const fmtDate = (d: string) => {
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function Articles() {
  const { openPost, go } = useSite();

  const backToMedia = () => {
    let y = 0;
    try {
      y = Number(sessionStorage.getItem(MEDIA_RETURN_KEY) || 0) || 0;
    } catch { /* ignore */ }
    go("media");
    requestAnimationFrame(() => {
      setTimeout(() => window.scrollTo({ top: y, behavior: "auto" }), 0);
    });
  };
  const [chip, setChip] = useState<ChipId>("all");

  const posts = useMemo(
    () => (chip === "all" ? SORTED : SORTED.filter((p) => catOf(p) === chip)),
    [chip],
  );

  return (
    <div className="band mx-blog" id="articles">
      <div className="wrap">
        <button className="mx-muted-link mx-back" onClick={backToMedia}>
          ← Back to Media
        </button>
        <SectionLabel left="Articles" right="Everything we publish" />
        <h1 className="mx-h2">Reported from across the Commonwealth.</h1>

        <div className="mx-filter">
          <div className="mx-chips">
            {CHIPS.map(([v, l]) => (
              <button
                key={v}
                className="mx-chip"
                aria-pressed={chip === v}
                onClick={() => setChip(v)}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="mx-mono">{posts.length} articles</span>
        </div>

        {posts.length ? (
          <div className="mx-grid">
            {posts.map((p) => (
              <button className="mx-card" key={p.slug} onClick={() => openPost(p.slug)}>
                <div className="mx-card-img">
                  <CoverImg src={p.cover} alt={p.person || p.title} />
                </div>
                <div className="mx-card-body">
                  <div className="mx-card-meta">
                  <span className="mx-card-cat">
                    {p.category === "stories" ? SERIES_LABEL[p.series] : CAT_LABEL[catOf(p)]}
                  </span>
                  <span className="mx-mono">{fmtDate(p.date)}</span>
                  </div>
                  <h3 className="mx-card-h">{p.title}</h3>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="mx-empty">Nothing published in this category yet.</p>
        )}
      </div>
    </div>
  );
}
