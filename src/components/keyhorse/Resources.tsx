import { useEffect, useMemo, useState } from "react";
import { EXT, RESCATS, RESOURCES } from "@/data/keyhorse";
import { Box, Chips, Head, PageHead, Rv, useSite } from "./shared";

const FILTERS = [
  ["all", "All"],
  ["Framework", "Frameworks"],
  ["Video", "Video"],
  ["Session", "Sessions"],
  ["Tool", "Tools"],
  ["Report", "Reports"],
] as const;

function Countdown() {
  const target = useMemo(() => Date.now() + 18 * 864e5, []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = Math.max(0, target - now);
  const cells: [number, string][] = [
    [Math.floor(ms / 864e5), "days"],
    [Math.floor(ms / 36e5) % 24, "hrs"],
    [Math.floor(ms / 6e4) % 60, "min"],
    [Math.floor(ms / 1e3) % 60, "sec"],
  ];

  return (
    <div className="cd">
      {cells.map(([v, l]) => (
        <div key={l}>
          <div className="v">{String(v).padStart(2, "0")}</div>
          <div className="l">{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Resources() {
  const { jump } = useSite();
  const [f, setF] = useState<(typeof FILTERS)[number][0]>("all");

  return (
    <section className="page on">
      <PageHead
        seed="kh-res"
        title="Resources"
        lede="Frameworks, recordings, tools and sessions. Open to any Kentucky founder, not just the portfolio."
      />

      <div className="band">
        <Rv>
          <p className="lbl">Next session</p>
          <div className="nextev">
            <Box seed="kh-event" w={1200} h={675} />
            <div className="bd">
              <div
                className="k"
                style={{
                  fontFamily: "var(--d)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--cyan-tx)",
                  marginBottom: 12,
                }}
              >
                Venture Session · Louisville
              </div>
              <h3 style={{ fontSize: "clamp(21px,2.3vw,30px)" }}>
                Raising your first institutional round
              </h3>
              <p
                style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 12 }}
              >
                Free and open to any founder. Recording published here afterwards.
              </p>
              <Countdown />
              <div
                style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}
              >
                <button className="btn cy">Register</button>
                <button className="btn g">Add to calendar</button>
              </div>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <Head label="Categories" title="What is in here." />
          <div className="rescats">
            {RESCATS.map(([n, t, d]) => (
              <div className="rcat" key={n} onClick={() => jump("res")}>
                <div className="n">{n}</div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <div className="head">
            <div>
              <p className="lbl">Ecosystem</p>
              <h2 className="w">The rest of the Commonwealth’s front doors.</h2>
              <p className="lede" style={{ marginTop: 12 }}>
                We are one part of this. These are the others, and they are worth
                your time before ours.
              </p>
            </div>
          </div>
          <div className="rows" style={{ borderColor: "#383838" }}>
            {EXT.map(([nm, ty, d, url]) => (
              <div className="ext" key={nm} style={{ borderColor: "#383838" }}>
                <div>
                  <div className="nm" style={{ color: "#fff" }}>
                    {nm}
                    <span>{ty}</span>
                  </div>
                  <div className="d">{d}</div>
                </div>
                <button
                  className="btn g"
                  style={{ borderColor: "#4A4A4A", color: "#F5F5F4" }}
                >
                  {url ? "Open" : "See all"}
                </button>
              </div>
            ))}
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv id="res">
          <Head label="Library" title="Everything, listed." />
          <Chips items={FILTERS} value={f} onChange={setF} />
          <div className="rows">
            {RESOURCES.filter((r) => f === "all" || r[0] === f).map(
              ([ty, n, d]) => (
                <div className="res" key={n}>
                  <div className="ty">{ty}</div>
                  <div>
                    <div className="nm">{n}</div>
                    <div className="d">{d}</div>
                  </div>
                  <button className="btn g">Open</button>
                </div>
              ),
            )}
          </div>
        </Rv>
      </div>
    </section>
  );
}
