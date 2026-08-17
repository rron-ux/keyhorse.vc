import { useState } from "react";
import { ISEC, POSTS } from "@/data/keyhorse";
import { Head, Rv, useSite } from "./shared";
import { pic } from "@/lib/images";
import companies from "@/data/companies.json";

const COUNT: Record<string, number> = (companies as { sector: string }[]).reduce(
  (m, c) => ((m[c.sector] = (m[c.sector] || 0) + 1), m),
  {} as Record<string, number>,
);

/** Pillar colour + closest single Airtable sector for the Companies filter. */
const PILLAR_META: Record<
  string,
  { color: string; sector: string; advantage: string }
> = {
  "Logistics & Trade": {
    color: "#00A8E1",
    sector: "Industrials & Manufacturing",
    advantage: "Three air cargo hubs and a one-day drive to two-thirds of the US",
  },
  "Advanced Manufacturing & Automotive, Aerospace & Defense": {
    color: "#7A5CF0",
    sector: "Industrials & Manufacturing",
    advantage: "6,000+ plants, 250,000+ workers and a veteran technical workforce",
  },
  "Healthcare": {
    color: "#0E7C86",
    sector: "Healthcare & Life Sciences",
    advantage: "Humana, Atria and Waystar headquartered against a rural care gap",
  },
  "Energy, Materials & Climate": {
    color: "#E86A2B",
    sector: "Energy & CleanTech",
    advantage: "$10B+ of battery investment and the cheapest industrial power",
  },
  "Agriculture, Food & Consumer": {
    color: "#3F9B45",
    sector: "Agriculture & Food",
    advantage: "69,425 farms, the bourbon supply chain and the QSR capital",
  },
};

const ALSO = [
  "Software & AI",
  "Fintech",
  "Consumer & CPG",
  "Biotech & life sciences",
  "Medical devices",
  "Agtech & food",
  "Media & entertainment",
  "Education",
  "Gaming",
  "Real estate technology",
  "Construction technology",
  "Water & environment",
  "Safety & industrials",
  "Legal & compliance",
  "HR & workforce",
  "Marketing technology",
  "Logistics & mobility",
  "Hardware & robotics",
  "Business services",
  "Financial services",
];

export default function Industries() {
  const { go } = useSite();
  const [open, setOpen] = useState(0);

  return (
    <section className="page on ind">
      {/* Hero */}
      <div className="ihero">
        <img className="bgimg" src={pic("kh-log").src} alt={pic("kh-log").alt} />
        <div className="wrap">
          <p className="lbl">Industries</p>
          <h1>
            Five places where Kentucky has an{" "}
            <em className="ser">unnatural advantage</em>.
          </h1>
          <p className="lede">
            Infrastructure, customers, and a workforce that a competitor cannot
            replicate by opening an office somewhere else. We are a generalist
            investor, but if you are building in one of these industries, there
            is an even more compelling argument for being here — and we would
            like to hear from you.
          </p>
          <div className="igen">
            <p className="igen-note">
            </p>
            <button className="btn cy" onClick={() => go("apply")}>
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* The five — one expandable index */}
      <div className="band">
        <Rv>
          <div className="iacc">
            {ISEC.map(([n, , , , , seed], i) => {
              const meta = PILLAR_META[n]!;
              const isOpen = open === i;
              const img = pic(seed);
              return (
                <div
                  className={`iap${isOpen ? " on" : ""}`}
                  key={n}
                  style={{ ["--pc" as string]: meta.color }}
                >
                  <button
                    type="button"
                    className="iap-h"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="iap-n">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="iap-t">
                      <span className="iap-name">{n}</span>
                      <span className="iap-adv">{meta.advantage}</span>
                    </span>
                    <span className="iap-p" aria-hidden="true">
                      +
                    </span>
                  </button>

                  <div className="iap-b" hidden={!isOpen}>
                    <div className="iap-img">
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      <span className="duo" />
                    </div>
                    <p className="inarr">{NARRATIVE[n]}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </Rv>
      </div>

      {/* Not on this list? */}
      <div className="inot">
        <Rv>
          <div className="inot-g">
            <div>
              <h2>
                Not on this list? <em className="ser">Apply anyway.</em>
              </h2>
              <p>
                Most of our portfolio sits outside these five, and we intend to
                keep it that way. The sector matters far less than whether you
                are building here.
              </p>
              <p>
                If you are already in Kentucky — or seriously weighing a move —
                that is the part of the decision worth talking about.
              </p>
              <div className="ibtns">
                <button className="btn inot-p" onClick={() => go("apply")}>
                  Apply
                </button>
                <button className="btn inot-s" onClick={() => go("about")}>
                  How the funds work
                </button>
              </div>
            </div>
            <div>
              <p className="lbl">Also funded</p>
              <div className="itags">
                {ALSO.map((t) => (
                  <span className="itag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Rv>
      </div>

      {/* Coverage */}
      <div className="band">
        <Rv>
          <Head label="Coverage" title="What we are tracking.">
            <button className="btn g" onClick={() => go("media")}>
              All coverage
            </button>
          </Head>
          <div className="icov">
            {POSTS.slice(1, 4).map((p, i) => {
              const im = pic(
                ["kh-m-Feature", "kh-m-Market note", "kh-m-Round"][i]!,
              );
              const col = ["#00A8E1", "#7A5CF0", "#3F9B45"][i]!;
              return (
                <button
                  type="button"
                  className="icard"
                  key={p.t}
                  style={{ ["--pc" as string]: col }}
                  onClick={() => go("media")}
                >
                  <span className="icard-i">
                    <img src={im.src} alt={im.alt} loading="lazy" />
                  </span>
                  <span className="icard-k">{p.k}</span>
                  <span className="icard-t">{p.t}</span>
                  <span className="icard-d">{p.d}</span>
                  <span className="icard-r" />
                </button>
              );
            })}
          </div>
        </Rv>
      </div>

      {/* Closing */}
      <div className="band iclose">
        <Rv>
          <h2>Building here, or thinking about it?</h2>
          <p>
            Applications are read by the investment team, not a form. Every
            applicant hears back either way.
          </p>
          <div className="ibtns">
            <button className="btn" onClick={() => go("apply")}>
              Apply
            </button>
            <button className="btn g" onClick={() => go("partners")}>
              Talk to us first
            </button>
          </div>
        </Rv>
      </div>
    </section>
  );
}
