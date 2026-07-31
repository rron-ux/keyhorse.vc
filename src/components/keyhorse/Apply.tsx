import { Rv, useSite } from "./shared";
import { pic } from "@/lib/images";

const WAYS = [
  {
    n: "01",
    kicker: "Programmatic",
    color: "#7B4FD0",
    title: "Through a partner program",
    body: "We invest into cohort companies through accelerators, incubators and pitch competitions across the state. If you are in one of those programs, you are already in front of us — no separate application needed.",
    foot: ["Discovery Fund", "Pre-seed", "via partner programs"],
  },
  {
    n: "02",
    kicker: "Direct",
    color: "#00A8E1",
    title: "Straight to us",
    body: "You apply directly and we run our own process. This is the route for most companies, and the only route once you are past the earliest stage.",
    foot: [
      "Kentucky Enterprise Fund",
      "Growth Fund",
      "Pre-seed and seed",
      "seed through Series A and beyond",
    ],
  },
];

const FUNDS = [
  {
    n: "01",
    name: "Discovery Fund",
    color: "#7B4FD0",
    tags: ["Programmatic"],
    stage: "Pre-seed",
    d: "Our earliest capital, invested into companies inside partner accelerator, incubator and pitch-competition cohorts.",
    cr: [
      "enrolled in a partner program",
      "tech-enabled and Kentucky-based",
      "earliest stage, pre-revenue is fine",
    ],
  },
  {
    n: "02",
    name: "Kentucky Enterprise Fund",
    color: "#00A8E1",
    tags: ["Direct"],
    stage: "Pre-seed / Seed",
    d: "Direct investment into validated tech-enabled startups building in Kentucky.",
    cr: [
      "validated prototype or MVP",
      "evidence of real demand",
      "a credible path to revenue",
      "Kentucky headquarters, or relocating",
    ],
  },
  {
    n: "03",
    name: "Growth Fund",
    color: "#1F8B57",
    tags: ["Direct", "Growth"],
    stage: "Seed / Series A+",
    d: "Larger positions in companies with revenue and repeatable traction, with reserves held for follow-on.",
    cr: [
      "revenue and repeatable traction",
      "customers beyond a local market",
      "an institutional round forming",
      "employment potential in the state",
    ],
  },
];

const REQ = [
  ["01", "Tech-enabled", "A technology product, or a business model that depends on one."],
  ["02", "Kentucky-based", "Headquartered here, or committed to relocating."],
  ["03", "Something built", "A validated prototype, an MVP, or traction toward product-market fit."],
  ["04", "A route to revenue", "Demonstrated ability to generate it, or a clear line to it."],
  ["05", "Customers beyond here", "A market larger than the immediate region."],
  ["06", "Jobs that stay", "Potential to create employment in the Commonwealth."],
];

const PROCESS = [
  ["01", "Apply", "Submit the form. Every applicant hears back, either way."],
  ["02", "Screening", "Reviewed against the published criteria and fit with a specific fund."],
  ["03", "Intro call", "A conversation about the company, the round and the timing."],
  ["04", "Data room", "Financials, metrics, cap table, customers and legal."],
  ["05", "Diligence call", "A deeper session with the team, plus reference calls."],
  ["06", "Investment committee", "The committee reviews the file and votes."],
  ["07", "Decision", "Terms and documentation, or a clear no with the reason."],
];

const READY = [
  ["Deck", "ten slides is plenty"],
  ["Metrics", "whatever you actually track"],
  ["Cap table", "current, with any outstanding instruments"],
  ["The round", "size, stage, and who else is in it"],
];

export default function Apply() {
  const { go, jump } = useSite();
  const hero = pic("kh-mfg");

  return (
    <section className="page on apg">
      {/* Hero */}
      <div className="ihero apg-hero">
        <img className="bgimg" src={hero.src} alt={hero.alt} />
        <div className="wrap">
          <p className="lbl">Apply</p>
          <h1>A venture capital firm investing in Kentucky.</h1>
          <p className="lede">
            We back tech-enabled companies from a first cheque through Series A and
            beyond. Two ways in, three funds, and criteria published before the form
            rather than after it.
          </p>
          <div className="apg-cta">
            <button className="btn cy" onClick={() => jump("criteria-apply")}>
              Start an application
            </button>
            <button className="btn apg-o" onClick={() => jump("criteria-apply")}>
              See the criteria
            </button>
          </div>
        </div>
      </div>

      {/* Two ways in */}
      <div className="band">
        <Rv>
          <p className="lbl">Two ways in</p>
          <div className="apg-ways">
            {WAYS.map((w) => (
              <article
                className="apg-way"
                key={w.n}
                style={{ ["--wc" as string]: w.color }}
              >
                <span className="apg-wrule" />
                <p className="apg-wk">
                  {w.n} · {w.kicker}
                </p>
                <h3>{w.title}</h3>
                <p className="apg-body">{w.body}</p>
                <div className="apg-wfoot">
                  {w.foot.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Rv>
      </div>

      {/* The funds */}
      <div className="band" id="criteria-apply">
        <Rv>
          <p className="lbl">The funds</p>
          <div className="apg-funds">
            {FUNDS.map((f) => (
              <div
                className="apg-fund"
                key={f.n}
                style={{ ["--fc" as string]: f.color }}
              >
                <div className="apg-fn">{f.n}</div>
                <div className="apg-fname">
                  <h3>{f.name}</h3>
                  <div className="apg-tags">
                    {f.tags.map((t) => (
                      <span className="apg-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="apg-stage">{f.stage}</p>
                </div>
                <p className="apg-fd">{f.d}</p>
                <ul className="apg-fcr">
                  {f.cr.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Rv>
      </div>

      {/* Every fund requires */}
      <div className="band apg-req">
        <Rv>
          <p className="lbl">Every fund requires</p>
          <div className="apg-reqg">
            {REQ.map(([n, t, d]) => (
              <div className="apg-cell" key={n}>
                <span className="apg-cn">{n}</span>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </Rv>
      </div>

      {/* Process */}
      <div className="band">
        <Rv>
          <p className="lbl">Process</p>
          <div className="apg-steps">
            {PROCESS.map(([n, t, d]) => (
              <div className="apg-step" key={n}>
                <span className="apg-sn">{n}</span>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className="apg-note">
            We do not publish timelines. Pace depends on the round, the fund, and how
            ready the data room is.
          </p>
        </Rv>
      </div>

      {/* Closing */}
      <div className="inot apg-close">
        <Rv>
          <div className="inot-g">
            <div>
              <h2>Ready when you are.</h2>
              <p>
                Applications are read by the investment team, not a form. Every
                founder hears back either way, with a reason.
              </p>
              <div className="apg-cta" style={{ marginTop: 22 }}>
                <button
                  className="btn inot-p"
                  style={{ padding: "15px 30px" }}
                  onClick={() => jump("criteria-apply")}
                >
                  Start an application
                </button>
                <button className="btn inot-s" onClick={() => go("partners")}>
                  Talk to us first
                </button>
              </div>
            </div>
            <div>
              <p className="lbl">Have these ready</p>
              <div className="apg-ready">
                {READY.map(([t, d]) => (
                  <div className="apg-rrow" key={t}>
                    <span className="apg-arw" aria-hidden="true">
                      →
                    </span>
                    <b>{t}</b>
                    <span className="apg-rd">— {d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
}
