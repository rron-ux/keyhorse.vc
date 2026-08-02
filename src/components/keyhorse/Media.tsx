import { useEffect, useMemo, useRef, useState } from "react";
import { FEED } from "@/data/keyhorse";
import { ARTICLES, initialsOf, type Article, type Category } from "@/data/articles";
import { CYCLE, KH, LINKEDIN_POSTS, MEDIA_CAL, MEDIA_FIGURES } from "@/data/media";
import { Chips, Head, PageHead, Rv, colorFor, useSite } from "./shared";
import { CompanySlide } from "./cards";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: (el?: HTMLElement | null) => void } };
  }
}

export const CAT_COLOR: Record<Category, string> = {
  stories: "#00A8E1",
  perspectives: "#00A8E1",
  announcements: "#7B4FD0",
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

function XTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const SRC = "https://platform.twitter.com/widgets.js";
    const done = () => window.twttr?.widgets?.load?.(ref.current);
    let s = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    s.addEventListener("load", done);
    s.addEventListener("error", () => setFailed(true));
    done();
    const t = window.setTimeout(() => {
      if (!ref.current?.querySelector("iframe")) setFailed(true);
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  if (failed) return null;
  return (
    <div className="mdx-x" ref={ref}>
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-height="500"
        data-chrome="noheader nofooter transparent"
        href="https://twitter.com/keyhorsevc"
      >
        Posts by @keyhorsevc
      </a>
    </div>
  );
}

function PostCard({ a, onOpen }: { a: Article; onOpen: () => void }) {
  const c = CAT_COLOR[a.category];
  const announcement = a.category === "announcements";
  return (
    <button className="pcard" onClick={onOpen} style={{ ["--sc" as string]: c }}>
      <div className={`pcard-img${announcement ? " pcard-img--q" : ""}`}>
        {announcement ? (
          <span className="pcard-q">{a.quarter}</span>
        ) : a.cover ? (
          <img loading="lazy" src={a.cover} alt={a.person || a.title} />
        ) : (
          <span className="pcard-mono">{initialsOf(a.person || a.company || a.title)}</span>
        )}
      </div>
      <div className="pcard-bd">
        <span className="pcard-tag">{TAG_LABEL[a.series]}</span>
        {announcement ? (
          <div className="pcard-name">Keyhorse Capital</div>
        ) : (
          <>
            <div className="pcard-name">{a.person}</div>
            <div className="pcard-co">{a.company}</div>
          </>
        )}
        <h3>{a.title}</h3>
        <div className="pcard-dt">{a.date}</div>
      </div>
    </button>
  );
}

function PitchForm({ kind }: { kind: "pitch" | "nominate" }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="pitch-form">
      <p className="lbl" style={{ color: "var(--cyan-tx)" }}>
        {kind === "pitch" ? "Pitch a story" : "Nominate a founder"}
      </p>
      <h3 style={{ fontSize: 26, marginBottom: 14 }}>
        {kind === "pitch" ? "Tell us what you are building." : "Who should we be writing about?"}
      </h3>
      {sent ? (
        <p className="lede">Thank you — we read every one and will be in touch.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="pf">
            <span>Name</span>
            <input required maxLength={100} placeholder="Your name" />
          </label>
          <label className="pf">
            <span>Company</span>
            <input required maxLength={100} placeholder="Company name" />
          </label>
          <label className="pf">
            <span>Email</span>
            <input required type="email" maxLength={255} placeholder="you@company.com" />
          </label>
          <label className="pf">
            <span>The short version</span>
            <textarea required maxLength={800} rows={4} placeholder="A few lines on the story." />
          </label>
          <button className="btn" type="submit" style={{ marginTop: 6 }}>
            Send it
          </button>
        </form>
      )}
    </div>
  );
}

export default function Media() {
  const [t, setT] = useState<(typeof FILTERS)[number][0]>("all");
  const { go, openSlide, openPost } = useSite();

  const posts = useMemo(
    () => (t === "all" ? ARTICLES : ARTICLES.filter((p) => p.category === t)),
    [t],
  );

  return (
    <section className="page on mdx">
      <PageHead
        seed="kh-media"
        title="Media"
        lede="Founder interviews, operator conversations and quarterly investment cycle announcements — everything we publish about Kentucky venture, in one place."
      />

      <div className="band">
        <Rv>
          <div className="feat mdx-feat" id="cycle" style={{ marginBottom: 40 }}>
            <div className="imgbox">
              <img
                src={
                  ARTICLES.find((a) => a.series === "cycle")?.cover ?? ""
                }
                alt="Q3 2026 investment cycle"
                style={{ objectFit: "contain", background: "#262B31" }}
              />
            </div>
            <div className="bd">
              <div className="k">{CYCLE.kicker}</div>
              <div className="mdx-status">{CYCLE.status}</div>
              <h3>{CYCLE.headline}</h3>
              <div className="mt">{CYCLE.standfirst}</div>
              <div className="mdx-btns">
                <button className="btn" onClick={() => go("apply")}>
                  Apply
                </button>
                <button
                  className="btn g"
                  onClick={() =>
                    openPost(
                      "keyhorse-capital-launches-2026-q3-investment-cycle-for-eligible-kentucky-companies",
                    )
                  }
                >
                  Read the announcement
                </button>
              </div>
            </div>
          </div>

          <div className="mdx-figs">
            {MEDIA_FIGURES.map(([n, l]) => (
              <div className="mdx-fig" key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div className="mdx-chead">
            <Chips items={FILTERS} value={t} onChange={setT} />
            <span className="mdx-count">{posts.length} posts</span>
          </div>

          {t === "perspectives" ? (
            <div className="persp">
              <p>
                Perspectives is where our market analysis will live — what we are
                seeing across the portfolio, what is forming in the state, and where
                the capital is going. First pieces coming soon.
              </p>
              <div className="persp-sub">
                <input placeholder="you@company.com" aria-label="Email address" />
                <button className="btn">Notify me</button>
              </div>
            </div>
          ) : (
            <div className="pgrid">
              {posts.map((p) => (
                <PostCard key={p.slug} a={p} onOpen={() => openPost(p.slug)} />
              ))}
            </div>
          )}

          <div className="recsec" id="record">
            <div className="rechead">
              <h2>Every round in Kentucky</h2>
              <span className="livemark">
                <i className="dot" />
                Live · Updated weekly
              </span>
            </div>
            <div className="feed">
              {FEED.map(([dt, co, sec, city, amt, stage, ours], i) => (
                <div
                  className="fr"
                  key={i}
                  style={{ ["--fc" as string]: colorFor(String(co)) }}
                  onClick={() => openSlide(<CompanySlide i={i} />)}
                >
                  <div className="dt">{dt}</div>
                  <div className="co">
                    {co}
                    <small>{city}, Kentucky</small>
                  </div>
                  <div className="sec">{sec}</div>
                  <div className="amt">{amt}</div>
                  <div className="tag">
                    <span className={`tagpill${ours ? "" : " off"}`}>
                      {ours ? "Keyhorse participated" : stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="feednote">
              Every disclosed round in the Commonwealth, whether or not we
              participated.
            </p>
          </div>
        </Rv>
      </div>

      <div className="band band--cyan pitch">
        <span className="pitch-orb" aria-hidden="true" />
        <Rv>
          <div className="pitch-in">
            <p className="lbl pitch-lbl">Pitch us a story</p>
            <h2 className="pitch-h">Building something worth writing about?</h2>
            <p className="pitch-p">
              We publish founder stories from across the Commonwealth — portfolio or
              not. If you are building here and have a story worth telling, we would
              like to hear it.
            </p>
            <div className="mdx-btns">
              <button className="btn pitch-b1" onClick={() => openSlide(<PitchForm kind="pitch" />)}>
                Pitch a story
              </button>
              <button
                className="btn pitch-b2"
                onClick={() => openSlide(<PitchForm kind="nominate" />)}
              >
                Nominate a founder
              </button>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--cy4">
        <Rv>
          <Head label="Channels" title="Where else we publish." />
          <div className="mgrid mdx-mgrid">
            <a
              className="msoc mdx-soc mdx-soc--wide"
              href="https://www.linkedin.com/company/keyhorse"
              target="_blank"
              rel="noreferrer"
            >
              <div className="h">
                <div className="p">LinkedIn</div>
                <div className="c">Primary channel ↗</div>
              </div>
              <div className="t">
                Where our founders and co-investors are. Company news, portfolio
                milestones and the team.
              </div>
              <ul className="mdx-li">
                {LINKEDIN_POSTS.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </a>

            <div className="msoc mdx-soc mdx-soc--x">
              <div className="h">
                <div className="p">X</div>
                <a
                  className="c"
                  href="https://twitter.com/keyhorsevc"
                  target="_blank"
                  rel="noreferrer"
                >
                  @keyhorsevc ↗
                </a>
              </div>
              <div className="t">
                Rounds as they close, and what we are seeing.
              </div>
              <XTimeline />
            </div>

            <a
              className="msoc mdx-soc"
              href={`${KH}/blog`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="h">
                <div className="p">Blog</div>
                <div className="c">keyhorse.vc/blog ↗</div>
              </div>
              <div className="t">
                Founding Stories, Behind the Scenes and investment cycle
                announcements.
              </div>
            </a>

            <div className="msoc mdx-soc mdx-soc--soon">
              <div className="h">
                <div className="p">YouTube</div>
                <div className="c">Coming soon</div>
              </div>
              <div className="t">
                Video interviews and session recordings. No channel yet — we will
                link it here when it launches.
              </div>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv>
          <Head
            label="Ecosystem calendar"
            title="What is happening across Kentucky."
            lede="Ours and everyone else’s. If you are running something and it is not here, send it to us."
          >
            <button className="btn g">Submit an event</button>
          </Head>
          <div className="cal">
            {MEDIA_CAL.map(([d, m, nm, ty, wh, own, url], i) => {
              const inner = (
                <>
                  <div className="dt">
                    <b>{d}</b>
                    {m}
                  </div>
                  <div className="nm">
                    {nm}
                    <small>{ty}</small>
                  </div>
                  <div className="wh">{wh}</div>
                  <div className="by">
                    <span className={`evtag ${own}`}>
                      {own ? "Keyhorse" : "Ecosystem"}
                    </span>
                  </div>
                </>
              );
              return url ? (
                <a className="ev mdx-ev" key={i} href={url} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div className="ev" key={i}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">Impact</p>
              <h2 className="w" style={{ marginBottom: 16 }}>
                Where the capital has gone.
              </h2>
              <p className="lede">
                Portfolio performance, jobs created and capital deployed across the
                Commonwealth.
              </p>
              <div
                style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}
              >
                <a
                  className="btn"
                  style={{ background: "#fff", color: "#222" }}
                  href={`${KH}/impact`}
                  target="_blank"
                  rel="noreferrer"
                >
                  See the impact ↗
                </a>
              </div>
            </div>
            <div>
              <p className="lbl">Receive updates</p>
              <h3 className="w" style={{ fontSize: 24, marginBottom: 12 }}>
                One email a month.
              </h3>
              <p className="lede">
                Founding Stories, Behind the Scenes and each investment cycle as it
                opens. Same list as the signup on keyhorse.vc — no second inbox.
              </p>
              <div
                style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}
              >
                <input
                  placeholder="you@company.com"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    minWidth: 200,
                    padding: "13px 15px",
                    border: "1px solid #3A3A3C",
                    background: "#2F343A",
                    color: "#F5F5F4",
                    fontFamily: "var(--b)",
                    fontSize: 14,
                  }}
                />
                <button
                  className="btn"
                  style={{ background: "var(--cyan)", color: "#222222" }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}
