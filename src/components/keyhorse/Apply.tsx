import { Rv, useSite } from "./shared";
import { pic } from "@/lib/images";

const ROUTES = [
  {
    cls: "prog",
    k: "Programmatic capital",
    t: ["Through a ", "partner program"],
    body: "We invest into cohort companies through accelerators and pitch competitions across Kentucky. The program selects the company; we certify eligibility and put capital behind their judgement.",
    foot: "Discovery Fund · no separate application",
    cta: "See the partners →",
    action: "partners" as const,
    seed: "kh-kentucky",
  },
  {
    cls: "dir",
    k: "Direct investment",
    t: ["Straight ", "to us"],
    body: "You apply, we run our own diligence and decide. This is the route for most companies, and the only route once you are past the earliest stage. We can lead, co-lead or follow, and we can set terms.",
    foot: "Kentucky Enterprise Fund · Growth Fund",
    cta: "Start an application →",
    action: "apply" as const,
    seed: "kh-log",
  },
];

const FUNDS = [
  {
    dark: true,
    k: "Programmatic",
    name: "Discovery Fund",
    stage: "Pre-seed",
    cr: [
      "Companies in an established partner's accelerator or pitch competition",
      "Convertible note, single holder",
      "The program partner selects; Keyhorse certifies eligibility",
      "Not a priced or diligence-based investment",
    ],
  },
  {
    dark: false,
    k: "Direct",
    name: "Kentucky Enterprise Fund",
    stage: "Pre-seed and seed",
    cr: [
      "Revenue or comparable validation",
      "Usually alongside angels and one or two institutions",
      "Can lead, co-lead or follow; can set terms",
      "Comfortable being an early cheque",
      "SAFEs, convertible notes, priced rounds, revenue share",
    ],
  },
  {
    dark: false,
    k: "Direct",
    name: "Growth Fund",
    stage: "Seed through Series A and beyond",
    cr: [
      "Syndicated rounds with institutional co-investors",
      "Can lead, co-lead or follow; can set terms",
      "Typically $100K+ recurring revenue or equivalent traction",
      "Preference for Kentucky-advantaged industries",
      "SAFEs, convertible notes, priced rounds",
    ],
  },
];

/* Original seven-step process — kept as-is. */
const PROCESS = [
  ["01", "Apply", "Submit the form. Every applicant hears back, either way."],
  ["02", "Screening", "Reviewed against the published criteria and fit with a specific fund."],
  ["03", "Intro call", "A conversation about the company, the round and the timing."],
  ["04", "Data room", "Financials, metrics, cap table, customers and legal."],
  ["05", "Diligence call", "A deeper session with the team, plus reference calls."],
  ["06", "Investment committee", "The committee reviews the file and votes."],
  ["07", "Decision", "Terms and documentation, or a clear no with the reason."],
];

const TRACTION = [
  ["XLerateHealth", "Louisville"],
  ["Awesome Inc", "Lexington"],
  ["SparkHaus", "Covington"],
  ["Story Louisville", "Louisville"],
  ["Kentucky Innovation Network", "Statewide"],
  ["Render", "Louisville"],
];

const COMPETITIONS = [
  ["5 Across", "Awesome Inc"],
  ["Vogt Awards", "Louisville"],
  ["Cardinal Challenge", "UofL"],
  ["Venture Challenge", "University of Kentucky"],
  ["Idea State U", "Statewide"],
  ["Startup Weekend", "Multiple cities"],
];

function Lab({ t, r }: { t: string; r: string }) {
  return (
    <div className="pit-lab">
      <span className="t">{t}</span>
      <span className="line" />
      <span>{r}</span>
    </div>
  );
}

function PartnerPanel() {
  return (
    <div className="pit-panel">
      <span className="pit-k">Programmatic capital</span>
      <h3>Partner programs</h3>
      <p className="pit-sub">
        We invest into companies coming through these programs. Selection is made by
        the program, not by us — we certify eligibility and fund the cohort.
      </p>

      <h4>Traction programs</h4>
      <div className="pit-plist">
        {TRACTION.map(([n, l]) => (
          <div key={n}>
            {n}
            <span>{l}</span>
          </div>
        ))}
      </div>

      <h4>Competition partners</h4>
      <div className="pit-plist">
        {COMPETITIONS.map(([n, l]) => (
          <div key={n}>
            {n}
            <span>{l}</span>
          </div>
        ))}
      </div>

      <p className="pit-pfoot">
        Running a program you think should be on this list? Get in touch.
      </p>
    </div>
  );
}

