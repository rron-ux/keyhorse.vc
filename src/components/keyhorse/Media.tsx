import { useEffect, useRef, useState } from "react";
import { FEED } from "@/data/keyhorse";
import { ARTICLES } from "@/data/articles";
import {
  CYCLE,
  KH,
  LINKEDIN_POSTS,
  MEDIA_CAL,
  MEDIA_FIGURES,
  MEDIA_FILTERS,
  SERIES,
} from "@/data/media";
import { Chips, Head, PageHead, Rv, colorFor, useSite } from "./shared";
import { CompanySlide } from "./cards";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: (el?: HTMLElement | null) => void } };
  }
}

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

const CYCLE_COVER =
  ARTICLES.find((a) => a.series === "cycle")?.cover ?? "";

export default function Media() {
  const [t, setT] = useState<(typeof MEDIA_FILTERS)[number][0]>("all");
  const { go, openSlide, openPost } = useSite();

  const posts = ARTICLES.filter((p) => t === "all" || p.series === t);

  return (
    <section className="page on mdx">
      <PageHead
        seed="kh-media"
        title="Media"
        lede="Founder interviews, operator conversations and quarterly investment cycle announcements — everything we publish about Kentucky venture, in one place."
      />

      <div className="band">
        <Rv>
          <div className="feat mdx-feat" style={{ marginBottom: 40 }}>
            <div className="imgbox">
              <img src={CYCLE_COVER} alt="Q3 2026 investment cycle" />
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
            <Chips items={MEDIA_FILTERS} value={t} onChange={setT} />
            <a className="btn g" href={`${KH}/blog`} target="_blank" rel="noreferrer">
              View all posts ↗
            </a>
          </div>

          <div className="cards mdx-cards">
            {posts.map((p) => (
              <button
                className="card mdx-card"
                key={p.slug}
                onClick={() => openPost(p.slug)}
                style={{ ["--sc" as string]: SERIES[p.series].color }}
              >
                <div className="imgbox">
                  <img loading="lazy" src={p.cover} alt={p.title} />
                </div>
                <div className="k" style={{ color: SERIES[p.series].color }}>
                  {SERIES[p.series].label}
                </div>
                <h3>{p.title}</h3>
                <div className="dt">{p.date}</div>
              </button>
            ))}
          </div>

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

      <div className="band band--tint">
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
                  style={{
                    flex: 1,
                    minWidth: 200,
                    padding: "13px 15px",
                    border: "1px solid #3A3A3C",
                    background: "#2A2A2A",
                    color: "#F5F5F4",
                    fontFamily: "var(--b)",
                    fontSize: 14,
                  }}
                />
                <button
                  className="btn"
                  style={{ background: "var(--cyan)", color: "var(--coal)" }}
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
