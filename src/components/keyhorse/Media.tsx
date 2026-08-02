import { useMemo, useRef, useState } from "react";
import { ARTICLES, initialsOf, type Article, type Category } from "@/data/articles";
import {
  COVERAGE,
  CYCLE,
  EVENTS,
  ROUNDS,
  SOCIAL,
  SOCIAL_ROWS,
  type CalEvent,
} from "@/data/media";
import { colorFor, useSite } from "./shared";

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

const FILTERS = [
  ["all", "All"],
  ["stories", "Stories"],
  ["perspectives", "Perspectives"],
  ["announcements", "Announcements"],
] as const;

type FilterId = (typeof FILTERS)[number][0];

const PER_PAGE = 6;
const ts = (d: string) => Date.parse(d) || 0;
const SORTED = [...ARTICLES].sort((a, b) => ts(b.date) - ts(a.date));

/* ─────────────────────────── forms ─────────────────────────── */

function PitchForm({ kind }: { kind: "pitch" | "round" }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="md-form">
      <p className="md-eyebrow">{kind === "pitch" ? "Pitch a story" : "Submit a round"}</p>
      <h3 className="md-form-h">
        {kind === "pitch"
          ? "Tell us what you are building."
          : "Which round did we miss?"}
      </h3>
      {sent ? (
        <p className="md-p">Thank you — we read every one and will be in touch.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="md-f">
            <span>Name</span>
            <input required maxLength={100} placeholder="Your name" />
          </label>
          <label className="md-f">
            <span>Company</span>
            <input required maxLength={100} placeholder="Company name" />
          </label>
          <label className="md-f">
            <span>Email</span>
            <input required type="email" maxLength={255} placeholder="you@company.com" />
          </label>
          <label className="md-f">
            <span>{kind === "pitch" ? "The short version" : "Round details"}</span>
            <textarea required maxLength={800} rows={4} placeholder="A few lines." />
          </label>
          <button className="btn" type="submit" style={{ marginTop: 6 }}>
            Send it
          </button>
        </form>
      )}
    </div>
  );
}

function SubscribeForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="md-form">
      <p className="md-eyebrow">Newsletter</p>
      <h3 className="md-form-h">One email a month.</h3>
      <p className="md-p">
        Founding Stories, Behind the Scenes and each investment cycle as it opens.
      </p>
      {sent ? (
        <p className="md-p" style={{ marginTop: 14 }}>
          You are on the list.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="md-f">
            <span>Email</span>
            <input required type="email" maxLength={255} placeholder="you@company.com" />
          </label>
          <button className="btn" type="submit">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

/* ─────────────────────────── cards ─────────────────────────── */

function ArticleCard({ a, onOpen }: { a: Article; onOpen: () => void }) {
  const c = CAT_COLOR[a.category];
  const announcement = a.category === "announcements";
  return (
    <button className="md-card" onClick={onOpen} style={{ ["--sc" as string]: c }}>
      <div className={`md-card-img${announcement ? " md-card-img--q" : ""}`}>
        {announcement ? (
          <span className="md-card-q">{a.quarter}</span>
        ) : a.cover ? (
          <img loading="lazy" src={a.cover} alt={a.person || a.title} />
        ) : (
          <span className="md-card-mono">
            {initialsOf(a.person || a.company || a.title)}
          </span>
        )}
        <i className="md-card-rule" />
      </div>
      <div className="md-card-bd">
        <span className="md-card-tag">{TAG_LABEL[a.series]}</span>
        <h3>{a.title}</h3>
        <div className="md-card-who">
          {announcement ? "Keyhorse Capital" : a.person}
          {a.company && !announcement ? <small>{a.company}</small> : null}
        </div>
        <div className="md-card-ft">
          <span>{a.date}</span>
          <span className="md-card-go">Read →</span>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────── calendar ─────────────────────────── */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthKey(y: number, m: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}

function Calendar() {
  const [cursor, setCursor] = useState({ y: 2026, m: 7 });
  const key = monthKey(cursor.y, cursor.m);

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(cursor.y, cursor.m, 1));
    const lead = (first.getUTCDay() + 6) % 7;
    const days = new Date(Date.UTC(cursor.y, cursor.m + 1, 0)).getUTCDate();
    const out: { day: number | null; evs: CalEvent[] }[] = [];
    for (let i = 0; i < lead; i++) out.push({ day: null, evs: [] });
    for (let d = 1; d <= days; d++) {
      const iso = `${key}-${String(d).padStart(2, "0")}`;
      out.push({ day: d, evs: EVENTS.filter((e) => e.date === iso) });
    }
    while (out.length % 7) out.push({ day: null, evs: [] });
    return out;
  }, [cursor, key]);

  const upcoming = EVENTS.slice(0, 5);
  const shift = (n: number) =>
    setCursor((c) => {
      const m = c.m + n;
      return { y: c.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });

  return (
    <div className="md-cal-wrap">
      <div className="md-cal">
        <div className="md-cal-bar">
          <strong>
            {MONTHS[cursor.m]} {cursor.y}
          </strong>
          <div className="md-cal-nav">
            <button onClick={() => shift(-1)} aria-label="Previous month">
              ←
            </button>
            <button onClick={() => shift(1)} aria-label="Next month">
              →
            </button>
          </div>
        </div>
        <div className="md-cal-grid">
          {DOW.map((d) => (
            <div className="md-cal-dow" key={d}>
              {d}
            </div>
          ))}
          {cells.map((c, i) => (
            <div className={`md-cal-cell${c.day ? "" : " off"}`} key={i}>
              {c.day ? <span className="md-cal-num">{c.day}</span> : null}
              {c.evs.map((e) => (
                <span
                  className={`md-chip${e.own ? " own" : ""}`}
                  key={e.title}
                  title={`${e.title} · ${e.venue}`}
                >
                  {e.title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <aside className="md-up">
        <p className="md-eyebrow">Upcoming</p>
        {upcoming.map((e) => {
          const d = new Date(`${e.date}T00:00:00Z`);
          return (
            <div className="md-up-row" key={e.date + e.title}>
              <div className="md-up-dt">
                <b>{d.getUTCDate()}</b>
                <span>{MONTHS[d.getUTCMonth()]?.slice(0, 3)}</span>
              </div>
              <div>
                <div className="md-up-t">{e.title}</div>
                <div className="md-up-v">{e.venue}</div>
              </div>
              <span className={`md-up-tag${e.own ? " own" : ""}`}>{e.type}</span>
            </div>
          );
        })}
      </aside>
    </div>
  );
}

/* ─────────────────────────── page ─────────────────────────── */

export default function Media() {
  const [t, setT] = useState<FilterId>("all");
  const [page, setPage] = useState(1);
  const { go, openSlide, openPost } = useSite();
  const barRef = useRef<HTMLDivElement>(null);

  const posts = useMemo(
    () => (t === "all" ? SORTED : SORTED.filter((p) => p.category === t)),
    [t],
  );
  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = posts.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const setPageScroll = (n: number) => {
    setPage(n);
    barRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const rounds = ROUNDS.slice(0, 5);

  return (
    <section className="page on md">
      {/* 1 · Hero */}
      <div className="md-hero">
        <span className="md-hero-orb" aria-hidden="true" />
        <div className="wrap md-hero-in">
          <div className="md-hero-top">
            <div>
              <p className="md-eyebrow md-eyebrow--dark">Media</p>
              <h1 className="md-hero-h">Stories from the people building in Kentucky.</h1>
              <p className="md-hero-p">
                Founder interviews, operator conversations, every round we track and
                every investment cycle we open.
              </p>
            </div>
            <button className="btn md-btn-ow" onClick={() => openSlide(<SubscribeForm />)}>
              Subscribe
            </button>
          </div>

          <div className="md-feat" id="cycle">
            <div className="md-feat-img">
              <img
                src={ARTICLES.find((a) => a.slug === CYCLE.slug)?.cover ?? ""}
                alt="Q3 2026 investment cycle"
              />
            </div>
            <div className="md-feat-bd">
              <span className="md-status">
                <i className="md-pulse" aria-hidden="true" />
                {CYCLE.status}
              </span>
              <h2 className="md-feat-h">{CYCLE.headline}</h2>
              <p className="md-p">{CYCLE.standfirst}</p>
              <div className="md-btns">
                <button className="btn cy" onClick={() => go("apply")}>
                  Apply
                </button>
                <button className="btn g" onClick={() => openPost(CYCLE.slug)}>
                  Read the announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 · Articles */}
      <div className="band md-articles">
        <div className="md-bar" ref={barRef}>
          <div className="wrap md-bar-in">
            <div className="md-pills">
              {FILTERS.map(([v, l]) => (
                <button
                  key={v}
                  className="md-pill"
                  aria-pressed={t === v}
                  onClick={() => {
                    setT(v);
                    setPage(1);
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <span className="md-count">
              {t === "perspectives"
                ? "0 articles"
                : `${posts.length} articles · page ${current} of ${pages}`}
            </span>
          </div>
        </div>

        <div className="wrap">
          {t === "perspectives" ? (
            <div className="md-empty">
              <p>
                Perspectives is where our market analysis will live — what we are seeing
                across the portfolio, what is forming in the state, and where the capital
                is going. First pieces coming soon.
              </p>
              <form
                className="md-empty-sub"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                />
                <button className="btn" type="submit">
                  Notify me
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="md-grid">
                {shown.map((p) => (
                  <ArticleCard key={p.slug} a={p} onOpen={() => openPost(p.slug)} />
                ))}
              </div>
              <div className="md-pager">
                <button
                  className="md-pg"
                  disabled={current === 1}
                  onClick={() => setPageScroll(current - 1)}
                >
                  ← Previous
                </button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className="md-pg num"
                    aria-current={n === current ? "true" : "false"}
                    onClick={() => setPageScroll(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  className="md-pg"
                  disabled={current === pages}
                  onClick={() => setPageScroll(current + 1)}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3 · The Record */}
      <div className="band md-slate" id="record">
        <div className="wrap">
          <div className="md-head">
            <div>
              <p className="md-eyebrow md-eyebrow--dark">The record</p>
              <h2 className="md-h2 w">Every round raised in Kentucky.</h2>
              <p className="md-p md-p--dark">
                A running list of what is being funded across the Commonwealth.
              </p>
            </div>
            <span className="md-live">
              <i className="md-pulse" aria-hidden="true" />
              LIVE · UPDATED WEEKLY
            </span>
          </div>

          <div className="md-rows">
            {rounds.map((r) => (
              <div
                className="md-row"
                key={r.company + r.date}
                style={{ ["--fc" as string]: colorFor(r.company) }}
              >
                <div className="md-row-dt">
                  {new Date(`${r.date}T00:00:00Z`).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </div>
                <div className="md-row-co">
                  {r.slug ? (
                    <button onClick={() => openPost(r.slug!)}>{r.company}</button>
                  ) : (
                    r.company
                  )}
                  <small>{r.city}, Kentucky</small>
                </div>
                <div className="md-row-sec">{r.sector}</div>
                <div className="md-row-amt">{r.amount}</div>
                <div className="md-row-out">
                  <a href={r.outletUrl} target="_blank" rel="noopener noreferrer">
                    {r.outlet} ↗
                  </a>
                </div>
                <div className="md-row-ar">→</div>
              </div>
            ))}
          </div>

          <div className="md-btns">
            <button className="btn cy" onClick={() => go("record")}>
              View all rounds
            </button>
          </div>
        </div>
      </div>

      {/* 4 · Social */}
      <div className="band md-paper">
        <div className="wrap">
          <p className="md-eyebrow">Social</p>
          <h2 className="md-h2">Where else we publish.</h2>
          <div className="md-soc">
            {SOCIAL.map((s) => (
              <div className="md-panel" key={s.id}>
                <div className="md-panel-h">
                  <span className={`md-mark ${s.id}`} aria-hidden="true">
                    {s.id === "instagram" ? "◎" : "in"}
                  </span>
                  <div>
                    <b>{s.name}</b>
                    <span>{s.handle}</span>
                  </div>
                  <span className="md-followers">{s.followers}</span>
                </div>
                <div className="md-tiles">
                  {s.tiles.map((tl) => (
                    <a
                      className="md-tile"
                      key={tl}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ["--fc" as string]: colorFor(tl) }}
                    >
                      <span>{tl}</span>
                    </a>
                  ))}
                </div>
                <div className="md-panel-f">
                  <p>{s.blurb}</p>
                  <a
                    className="btn g"
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="md-socrows">
            {SOCIAL_ROWS.map((r) =>
              r.url ? (
                <a
                  className="md-socrow"
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>{r.name}</b>
                  <span>{r.handle}</span>
                  <em className="md-mono">{r.meta}</em>
                  <i>↗</i>
                </a>
              ) : (
                <div className="md-socrow off" key={r.name}>
                  <b>{r.name}</b>
                  <span>{r.handle}</span>
                  <em className="md-mono">{r.meta}</em>
                  <i />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* 5 · Calendar */}
      <div className="band">
        <div className="wrap">
          <div className="md-head">
            <div>
              <p className="md-eyebrow">Calendar</p>
              <h2 className="md-h2">What is happening across Kentucky.</h2>
              <p className="md-p">
                Ours and everyone else’s. If you are running something and it is not
                here, send it to us.
              </p>
            </div>
            <button
              className="btn g"
              onClick={() => openSlide(<PitchForm kind="round" />)}
            >
              Submit an event
            </button>
          </div>
          <Calendar />
        </div>
      </div>

      {/* 6 · Coverage */}
      <div className="band md-paper">
        <div className="wrap">
          <p className="md-eyebrow">Coverage</p>
          <h2 className="md-h2">Where we are written about.</h2>
          <div className="md-cov">
            {COVERAGE.map((c, i) =>
              c.url ? (
                <a
                  className="md-cov-c"
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="md-cov-o">{c.outlet}</span>
                  <h3>{c.title}</h3>
                  <div className="md-cov-f">
                    <span className="md-mono">{c.date}</span>
                    <i>↗</i>
                  </div>
                </a>
              ) : (
                <div className="md-cov-c off" key={i}>
                  <span className="md-cov-o">{c.outlet}</span>
                  <h3>{c.title}</h3>
                  <div className="md-cov-f">
                    <span className="md-mono">{c.date}</span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* 7 · Dual CTA */}
      <div className="md-dual">
        <div className="md-dual-l">
          <p className="md-eyebrow md-eyebrow--dark">Apply</p>
          <h2 className="md-dual-h">Building something exceptional in Kentucky?</h2>
          <p className="md-p md-p--dark">
            Applications are read by the investment team, not a form. Every founder
            hears back either way.
          </p>
          <div className="md-btns">
            <button className="btn md-btn-w" onClick={() => go("apply")}>
              Apply for investment
            </button>
            <button className="btn md-btn-ow" onClick={() => go("apply")}>
              See the criteria
            </button>
          </div>
        </div>
        <div className="md-dual-r">
          <p className="md-eyebrow md-eyebrow--dark">Contribute</p>
          <h2 className="md-dual-h">Got a story worth telling?</h2>
          <p className="md-p md-p--dark">
            We publish founder stories from across the Commonwealth. Pitch us, nominate
            someone, or send a round we have missed.
          </p>
          <div className="md-btns">
            <button className="btn cy" onClick={() => openSlide(<PitchForm kind="pitch" />)}>
              Pitch a story
            </button>
            <button
              className="btn md-btn-ow"
              onClick={() => openSlide(<PitchForm kind="round" />)}
            >
              Submit a round
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
