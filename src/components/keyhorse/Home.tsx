import { useEffect, useState } from "react";
import {
  AUD,
  CYC,
  FEED,
  MEDIA3,
  PILLARS,
} from "@/data/keyhorse";
import { WALL } from "@/data/wall";

import keyhorseLogomark from "@/assets/keyhorse-logomark-color.png.asset.json";
import { HERO_FRAMES, pic } from "@/lib/images";
import { Rv, colorFor, useSite } from "./shared";


const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="clock">Updated {t}</span>;
}

function Hero() {
  const { go } = useSite();
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => setCi((c) => (c + 1) % CYC.length), 3000);
    return () => clearInterval(id);
  }, []);

  const frame = ci % HERO_FRAMES.length;

  return (
    <div className="hero">
      <div className="frames">
        {HERO_FRAMES.map((f, i) => (
          <img
            key={f.src}
            className={i === frame ? "on" : ""}
            src={f.src}
            alt={f.alt}
            loading={i === 0 ? "eager" : "lazy"}
            {...(i === 0 ? { fetchPriority: "high" as const } : {})}
          />
        ))}
      </div>
      <div className="tint" />
      <div className="scrim" />
      <div className="slot">Reference imagery — replace with commissioned film</div>

      <div className="wrap inner">
        <h1>
          Building Kentucky into the next hub for
          <span className="cyc">
            <span key={ci}>{CYC[ci]}</span>
          </span>
        </h1>
        <p className="sub">
          We back tech-enabled founders across the Commonwealth — and concentrate
          where the state already wins.
        </p>
        <div className="hdash" aria-hidden="true">
          {CYC.map((c, i) => (
            <i key={c} className={i === ci ? "on" : ""} />
          ))}
        </div>
      </div>
      <div className="foot">
        <div className="wrap">
          <span className="live">
            <i className="dot" />
            The record of Kentucky venture
          </span>
          <Clock />
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const { go } = useSite();
  const items = [...FEED, ...FEED];
  return (
    <div
      className="ticker ticker--dark"
      role="link"
      tabIndex={0}
      onClick={() => go("record")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") go("record");
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="track">
        {items.map(([, co, sec, , amt], i) => (
          <div className="it" key={i}>
            <i className="d" style={{ background: colorFor(String(co)) }} />
            <b>{co}</b>
            <span className="a">{amt}</span>
            <span>{sec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ROUTER = [
  {
    tab: "I want to build here",
    body: [
      { t: "Infrastructure, customers and a workforce that a competitor cannot replicate by opening an office somewhere else.", b: true },
      { t: " If you are building in one of these, there is a concrete argument for being here.", b: false },
    ],
    links: [
      ["The industries", "industries"],
      ["Apply", "apply"],
    ],
  },
  {
    tab: "I am looking for work",
    body: [
      { t: "More than 200 active companies are hiring across the Commonwealth,", b: true },
      { t: " from first engineers to plant managers. We publish the roles and the founders behind them.", b: false },
    ],
    links: [["See who is hiring", "companies"]],
  },
  {
    tab: "I want to follow along",
    body: [
      { t: "Coverage of deals, founders and market movement across Kentucky,", b: true },
      { t: " plus the events calendar and the weekly newsletter. Free to read, no application.", b: false },
    ],
    links: [
      ["Read the coverage", "media"],
      ["Get the newsletter", "media"],
    ],
  },
  {
    tab: "I want to invest",
    body: [
      { t: "Public dollars invested like private ones, with room beside us on most deals.", b: true },
      { t: " Tell us what you are looking for.", b: false },
    ],
    links: [
      ["How capital works", "partners"],
      ["Talk to us", "partners"],
    ],
  },
] as const;

function Mission() {
  const { go } = useSite();
  const [ti, setTi] = useState(0);
  const active = ROUTER[ti]!;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (ti + (e.key === "ArrowRight" ? 1 : ROUTER.length - 1)) % ROUTER.length;
    setTi(next);
    const el = document.getElementById(`msn-tab-${next}`);
    el?.focus();
  };

  return (
    <div className="mband msn2">
      <img
        className="mband-bg"
        loading="lazy"
        src={pic("kh-kentucky").src}
        alt={pic("kh-kentucky").alt}
      />

      <div className="msn2-in">
        <div className="msn2-rule">
          <span>Mission</span>
          <i />
          <span>Keyhorse Capital</span>
        </div>

        <p className="msn2-stmt">
          <mark>Kentucky is a place for builders.</mark> We report what is being built here so
          future builders can see it, and we <mark>put capital behind those who do it at scale.</mark>
        </p>

        <p className="msn2-stand">
          We back tech-enabled founders across the Commonwealth — and concentrate where the state
          already wins.
        </p>

        <div className="msn2-router">
          <div className="msn2-q">What brings you here?</div>
          <div className="msn2-tabs" role="tablist" aria-label="What brings you here?" onKeyDown={onKey}>
            {ROUTER.map((r, i) => (
              <button
                key={r.tab}
                id={`msn-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === ti}
                aria-controls="msn-panel"
                tabIndex={i === ti ? 0 : -1}
                className={i === ti ? "on" : ""}
                onClick={() => setTi(i)}
              >
                {r.tab}
              </button>
            ))}
          </div>

          <div className="msn2-panel" id="msn-panel" role="tabpanel" aria-labelledby={`msn-tab-${ti}`}>
            <p className="msn2-ans">
              {active.body.map((s, i) =>
                s.b ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>
              )}
            </p>
            <div className="msn2-links">
              {active.links.map(([l, p]) => (
                <button key={l} type="button" onClick={() => go(p as never)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  const { go } = useSite();
  return (
    <div className="band">
      <Rv>
        <div className="head">
          <div>
            <p className="lbl">Where Kentucky wins</p>
            <h2>Priority Sectors</h2>
          </div>
          <button className="btn g" onClick={() => go("industries")}>
            All five sectors
          </button>
        </div>
        <div className="pacc">
          {PILLARS.map((p) => (
            <div
              className="pane"
              key={p.n}
              style={{ ["--pc" as string]: p.c }}
              onClick={() => go("industries")}
            >
              <img loading="lazy" src={pic(p.seed).src} alt={pic(p.seed).alt} />
              <span className="wash" />
              <span className="rule" />
              <div className="pbd">
                <div className="n">{p.n}</div>
                <div className="nm">{p.nm}</div>
                <div className="rev">
                  <p className="d">{p.d}</p>
                  <div className="co">{p.co}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Rv>
    </div>
  );
}

function FounderFeature() {
  const { go } = useSite();
  return (
    <div className="ffeat">
      <div className="fimg">
        <img loading="lazy" src={pic("kh-feature").src} alt={pic("kh-feature").alt} />
      </div>
      <div className="fpanel">
        <div className="glow" />
        <div className="fbd">
          <div className="k">Founder feature · Video</div>
          <h3>
            They moved the company from Silicon Valley to a factory two miles from a Class Bravo international airport.
          </h3>
          <p className="mt">
            A reported profile of a company building in one of our industries — how
            they got here, what they found, what it cost.
          </p>
          <div className="by">Reported by Keyhorse · [Month] 2026</div>
          <button className="btn cy" onClick={() => go("media")}>
            Watch the feature
          </button>
        </div>
      </div>
    </div>
  );
}

function People() {
  const { go } = useSite();
  const stories = WALL;

  const half = Math.ceil(stories.length / 2);
  const rowA = [...stories.slice(0, half), ...stories.slice(0, half)];
  const rowB = [...stories.slice(half)].reverse();
  const rowBx = [...rowB, ...rowB];
  const card = (a: (typeof stories)[number], key: string) => (
    <figure
      className="pp"
      key={key}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
      onClick={() => go("companies", `?company=${encodeURIComponent(a.company)}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go("companies", `?company=${encodeURIComponent(a.company)}`);
        }
      }}
    >
      <img loading="lazy" src={a.cover} alt={`${a.person}, founder of ${a.company}`} />
      <figcaption>{a.company || a.person}</figcaption>
    </figure>
  );
  return (
    <div className="people">
      <div className="wrap">
        <p className="lbl">PORTFOLIO</p>
        <h2 className="w">The people building it.</h2>
      </div>
      <div className="mq">
        <div className="mqtrack">{rowA.map((a, i) => card(a, `a${i}`))}</div>
      </div>
      <div className="mq">
        <div className="mqtrack rev">{rowBx.map((a, i) => card(a, `b${i}`))}</div>
      </div>
    </div>
  );
}


function MediaSection() {
  const { go } = useSite();
  return (
    <div className="medsec">
      <div className="wrap">
        <div className="head">
          <div>
            <p className="lbl">MEDIA</p>
            <h2 className="w">Stories, insights, and more...</h2>
          </div>
          <button
            className="btn g"
            style={{ borderColor: "#41474E", color: "#F5F5F4" }}
            onClick={() => go("media")}
          >
            All coverage
          </button>
        </div>
        <div className="mcards">
          {MEDIA3.map((m) => (
            <article
              className="mcard"
              key={m.t}
              style={{ ["--mc" as string]: m.c }}
              onClick={() => go("media")}
            >
              <div className="ph">
                <img
                  loading="lazy"
                  src={pic(`kh-m-${m.k}`).src}
                  alt={pic(`kh-m-${m.k}`).alt}
                />

                <span className="wipe" />
              </div>
              <div className="k">{m.k}</div>
              <h3 className="w">{m.t}</h3>
              <div className="dt">{m.d}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Capital() {
  const { go } = useSite();
  return (
    <div className="capsec">
      <div className="wrap capgrid">
        <div>
          <p className="lbl">Capital</p>
          <h2 className="caph">Building something exceptional in Kentucky?</h2>
          <p className="lede" style={{ marginTop: 20 }}>
            We invest in tech-enabled companies across the Commonwealth — From a
            first cheque through Series A and beyond. Applications are read by
            the investment team, and every founder hears back either way.
          </p>
          <div className="cta" style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => go("apply")}>
              See the criteria and
            </button>
          </div>
        </div>
        <div className="capmark" aria-hidden="true">
          <img src={keyhorseLogomark.url} alt="" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="page on">
      <Hero />
      <Ticker />
      <Mission />
      <People />
      <FounderFeature />
      <Pillars />
      <MediaSection />
      <Capital />
    </section>
  );
}
