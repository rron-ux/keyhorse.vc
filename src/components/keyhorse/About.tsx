import { useEffect, useState } from "react";
import { Rv, useSite } from "./shared";
import { FOUNDER_PORTRAITS, HERO_FRAMES } from "@/lib/images";

const BIP_URL = "https://www.bipventures.vc/state-of-startups/2025#states";

const FIGURES: [string, string][] = [
  ["$100M+", "invested in Kentucky companies"],
  ["$3.3B+", "follow-on capital raised"],
  ["600+", "companies backed since 2001"],
  ["209", "active in the portfolio today"],
];

const DIFF: [string, string, string][] = [
  [
    "01",
    "We see more of them",
    "We invest more often than anyone else in the state. Volume is why we know what a normal round here actually looks like, and why we can tell you quickly.",
  ],
  [
    "02",
    "No fund clock",
    "Our structure is evergreen. We are not working to a horizon that forces a sale on a schedule which suits us rather than you.",
  ],
  [
    "03",
    "We can keep going",
    "Three funds spanning a first cheque through Series A and beyond. A company that works does not get handed off at the next round.",
  ],
  [
    "04",
    "We are already here",
    "In the state, not visiting it. Customers, co-investors and senior hires are a local call rather than an introduction to an introduction.",
  ],
  [
    "05",
    "You get a real answer",
    "Criteria are published before the form. Every applicant hears back, and a no comes with the reason behind it.",
  ],
];

const WEIGHT: [string, string, string][] = [
  [
    "01",
    "Freight and trade",
    "Three major air cargo hubs and a one-day drive to two-thirds of the country.",
  ],
  [
    "02",
    "Manufacturing and industry",
    "Six thousand facilities and a quarter of a million people working in them.",
  ],
  [
    "03",
    "Health and care",
    "A Fortune 50 payer headquartered in Louisville against a rural care gap.",
  ],
  [
    "04",
    "Energy and materials",
    "Low industrial power costs and the largest primary aluminium capacity in the country.",
  ],
  [
    "05",
    "Agriculture and food",
    "Sixty-nine thousand farms and a bourbon supply chain measured in billions.",
  ],
];

const PRESS: { outlet: string; headline: string; date: string; url: string }[] = [
  {
    outlet: "BIP Ventures",
    headline: "State of Startups in the Southeast 2025",
    date: "Oct 2025",
    url: BIP_URL,
  },
  { outlet: "[Outlet]", headline: "[Headline]", date: "[Date]", url: "#" },
  { outlet: "[Outlet]", headline: "[Headline]", date: "[Date]", url: "#" },
  { outlet: "[Outlet]", headline: "[Headline]", date: "[Date]", url: "#" },
];

type Person = {
  name: string;
  role: string;
  bio: string;
  focus: string;
  location: string;
};

const PEOPLE: Person[] = [
  {
    name: "Kelby Price",
    role: "Managing Partner",
    bio: "Leads the investment committee and the firm's direct investing across all three funds.",
    focus: "Investment committee",
    location: "Lexington, KY",
  },
  {
    name: "Autumn Rice",
    role: "Director of Operations",
    bio: "Runs the day-to-day operations of the firm and the application pipeline.",
    focus: "Fund operations",
    location: "Lexington, KY",
  },
  {
    name: "Eugene Yang",
    role: "Fund Operations Director",
    bio: "Oversees fund accounting, reporting and compliance across the portfolio.",
    focus: "Reporting and compliance",
    location: "Louisville, KY",
  },
  {
    name: "Devin Morris",
    role: "Strategic Communications",
    bio: "Handles communications for the firm and the companies it backs.",
    focus: "Communications",
    location: "Louisville, KY",
  },
  {
    name: "Bobby Riley",
    role: "Platform Manager",
    bio: "Connects portfolio companies to customers, co-investors and senior hires.",
    focus: "Portfolio support",
    location: "Lexington, KY",
  },
  {
    name: "Rron Thaci",
    role: "Associate",
    bio: "Sources new companies and runs diligence on direct investments.",
    focus: "Sourcing and diligence",
    location: "Lexington, KY",
  },
  {
    name: "Zimri Rodriguez",
    role: "Venture Programs Coordinator",
    bio: "Coordinates the partner programs that feed the Discovery Fund.",
    focus: "Programs and sessions",
    location: "Covington, KY",
  },
  {
    name: "Aditya Padmaraj",
    role: "Analyst",
    bio: "Tracks market data across Kentucky rounds, funds and sectors.",
    focus: "Market data",
    location: "Lexington, KY",
  },
];

