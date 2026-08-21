import { useMemo, useState } from "react";
import { ARTICLES, type Article, type Category } from "@/data/articles";
import { COVERAGE, EVENTS, ROUNDS } from "@/data/media";
import { PICS } from "@/lib/images";
import logisticsAsset from "@/assets/logistics.jpg.asset.json";
import riseCoverAsset from "@/assets/rise-of-the-rest-invest-local.png.asset.json";
const riseCover = riseCoverAsset.url;
import { useSite } from "./shared";

export const CAT_COLOR: Record<Category, string> = {
  stories: "#00A8E1",
  perspectives: "#00A8E1",
  announcements: "#222222",
};

export const TAG_LABEL: Record<string, string> = {
  founding: "Founding Stories",
  behind: "Behind the Scenes",
  cycle: "Investment Cycle",
};

const ts = (d: string) => Date.parse(d) || 0;
const SORTED = [...ARTICLES].sort((a, b) => ts(b.date) - ts(a.date));

const PASTURE = PICS["kh-kentucky"]!.src;
const LOGISTICS = logisticsAsset.url;

/** Logo / graphic covers should letterbox, photos should fill. */
export function CoverImg({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const [fit, setFit] = useState<"cover" | "contain">(
    /Group%20342|Group 342|logo|q3-cycle|proximity/i.test(src) ? "contain" : "cover",
  );
  const check = (el: HTMLImageElement | null) => {
    if (!el || !el.complete || !el.naturalWidth) return;
    const r = el.naturalWidth / (el.naturalHeight || 1);
    if (r >= 1.95 || r <= 0.62) setFit("contain");
  };
  return (
    <img
      ref={check}
      className={fit === "contain" ? "is-graphic" : undefined}
      loading={eager ? undefined : "lazy"}
      src={src}
      alt={alt}
      onLoad={(e) => check(e.currentTarget)}
    />
  );
}

export function SectionLabel({ left, right }: { left: string; right: string }) {
  return (
    <div className="mx-lab">
      <span>{left}</span>
      <i aria-hidden="true" />
      <span className="mx-lab-r">{right}</span>
    </div>
  );
}

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

const catSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const fmtRound = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/* ─────────── story submission ─────────── */

const RF_SECTORS = [
  "Logistics & trade",
  "Advanced manufacturing",
  "Aerospace & defense",
  "Healthcare",
  "Energy & materials",
  "Agriculture & food",
  "Software",
  "Consumer",
  "Fintech",
  "Other",
];

const RF_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Debt / venture debt",
  "Grant / non-dilutive",
  "Other",
];

function PitchForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="md-form">
      <p className="md-eyebrow">Submit a round</p>
      <h3 className="md-form-h">Add a round to the record.</h3>
      {sent ? (
        <p className="md-p">
          Thank you — we verify every submission before it appears on the record and will be
          in touch if we need anything else.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="md-f">
            <span>Your name *</span>
            <input required maxLength={100} placeholder="Your name" />
          </label>
          <label className="md-f">
            <span>Email *</span>
            <input required type="email" maxLength={255} placeholder="you@company.com" />
          </label>
          <label className="md-f">
            <span>Company name *</span>
            <input required maxLength={120} placeholder="Company raising the round" />
          </label>
          <div className="md-f2">
            <label className="md-f">
              <span>City *</span>
              <input required maxLength={80} placeholder="Louisville" />
            </label>
            <label className="md-f">
              <span>State</span>
              <input maxLength={40} defaultValue="KY" />
            </label>
          </div>
          <div className="md-f2">
            <label className="md-f">
              <span>Sector *</span>
              <select required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {RF_SECTORS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="md-f">
              <span>Stage</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                {RF_STAGES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="md-f2">
            <label className="md-f">
              <span>Round size closed *</span>
              <input required maxLength={40} placeholder="$2.5M" />
            </label>
            <label className="md-f">
              <span>Date closed *</span>
              <input required type="month" />
            </label>
          </div>
          <label className="md-f">
            <span>Lead investor(s)</span>
            <input maxLength={200} placeholder="Optional" />
          </label>
          <label className="md-f">
            <span>Evidence — link (optional)</span>
            <input type="url" maxLength={500} placeholder="https://press-release or filing" />
          </label>
          <label className="md-f">
            <span>Evidence — upload (optional)</span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
          </label>
          <label className="md-f">
            <span>Description *</span>
            <textarea
              required
              maxLength={800}
              rows={4}
              placeholder="What the company does and what the round funds."
            />
          </label>
          <label className="md-check">
            <input required type="checkbox" />
            <span>
              I confirm this information is accurate and may be published on the Keyhorse
              record. Do not submit confidential or embargoed information.
            </span>
          </label>
          <button className="btn" type="submit" style={{ marginTop: 6 }}>
            Submit round
          </button>
        </form>
      )}
    </div>
  );
}


