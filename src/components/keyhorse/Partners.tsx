import { useState } from "react";
import { JOIN, PARTNERS, PARTNER_COLORS } from "@/data/keyhorse";
import { PageHead, Rv, useSite } from "./shared";
import { PCell } from "./cards";

function PartnerWall() {
  return (
    <div className="band">
      <Rv>
        <div className="head">
          <div>
            <p className="lbl">Behind the mission</p>
            <h2>We do not do this alone.</h2>
          </div>
          <div className="bignum">40+</div>
        </div>
        <div className="pcats">
          {PARTNERS.map(([ty, list]) => (
            <div className="pcat" key={ty} style={{ ["--kc" as string]: PARTNER_COLORS[ty] }}>
              <div className="ct">{ty}</div>
              {list.map((n, i) => (
                <div className="pent" key={n + i}>
                  <span className="mono">{n.replace(/[[\]]/g, "").trim()[0]}</span>
                  <span className="pnm">{n}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Rv>
    </div>
  );
}

export default function Partners() {
  const { go } = useSite();
  const [ty, setTy] = useState<string>(PARTNERS[0]![0]);
  const group = PARTNERS.find((p) => p[0] === ty)!;

  return (
    <section className="page on">
      <PageHead
        seed="kh-partners"
        title="Partners"
        lede="The accelerators, universities, corporates, angels and state agencies that make this work. If you want to be one of them, this is the page."
      />

      <PartnerWall />


      <div className="band">
        <Rv>
          <div className="ptabs">
            {PARTNERS.map(([t]) => (
              <button
                key={t}
                className="chip"
                aria-pressed={t === ty}
                onClick={() => setTy(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="pgrid">
            {group[1].map((n, i) => (
              <PCell key={n + i} n={n} ty={group[0]} />
            ))}
          </div>
          <p className="wallnote">
            Partner marks are placeholders — final build pulls logo files from the
            CMS.
          </p>
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">Entrepreneurship through acquisition</p>
              <h2 className="w" style={{ marginBottom: 18 }}>
                Roughly 190,000 Kentucky business owners are expected to retire
                within ten years.
              </h2>
              <p className="lede">
                Seventy-nine percent of small businesses in the Commonwealth have no
                succession plan, and in 2024 there was a single search-fund deal in
                the entire state. That is a large pool of profitable companies with
                nobody lined up to run them.
              </p>
              <p className="lede" style={{ marginTop: 14 }}>
                If you are a searcher, a seller, or an investor who backs acquisition
                entrepreneurs, we want to know you. It is not a fund we run — it is a
                gap we would like to see closed.
              </p>
            </div>
            <div>
              <p className="lbl">Who we want to hear from</p>
              <div className="jopts" style={{ gridTemplateColumns: "1fr" }}>
                {[
                  [
                    "Searchers",
                    "Operators looking to buy and run a Kentucky business.",
                  ],
                  [
                    "Owners planning an exit",
                    "We can point you toward buyers and advisors.",
                  ],
                  [
                    "ETA investors",
                    "Search funds and holding companies active in the region.",
                  ],
                ].map(([b, s]) => (
                  <div className="jopt" key={b} style={{ borderColor: "#3A3A3C" }}>
                    <b style={{ color: "#fff" }}>{b}</b>
                    <span style={{ color: "#A2A6A9" }}>{s}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn g"
                style={{
                  marginTop: 18,
                  borderColor: "#4A4A4A",
                  color: "#F5F5F4",
                }}
                onClick={() => go("partners")}
              >
                Get in touch
              </button>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <div className="joinbox">
            <div>
              <p className="lbl">Become a partner</p>
              <h2>Four ways to work with us.</h2>
              <p className="lede" style={{ marginTop: 14 }}>
                Whether you run a program, want early sight of Kentucky deal flow, or
                are looking to put capital to work in the Commonwealth — start here.
                This is not the founder application.
              </p>
              <div className="jopts">
                {JOIN.map(([t, d]) => (
                  <div className="jopt" key={t}>
                    <b>{t}</b>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                className="imgbox"
                style={{ aspectRatio: "4 / 3", marginBottom: 20 }}
              >
                <img
                  loading="lazy"
                  src={pic("kh-join").src}
                  alt={pic("kh-join").alt}
                />
                <span className="cap">Reference image</span>

              </div>
              <button className="btn cy" style={{ width: "100%", padding: 15 }}>
                Partner enquiry
              </button>
              <p
                style={{
                  fontSize: 12.5,
                  color: "var(--kh-muted)",
                  marginTop: 12,
                  textAlign: "center",
                }}
              >
                Or email partners@keyhorse.vc
              </p>
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}
