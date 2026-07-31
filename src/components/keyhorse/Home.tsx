import { useEffect, useRef, useState } from "react";
import { AUD, CYC, FEED, HERO, IND, PARTNERS, POSTS } from "@/data/keyhorse";
import { Box, Head, IMG, Rv, useSite } from "./shared";
import { CompanySlide, CompanyWall, PCell, PostCard } from "./cards";

function Hero() {
  const { go, jump } = useSite();
  const [frame, setFrame] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = setInterval(() => setFrame((f) => (f + 1) % HERO.length), 5200);
    const b = setInterval(() => setCi((c) => (c + 1) % CYC.length), 2600);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div className="hero">
      <div className="frames">
        {HERO.map((s, i) => (
          <img
            key={s}
            className={i === frame ? "on" : ""}
            src={IMG(s, 1900, 1100)}
            alt=""
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
            onClick={() => jump("record")}
          >
            What is happening
          </button>
        </div>
      </div>
      <div className="foot">
        <div className="wrap">
          <span>The record of Kentucky venture</span>
          <span>Updated weekly</span>
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const items = [...FEED, ...FEED];
  return (
    <div className="ticker">
      <div className="track">
        {items.map(([, co, sec, city, amt], i) => (
          <div className="it" key={i}>
            <b>{co}</b>
            <span className="a">{amt}</span>
            <span>
              {sec} · {city}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Mission() {
  const { go, jump } = useSite();
  const [ai, setAi] = useState(0);
  const [, , copy, links] = AUD[ai]!;

  return (
    <div className="band">
      <Rv>
        <div className="msn">
          <div>
            <p className="lbl">Mission</p>
            <div className="big">
              <span>Kentucky should be where the</span>
              <span>
                company gets built, <em>not the</em>
              </span>
              <span>
                <em>place it leaves.</em>
              </span>
            </div>
            <p className="lede" style={{ marginTop: 26 }}>
              We report what is being built here so the people who could build it
              here can see it — and we put capital behind the ones who do.
            </p>
            <div className="facts">
              <span className="fact">Three air cargo hubs</span>
              <span className="fact">13% manufacturing workforce</span>
              <span className="fact">$26.1B automotive since 2014</span>
              <span className="fact">Fortune 50 payer in-state</span>
            </div>
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
                      onClick={() =>
                        p === "record" ? jump("record") : go(p as never)
                      }
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

function Record() {
  const { go, openSlide } = useSite();
  return (
    <div className="band band--tint" id="record">
      <Rv>
        <Head label="The record" title="Every round in Kentucky.">
          <button className="btn g" onClick={() => go("media")}>
            All coverage
          </button>
        </Head>
        <div className="feed">
          {FEED.map(([dt, co, sec, city, amt, stage, ours], i) => (
            <div
              className="fr"
              key={i}
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
          We report every disclosed round in the Commonwealth, whether or not we
          participated. Participation is noted as a fact, never as the headline.
        </p>
      </Rv>
    </div>
  );
}

function IndustryRail() {
  const { go } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const hs = (dir: number) =>
    ref.current?.scrollBy({
      left: dir * (ref.current.clientWidth * 0.8),
      behavior: "smooth",
    });

  return (
    <div className="band band--tint">
      <Rv>
        <div className="head">
          <div>
            <p className="lbl">Where Kentucky wins</p>
            <h2>Five pillars. Everything nests inside them.</h2>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="harrows">
              <button className="harrow" onClick={() => hs(-1)} aria-label="Previous">
                ←
              </button>
              <button className="harrow" onClick={() => hs(1)} aria-label="Next">
                →
              </button>
            </div>
            <button className="btn g" onClick={() => go("industries")}>
              Explore
            </button>
          </div>
        </div>
        <div className="hrail">
          <div className="hscroll" ref={ref}>
            {IND.map(([num, n, d, seed, subs]) => (
              <div className="hcard" key={num} onClick={() => go("industries")}>
                <Box seed={seed} w={760} h={428} />
                <div className="bd">
                  <div className="n">{num}</div>
                  <div className="nm">{n}</div>
                  <div className="d">{d}</div>
                  <div className="sub">{subs}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Rv>
    </div>
  );
}

export default function Home() {
  const { go } = useSite();
  return (
    <section className="page on">
      <Hero />
      <Ticker />
      <Mission />
      <Record />

      <div className="band">
        <Rv>
          <Head label="Behind the mission" title="We do not do this alone.">
            <button className="btn g" onClick={() => go("partners")}>
              All partners
            </button>
          </Head>
          <div className="pgrid">
            {PARTNERS.flatMap(([ty, list]) =>
              list.slice(0, 2).map((n) => <PCell key={ty + n} n={n} ty={ty} />),
            )}
          </div>
          <p className="wallnote">
            Accelerators, universities, corporates, angels and state partners. Logos
            are placeholders.
          </p>
        </Rv>
      </div>

      <IndustryRail />

      <div className="band">
        <Rv>
          <Head label="Feature" title="The people building it.">
            <button className="btn g" onClick={() => go("media")}>
              All features
            </button>
          </Head>
          <div className="feat">
            <Box seed="kh-feature" w={1200} h={820} />
            <div className="bd">
              <div className="k">Founder feature · Video</div>
              <h3>
                They moved the company from Silicon Valley to a factory two miles
                from the airport.
              </h3>
              <div className="mt">
                Placeholder standfirst. A reported profile of a company building in
                one of our industries — how they got here, what they found, what it
                cost.
              </div>
              <div className="by">Reported by Keyhorse · [Month] 2026</div>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <Head label="Perspectives" title="Reporting and analysis.">
            <button className="btn g" onClick={() => go("media")}>
              All coverage
            </button>
          </Head>
          <div className="cards stag">
            {POSTS.slice(0, 3).map((p, i) => (
              <PostCard key={p.t} p={p} i={i} />
            ))}
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv>
          <Head label="Companies" title="Who is building here.">
            <button className="btn g" onClick={() => go("companies")}>
              Browse all
            </button>
          </Head>
          <div className="wall">
            <CompanyWall count={12} />
          </div>
          <p className="wallnote">
            Company wordmarks shown as placeholders — final build pulls grayscale
            logo files from the CMS.
          </p>
        </Rv>
      </div>
    </section>
  );
}