/* ─────────── blurred calendar shape ─────────── */

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function MonthShape() {
  const y = 2026;
  const m = 7; // August 2026
  const cells = useMemo(() => {
    const lead = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;
    const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    const out: (number | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= days; d++) out.push(d);
    while (out.length % 7) out.push(null);
    return out;
  }, []);
  const marked = new Set(
    EVENTS.filter((e) => e.date.startsWith("2026-08")).map((e) => Number(e.date.slice(8))),
  );
  return (
    <div className="mx-month">
      <div className="mx-month-h">
        <strong>
          {MONTHS[m]} {y}
        </strong>
        <span className="mx-mono">Ecosystem</span>
      </div>
      <div className="mx-month-g">
        {DOW.map((d) => (
          <span className="mx-dow" key={d}>
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span
            className={`mx-day${d ? "" : " off"}${d && marked.has(d) ? " on" : ""}`}
            key={i}
          >
            {d ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────── page ─────────── */

export default function Media() {
  const { go, openSlide, openPost } = useSite();
  const [chip, setChip] = useState<ChipId>("all");
  const [covPage, setCovPage] = useState(0);

  const latest = SORTED[0]!;
  const posts = useMemo(() => {
    if (chip === "all") return SORTED;
    const want = catSlug(CHIPS.find(([v]) => v === chip)![1]);
    return SORTED.filter((p) => catSlug(CAT_LABEL[catOf(p)]) === want);
  }, [chip]);
  const shown = posts.slice(0, 6);
  const pages = Math.max(1, Math.ceil(posts.length / 6));

  const rounds = ROUNDS.slice(0, 5);

  const FEATURED = {
    outlet: "Rise of the Rest / Revolution",
    quoteStart: "Invest Local: ",
    mark: "The State of Intra-State Venture Investing",
    quoteEnd: "",
    source: "Annual Report",
    date: "2026",
    url: "https://revolution.docsend.com/view/jbqah9ydus8djd9m",
  };

  const BIP = {
    outlet: "BIP Ventures",
    title: "Keyhorse named third most active VC fund in the Southeast",
    date: "Oct 2025",
    url: "https://www.bipventures.vc/state-of-startups/2025#highlights",
  };

  const isReal = (c: { outlet: string; title: string; date: string; url: string }) =>
    Boolean(c.url) &&
    !/^\[|TBC/i.test(c.outlet) &&
    !/^\[|TBC/i.test(c.title) &&
    !/TBC/i.test(c.date) &&
    c.url !== FEATURED.url &&
    !/bipventures/i.test(c.url);

  const parseCovDate = (d: string) => {
    const m: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
    };
    const norm = d.toLowerCase().replace(/[^a-z0-9]/g, " ");
    const parts = norm.trim().split(/\s+/);
    let month = 0;
    let year = 0;
    for (const p of parts) {
      if (m[p]) month = m[p];
      else if (/^\d{4}$/.test(p)) year = Number(p);
    }
    return { year, month, key: year * 100 + month };
  };
  const yearOf = (d: string) => String(parseCovDate(d).year || d);

  const mentions = [
    BIP,
    ...COVERAGE.filter((c) => isReal(c as never)).map((c) => ({
      outlet: c.outlet,
      title: c.title,
      date: c.date,
      url: c.url,
    })),
  ]
    .map((c) => ({ ...c, sortKey: parseCovDate(c.date).key }))
    .sort((a, b) => b.sortKey - a.sortKey);
  const per = 3;
  const covPages = Math.max(1, Math.ceil(mentions.length / per));
  const covIdx = Math.min(covPage, covPages - 1);
  const covShown = mentions.slice(covIdx * per, covIdx * per + per);


  return (
    <section className="page on md mx">
      {/* 1 · Hero */}
      <div className="band mx-hero mx-hero--media">
        <div className="wrap">
          <p className="mx-hero-label">Media</p>
          <h1 className="mx-hero-title">
            The living story of{" "}
            <em className="mx-hero-cyan">innovation in Kentucky</em>
          </h1>
        </div>
      </div>

      {/* Latest story */}
      <div className="band mx-latest">
        <div className="wrap mx-latest-in">
          <div>
            <span className="mx-kick">Latest · {CAT_LABEL[catOf(latest)]}</span>
            <h2 className="mx-lh">{latest.title}</h2>
            <p className="mx-dek">{latest.standfirst}</p>
            <div className="mx-latest-ft">
              <button className="mx-link" onClick={() => openPost(latest.slug)}>
                Read the story →
              </button>
              <span className="mx-mono">{latest.date} · 6 min read</span>
            </div>
          </div>
          <button className="mx-latest-img" onClick={() => openPost(latest.slug)}>
            <CoverImg eager src={latest.cover} alt={latest.person || latest.title} />
          </button>
        </div>
      </div>

      {/* 2 · The Record */}
      <div className="mx-dark" id="record">
        <div className="wrap mx-dark-in">
          <SectionLabel left="The Record" right="2026" />
          <div className="mx-rechead">
            <div>
              <h2 className="mx-h2">Every round raised in the Commonwealth.</h2>
              <p className="mx-sub">
                A running list of disclosed venture funding across Kentucky.
              </p>
            </div>
            <span className="mx-live">
              <i aria-hidden="true" />
              {"\n"}
            </span>
          </div>

          <table className="mx-tbl">
            <thead>
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Location</th>
                <th>Sector</th>
                <th className="r">Raised</th>
                <th className="r">Source</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((r) => (
                <tr key={r.company + r.date}>
                  <td className="mx-mono">{fmtRound(r.date)}</td>
                  <td className="co">
                    {r.slug ? (
                      <button onClick={() => openPost(r.slug!)}>{r.company}</button>
                    ) : (
                      r.company
                    )}
                  </td>
                  <td>{r.city}, KY</td>
                  <td>{r.sector}</td>
                  <td className="r amt">{r.amount}</td>
                  <td className="r">
                    <a href={r.outletUrl} target="_blank" rel="noopener noreferrer">
                      {r.outlet} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mx-recfoot">
            <button className="mx-link cy" onClick={() => go("record")}>
              Access the full record here
            </button>
            <button className="mx-link wh" onClick={() => openSlide(<PitchForm />)}>
              Submit a round{"\u00a0"}
            </button>
          </div>
        </div>
      </div>

      {/* 3 · Articles */}
      <div className="band mx-blog" id="articles">
        <div className="wrap">
          <SectionLabel left="Articles" right="Everything we publish" />
          <h2 className="mx-h2">Reported from across the Commonwealth.</h2>

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
            <span className="mx-mono">
              {posts.length} articles · page 1 of {pages}
            </span>
          </div>

          {shown.length ? (
            <div className="mx-grid">
              {shown.map((p) => (
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

          <div className="mx-center">
            <button className="mx-link" onClick={() => go("articles")}>
              All Articles →
            </button>
          </div>
        </div>
      </div>

      {/* 4 · Coverage */}
      <div className="band mx-cov">
        <div className="wrap">
          <SectionLabel left="Coverage" right="Where we are mentioned" />
          <div className="mx-cov-in">
            <a
              className="mx-cov-feat"
              href={FEATURED.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mx-cov-shot">
                <img
                  src={riseCover}
                  alt="Rise of the Rest — Invest Local report cover"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="mx-cov-body">
                <span className="mx-cov-kick">Featured</span>
                <b className="mx-cov-out">{FEATURED.outlet}</b>
                <p className="mx-quote">
                  {FEATURED.quoteStart}
                  <mark>{FEATURED.mark}</mark>
                  {FEATURED.quoteEnd}
                </p>

                <div className="mx-cov-ft">
                  <span className="mx-mono">
                    {FEATURED.source} · {yearOf(FEATURED.date)}
                  </span>
                  <span className="mx-link">Read ↗</span>
                </div>
              </div>
            </a>



            <div className="mx-cov-list">
              {covShown.map((c, i) => (
                <a
                  className="mx-cov-row"
                  key={c.outlet + i}
                  href={c.url || undefined}
                  target={c.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <div>
                    <span className="mx-mono up">{c.outlet}</span>
                    <h3>{c.title}</h3>
                  </div>
                  <span className="mx-mono">{yearOf(c.date)}</span>
                </a>
              ))}
              <div className="mx-cov-nav">
                <span className="mx-mono">
                  {covIdx * per + 1} – {Math.min(mentions.length, covIdx * per + per)} of{" "}
                  {mentions.length} mentions
                </span>
                <div>
                  <button
                    aria-label="Previous mentions"
                    disabled={covIdx === 0}
                    onClick={() => setCovPage(covIdx - 1)}
                  >
                    ←
                  </button>
                  <button
                    aria-label="Next mentions"
                    disabled={covIdx >= covPages - 1}
                    onClick={() => setCovPage(covIdx + 1)}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 · Newsletter */}
      <div className="mx-news">
        <div className="wrap">
          <div className="mx-res">
            <div className="mx-res-body" aria-hidden="true">
              <div className="mx-news-in">
                <div className="mx-news-l">
                  <span className="mx-mono">Newsletter</span>
                  <p>Every round, every story, once a week.</p>
                </div>
                <form className="mx-news-f" onSubmit={(e) => e.preventDefault()}>
                  <input
                    required
                    type="email"
                    aria-label="Email address"
                    placeholder="you@company.com"
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
            <div className="mx-res-over">
              <span className="mx-mono cy">Section reserved</span>
              <p>Newsletter signup to be added</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 · Social */}
      <div className="band">
        <div className="wrap">
          <SectionLabel left="Social" right="Placeholder" />
          <div className="mx-res">
            <div className="mx-res-body" aria-hidden="true">
              <div className="mx-soc">
                {["LinkedIn", "Instagram", "X", "YouTube"].map((s) => (
                  <div className="mx-soc-c" key={s}>
                    <b>{s}</b>
                    <span className="mx-mono">@keyhorsecapital</span>
                    <p>Latest posts from the channel appear here.</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-res-over">
              <span className="mx-mono cy">Section reserved</span>
              <p>Live channel feeds to be added</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 · Calendar */}
      <div className="band mx-cov">
        <div className="wrap">
          <SectionLabel left="Calendar" right="Across Kentucky" />
          <div className="mx-res">
            <div className="mx-res-body" aria-hidden="true">
              <div className="mx-calwrap">
                <MonthShape />
                <div className="mx-up">
                  <span className="mx-mono">Upcoming</span>
                  {EVENTS.slice(0, 5).map((e) => (
                    <div className="mx-up-row" key={e.date + e.title}>
                      <span className="mx-mono">{fmtRound(e.date)}</span>
                      <div>
                        <b>{e.title}</b>
                        <small>{e.venue}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-res-over">
              <span className="mx-mono cy">Section reserved</span>
              <p>Live ecosystem calendar to be added</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8 · Closing panels */}
      <div className="mx-panels">
        <div className="mx-panel slate">
          <img className="mx-panel-bg" src={LOGISTICS} alt="" aria-hidden="true" />
          <div className="mx-panel-in">
            <span className="mx-kick">For founders</span>
            <h2>Building something exceptional in Kentucky?</h2>
            <p>
              We invest across stages in companies building in the Commonwealth — from
              first cheque to follow-on, alongside the programmes that get you there.
            </p>
            <button className="mx-link cy" onClick={() => go("apply")}>
              See the criteria →
            </button>
          </div>
        </div>
        <div className="mx-panel coal">
          <img className="mx-panel-bg" src={PASTURE} alt="" aria-hidden="true" />
          <div className="mx-panel-in">
            <span className="mx-kick">For everyone else</span>
            <h2>Know a story we should be telling?</h2>
            <p>
              A round we missed, a founder worth meeting, or something being built quietly
              somewhere in the state. Send it over.
            </p>
            <button className="mx-link cy" onClick={() => openSlide(<PitchForm />)}>
              Pitch a story →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