const FUNDS: [string, string, string][] = [
  ["Discovery Fund", "Programmatic · Pre-seed", "Through partner programs"],
  ["Kentucky Enterprise Fund", "Direct · Pre-seed and seed", "Direct application"],
  ["KSBCI", "Direct · Growth", "Seed through Series A and beyond"],
];

function TeamModal({ p, i, onClose }: { p: Person; i: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const img = FOUNDER_PORTRAITS[i % FOUNDER_PORTRAITS.length]!;

  return (
    <div className="abt-scrim" onClick={onClose}>
      <div
        className="abt-modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="abt-x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <img src={img.src} alt={p.name} />
        <div className="abt-mbd">
          <h3>{p.name}</h3>
          <p className="abt-mrole">{p.role}</p>
          <p className="abt-mbio">{p.bio}</p>
          <div className="abt-kv">
            <span>Focus area</span>
            <span>{p.focus}</span>
          </div>
          <div className="abt-kv">
            <span>Location</span>
            <span>{p.location}</span>
          </div>
          <div className="abt-mbtns">
            <a
              className="btn cy"
              href="https://www.linkedin.com/company/keyhorse-capital/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a className="btn g" href="mailto:hello@keyhorse.vc">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { go } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  const hero = HERO_FRAMES[0]!;

  return (
    <section className="page on abt">
      {/* Hero */}
      <div className="ihero">
        <img className="bgimg" src={hero.src} alt={hero.alt} />
        <div className="wrap">
          <p className="lbl">About</p>
          <h1>A venture capital firm investing across Kentucky.</h1>
          <p className="lede">
            We back tech-enabled companies in any sector, from a first cheque
            through Series A and beyond. We invest more often than anyone else in
            the state, and we weight toward the industries where Kentucky has an
            advantage that is hard to copy.
          </p>
          <div className="abt-cta">
            <button className="btn cy" onClick={() => go("apply")}>
              Apply for investment
            </button>
            <button className="btn apg-o" onClick={() => go("industries")}>
              The industries
            </button>
          </div>
        </div>
      </div>

      {/* Figures and the ranking */}
      <div className="band abt-figs">
        <Rv>
          <p className="lbl">Figures</p>
          <div className="abt-fgrid">
            {FIGURES.map(([n, l]) => (
              <div className="abt-fcell" key={l}>
                <div className="abt-fn">{n}</div>
                <div className="abt-fl">{l}</div>
              </div>
            ))}
          </div>

          <div className="abt-rank">
            <h2>3rd most active venture fund in the Southeast by deal count.</h2>
            <p>
              164 deals between January 2018 and June 2025 — behind only Virginia
              Venture Partners and Triangle Tweener Fund, and ahead of Gaingels,
              Right Side Capital and Andreessen Horowitz. In Kentucky, 161 deals
              against 43 for the next most active investor.
            </p>
            <p className="abt-src">
              <a href={BIP_URL} target="_blank" rel="noopener noreferrer">
                BIP Ventures
              </a>
              , State of Startups in the Southeast 2025 · PitchBook data
            </p>
          </div>
        </Rv>
      </div>

      {/* How we differ */}
      <div className="band">
        <Rv>
          <p className="lbl">How we differ</p>
          <div className="abt-diff">
            {DIFF.map(([n, t, d]) => (
              <article className="abt-dcell" key={n}>
                <span className="abt-drule" />
                <span className="abt-dn">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </Rv>
      </div>

      {/* Thesis */}
      <div className="band abt-thesis-band">
        <Rv>
          <div className="abt-thesis">
            <div>
              <p className="lbl">Our thesis</p>
              <h2>
                We invest in any tech-enabled company here.{" "}
                <em className="abt-ser">We concentrate where the state has an edge.</em>
              </h2>
              <p className="abt-body">
                Most of our portfolio sits outside any single sector thesis, and it
                will stay that way. A good company building in Kentucky is a good
                company, whatever it does.
              </p>
              <p className="abt-body">
                But capital is mobile now and infrastructure is not, so the reason
                to be somewhere has to be physical. Kentucky has a handful of those
                reasons, and we weight toward them — because that is where a company
                here beats the same company somewhere else.
              </p>
              <div className="abt-cta">
                <button className="btn g" onClick={() => go("industries")}>
                  The industries
                </button>
                <button className="btn g" onClick={() => go("companies")}>
                  Companies
                </button>
              </div>
            </div>
            <div>
              <p className="lbl">Where we weight</p>
              <div className="abt-weight">
                {WEIGHT.map(([n, t, d]) => (
                  <div className="abt-wrow" key={n}>
                    <span className="abt-wn">{n}</span>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Rv>
      </div>

      {/* In the press */}
      <div className="band abt-press-band">
        <Rv>
          <p className="lbl">In the press</p>
          <div className="abt-press">
            {PRESS.map((r, i) => (
              <a
                className="abt-prow"
                key={`${r.outlet}-${i}`}
                href={r.url}
                target={r.url === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <span className="abt-po">{r.outlet}</span>
                <span className="abt-ph">{r.headline}</span>
                <span className="abt-pd">{r.date}</span>
                <span className="abt-pa">↗</span>
              </a>
            ))}
          </div>
        </Rv>
      </div>

      {/* Team */}
      <div className="band" id="team">

        <Rv>
          <p className="lbl">Team</p>
          <div className="abt-team">
            {PEOPLE.map((p, i) => {
              const img = FOUNDER_PORTRAITS[i % FOUNDER_PORTRAITS.length]!;
              return (
                <button
                  type="button"
                  className="abt-tcard"
                  key={p.name}
                  onClick={() => setOpen(i)}
                >
                  <span className="abt-timg">
                    <img src={img.src} alt={p.name} loading="lazy" />
                    <span className="abt-tover">View profile →</span>
                    <span className="abt-trule" />
                  </span>
                  <span className="abt-tn">{p.name}</span>
                  <span className="abt-tr">{p.role}</span>
                </button>
              );
            })}
          </div>
        </Rv>
      </div>

      {/* The funds */}
      <div className="band abt-thesis-band">
        <Rv>
          <div className="abt-fhead">
            <p className="lbl" style={{ margin: 0 }}>
              The funds
            </p>
            <button className="btn cy" onClick={() => go("apply")}>
              Apply
            </button>
          </div>
          <div className="abt-funds">
            {FUNDS.map(([n, s, d]) => (
              <button
                type="button"
                className="abt-frow"
                key={n}
                onClick={() => go("apply")}
              >
                <b>{n}</b>
                <span className="abt-fs">{s}</span>
                <span className="abt-fd">{d}</span>
                <span className="abt-fa">→</span>
              </button>
            ))}
          </div>
        </Rv>
      </div>

      {/* Affiliation */}
      <div className="band abt-aff-band">
        <Rv>
          <div className="abt-aff">
            <p className="lbl" style={{ margin: 0 }}>
              Affiliation
            </p>
            <p>
              Keyhorse Capital is the venture arm of the Kentucky Science and
              Technology Corporation, and works alongside the Cabinet for Economic
              Development and the KYInnovation network.
            </p>
          </div>
        </Rv>
      </div>

      {/* Closing */}
      <div className="band abt-close">
        <span className="abt-orb" />
        <Rv>
          <h2>Building something exceptional in Kentucky?</h2>
          <p>
            Applications are read by the investment team, not a form. Every founder
            hears back either way.
          </p>
          <div className="abt-cta">
            <button className="btn abt-w" onClick={() => go("apply")}>
              Apply
            </button>
            <button className="btn abt-ow" onClick={() => go("partners")}>
              Talk to us first
            </button>
          </div>
        </Rv>
      </div>

      {open !== null ? (
        <TeamModal p={PEOPLE[open]!} i={open} onClose={() => setOpen(null)} />
      ) : null}
    </section>
  );
}
