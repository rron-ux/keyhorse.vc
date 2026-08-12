import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AUD,
  CAPROWS,
  CYC,
  FEED,
  MEDIA3,
  PILLARS,
} from "@/data/keyhorse";
import { WALL } from "@/data/wall";

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
        <div className="cta">
          <button className="btn cy" onClick={() => go("industries")}>
            The industries
          </button>
          <button
            className="btn g"
            style={{ borderColor: "rgba(255,255,255,.3)", color: "#F5F5F4" }}
            onClick={() => go("media")}
          >
            What is happening
          </button>
        </div>
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
  const items = [...FEED, ...FEED];
  return (
    <div className="ticker ticker--dark">
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

function Mission() {
  const { go } = useSite();
  const [ai, setAi] = useState(0);
  const [, , copy, links] = AUD[ai]!;

  return (
    <div className="band mband">
      <img
        className="mband-bg"
        loading="lazy"
        src={pic("kh-kentucky").src}
        alt={pic("kh-kentucky").alt}
      />

      <Rv>
        <div className="msn">
          <div>
            <p className="lbl">Mission</p>
            <div className="big">
              <span>Kentucky should be where the</span>
              <span>company gets built,</span>
              <span>
                <em>not the place it leaves.</em>
              </span>
            </div>
            <p className="lede" style={{ marginTop: 26 }}>
              We report what is being built here so the people who could build it
              here can see it — and we put capital behind the ones who do.
            </p>
          </div>
          <div>
            <div className="audq">What brings you here?</div>
            <div className="audtabs">
              {AUD.map(([t], i) => (
                <button
                  key={t}
                  className="audtab"
                  aria-pressed={i === ai}
                  onClick={() => setAi(i)}
                >
                  {t}
                  <span className="ar">→</span>
                </button>
              ))}
            </div>
            <div className="audpane">
              <div className="in2" key={ai}>
                <p>{copy}</p>
                <div className="acts">
                  {links.map(([l, p]) => (
                    <button
                      key={l}
                      className={`btn ${p === "apply" ? "cy" : "g"}`}
                      onClick={() => go((p === "record" ? "media" : p) as never)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rv>
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
            <h2>Five pillars. Everything nests inside them.</h2>
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
            They moved the company from Silicon Valley to a factory two miles from
            the airport.
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
        <p className="lbl">Companies</p>
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
            We invest in tech-enabled companies across the Commonwealth — three
            funds, from a first cheque through Series A and beyond. Applications
            are read by the investment team, and every founder hears back either
            way.
          </p>
          <div className="cta" style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => go("apply")}>
              See the criteria
            </button>
            <button className="btn cy" onClick={() => go("apply")}>
              Apply
            </button>
          </div>
        </div>
        <div className="caprows">
          {CAPROWS.map(([n, nm, d]) => (
            <div className="caprow" key={n} onClick={() => go("apply")}>
              <div className="n">{n}</div>
              <div>
                <b>{nm}</b>
                <p>{d}</p>
              </div>
              <span className="ar">→</span>
            </div>
          ))}
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
