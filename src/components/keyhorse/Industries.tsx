import { ISEC, POSTS } from "@/data/keyhorse";
import { Box, Head, PageHead, Rv, useSite } from "./shared";
import { PostCard } from "./cards";

export default function Industries() {
  const { go } = useSite();
  return (
    <section className="page on">
      <PageHead
        seed="kh-ind"
        title="Industries"
        lede="Five pillars where the Commonwealth has something real — infrastructure, an employer base, and a reason for a company to be here rather than anywhere else. Everything we invest in nests inside them. Each lists the sub-sectors and the specific calls we are making."
      />

      <div className="band">
        <Rv>
          {ISEC.map(([n, d, facts, subs, call, seed]) => (
            <div className="isec" key={n}>
              <Box seed={seed} w={900} h={675} />
              <div>
                <h2>{n}</h2>
                <p className="lede">{d}</p>
                <div className="facts">
                  {facts.map((f) => (
                    <span className="fact" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
                <div className="call">
                  <b>Sectors we invest in</b>
                  <p
                    style={{
                      color: "var(--kh-muted)",
                      fontSize: 14.5,
                      margin: "0 0 12px",
                    }}
                  >
                    {subs}
                  </p>
                  <b style={{ marginTop: 4 }}>Call for startups</b>
                  <p style={{ color: "var(--ink)", fontSize: 14.5, margin: 0 }}>
                    {call}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">Beyond the hub</p>
              <h2 className="w" style={{ marginBottom: 18 }}>
                These seven are where we are building a hub.
                <br />
                They are not the limit of what we fund.
              </h2>
              <p className="lede">
                Keyhorse invests in tech-enabled companies across Kentucky, in any
                category. The concentration above is about where the Commonwealth has
                infrastructure, customers and a workforce that cannot be replicated
                remotely — it is a positioning decision, not an exclusion list.
              </p>
              <div
                style={{
                  marginTop: 22,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="btn"
                  style={{ background: "#fff", color: "#222" }}
                  onClick={() => go("apply")}
                >
                  Apply
                </button>
                <button className="btn g" onClick={() => go("about")}>
                  How the funds work
                </button>
              </div>
            </div>
            <div>
              <p className="lbl">Where Kentucky is not the answer</p>
              <p className="lede" style={{ marginBottom: 16 }}>
                We would rather tell you now than after three meetings. Kentucky is
                not the right place to build:
              </p>
              <div className="nofit">
                <span>Boston-scale biotech research</span>
                <span>Consumer social apps</span>
                <span>Frontier AI research labs</span>
                <span>Web3 and speculation</span>
                <span>Luxury fintech</span>
              </div>
              <p className="lbl" style={{ marginTop: 26 }}>
                Also funded
              </p>
              <div className="facts" style={{ gap: 9 }}>
                {[
                  "Software & AI",
                  "Fintech",
                  "Consumer",
                  "Biotech & life sciences",
                  "Agtech",
                  "Media",
                  "Education",
                  "Water & environment",
                  "Safety & industrials",
                ].map((f) => (
                  <span
                    className="fact"
                    key={f}
                    style={{ borderColor: "#3A3A3C", color: "#A2A6A9" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="lede" style={{ marginTop: 20 }}>
                The Discovery Fund reaches companies through partner accelerators and
                pitch competitions in any category, which is how most first-time
                Kentucky founders meet us.
              </p>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <Head label="Coverage" title="What we are tracking.">
            <button className="btn g" onClick={() => go("media")}>
              All coverage
            </button>
          </Head>
          <div className="cards">
            {POSTS.slice(1, 4).map((p, i) => (
              <PostCard key={p.t} p={p} i={i + 10} />
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
}
