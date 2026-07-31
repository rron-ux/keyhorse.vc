import { useState } from "react";
import { CAL, POSTS, SOCIALS } from "@/data/keyhorse";
import { Box, Chips, Head, PageHead, Rv } from "./shared";
import { PostCard } from "./cards";

const FILTERS = [
  ["all", "All"],
  ["deal", "Rounds"],
  ["story", "Features"],
  ["note", "Market notes"],
] as const;

export default function Media() {
  const [t, setT] = useState<(typeof FILTERS)[number][0]>("all");

  return (
    <section className="page on">
      <PageHead
        seed="kh-media"
        title="Media"
        lede="Everything we publish about Kentucky venture, in one place — rounds, features, market notes, video, the newsletter, and a live calendar of what is happening across the Commonwealth."
      />

      <div className="band">
        <Rv>
          <div className="feat" style={{ marginBottom: 40 }}>
            <Box seed="kh-anchor" w={1200} h={820} />
            <div className="bd">
              <div className="k">Founder feature · Video</div>
              <h3>Placeholder headline for the anchor feature of the month.</h3>
              <div className="mt">Long-form profile, shot on location.</div>
              <div className="by">Reported by Keyhorse · [Month] 2026</div>
            </div>
          </div>
          <Chips items={FILTERS} value={t} onChange={setT} />
          <div className="cards">
            {POSTS.filter((p) => t === "all" || p.k === t).map((p, i) => (
              <PostCard key={p.t} p={p} i={i} />
            ))}
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <Head label="Channels" title="Where else we publish." />
          <div className="mgrid">
            {SOCIALS.map(([p, h, tx, c]) => (
              <div className="msoc" key={p}>
                <div className="h">
                  <div className="p">{p}</div>
                  <div className="c">{c}</div>
                </div>
                <div className="t">{tx}</div>
                <div className="g">
                  <div />
                  <div />
                  <div />
                </div>
                <div
                  className="t"
                  style={{
                    marginTop: 12,
                    color: "var(--cyan)",
                    fontFamily: "var(--m)",
                    fontSize: 11.5,
                  }}
                >
                  {h}
                </div>
              </div>
            ))}
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
            {CAL.map(([d, m, nm, ty, wh, own]) => (
              <div className="ev" key={nm}>
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
              </div>
            ))}
          </div>
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">Reports</p>
              <h2 className="w" style={{ marginBottom: 16 }}>
                The Kentucky Venture Report.
              </h2>
              <p className="lede">
                Every disclosed round, every fund forming, every program opening, by
                sector and region. Published annually, free, and cited by people who
                never read a single post. It is the record the rest of this is built
                on.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 22,
                  flexWrap: "wrap",
                }}
              >
                <button className="btn" style={{ background: "#fff", color: "#222" }}>
                  Read the 2026 report
                </button>
                <button
                  className="btn g"
                  style={{ borderColor: "#4A4A4A", color: "#F5F5F4" }}
                >
                  Previous editions
                </button>
              </div>
            </div>
            <div>
              <p className="lbl">Subscribe</p>
              <h3 className="w" style={{ fontSize: 24, marginBottom: 12 }}>
                One email a month.
              </h3>
              <p className="lede">
                Rounds, features, open calls and what we are seeing. No forwarding
                required — it is the same thing we would tell you on a call.
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
                <button className="btn" style={{ background: "var(--cyan)" }}>
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