export default function Apply() {
  const { go, jump, openSlide } = useSite();
  const hero = pic("kh-mfg");

  return (
    <section className="page on pit">
      {/* Hero */}
      <div className="ihero pit-hero">
        <img className="bgimg" src={hero.src} alt={hero.alt} />
        <div className="wrap">
          <Lab t="Pitch" r="Keyhorse Capital" />
          <h1>
            Two ways in. <b>One bar.</b>
          </h1>
          <p className="lede">
            Programmatic capital reaches you through the programs already working
            across the state. Direct investment starts with an application on this
            site. What we look for does not change between them.
          </p>
        </div>
      </div>

      {/* 1 — Two routes */}
      <div className="band">
        <div className="wrap">
          <Rv>
            <Lab t="How capital reaches you" r="Two routes" />
            <div className="pit-rgrid">
              {ROUTES.map((r) => (
                <article className={`pit-rcard ${r.cls}`} key={r.k}>
                  <img className="pit-rbg" src={pic(r.seed).src} alt="" aria-hidden="true" />
                  <div className="pit-rin">
                    <span className="pit-k">{r.k}</span>
                    <h3>
                      {r.t[0]}
                      <b>{r.t[1]}</b>
                    </h3>
                    <p>{r.body}</p>
                    <div className="pit-rfoot">
                      <span className="pit-f">{r.foot}</span>
                      <button
                        className="pit-link"
                        onClick={() =>
                          r.action === "partners"
                            ? openSlide(<PartnerPanel />)
                            : jump("criteria-apply")
                        }
                      >
                        {r.cta}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Rv>
        </div>
      </div>

      {/* 2 — The funds */}
      <div className="band">
        <div className="wrap">
          <Rv>
            <Lab t="The funds" r="Three vehicles" />
            <h2>What each fund is for.</h2>
            <p className="pit-dek">
              What shifts between them is how far along you need to be, not what we
              are looking at.
            </p>
            <div className="pit-fgrid">
              {FUNDS.map((f) => (
                <div className={`pit-fcard${f.dark ? " dk" : ""}`} key={f.name}>
                  <span className="pit-k">{f.k}</span>
                  <h3>{f.name}</h3>
                  <div className="pit-st">{f.stage}</div>
                  <ul>
                    {f.cr.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="pit-fnote">
              We invest across industries. Traction differs by sector, so we read
              conviction in context rather than against predefined metrics.
            </p>
          </Rv>
        </div>
      </div>

      {/* 3 — Process (original seven-step list) */}
      <div className="pit-proc">
        <div className="wrap">
          <Rv>
            <Lab t="The process" r="Application to decision" />
            <h2>What happens after you send it.</h2>
            <div className="apg-steps">
              {PROCESS.map(([n, t, d]) => (
                <div className="apg-step" key={n}>
                  <span className="apg-sn">{n}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <p className="pit-pace">
              We do not publish timelines. Pace depends on the round, the fund, and
              how ready your data room is — quoting an average would only be true for
              the companies it happened to be true for.
            </p>
          </Rv>
        </div>
      </div>

      {/* 4 — Closing */}
      <div className="band" id="criteria-apply">
        <div className="wrap">
          <Rv>
            <Lab t="Get started" r="Pick your route" />
            <div className="pit-cgrid">
              <button className="pit-cbox solid" onClick={() => go("partners")}>
                <span className="pit-k">Direct investment</span>
                <h3>Submit an application</h3>
                <p>
                  Have your deck, metrics, cap table and round details ready. Roughly
                  twenty minutes. Every applicant hears back.
                </p>
                <span className="pit-go">Start an application →</span>
              </button>
              <button className="pit-cbox" onClick={() => openSlide(<PartnerPanel />)}>
                <span className="pit-k">Programmatic capital</span>
                <h3>Find a partner program</h3>
                <p>
                  Already in an accelerator or pitch competition? You may be in front
                  of us already. See which programs we invest through.
                </p>
                <span className="pit-go">View partner programs →</span>
              </button>
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}
