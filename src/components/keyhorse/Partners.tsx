import { useState, type FormEvent } from "react";
import { useSite } from "./shared";
import heroBg from "@/assets/hero-factory.jpg";
import textureBg from "@/assets/hero-bluegrass.jpg";
import pAccel from "@/assets/partners/accelerator.jpg";
import pCorp from "@/assets/partners/corporate.jpg";
import pUni from "@/assets/partners/university.jpg";
import routeCargo from "@/assets/hero-cargo.jpg";
import routeFeature from "@/assets/founder-feature.jpg";
import routeAerial from "@/assets/media-aerial.jpg";

const FIGURES = [
  ["40+", "organisations we work with"],
  ["6", "regional front doors"],
  ["209", "active portfolio companies"],
  ["3", "funds deployed with partners"],
] as const;

const WORKING = [
  {
    img: pAccel,
    alt: "Founders working at long tables during an accelerator cohort session",
    cat: "Accelerators & ESOs",
    name: "Regional accelerator programs",
    body: "Discovery Fund capital goes into cohort companies through the programs that found them. Selection stays with the program; we underwrite alongside it.",
    figure: "14 companies backed together",
    color: "#00A8E1",
    mark: "AE",
  },
  {
    img: pCorp,
    alt: "Procurement team and engineers reviewing a pilot on a plant floor",
    cat: "Corporate partners",
    name: "Manufacturing & logistics corporates",
    body: "We match portfolio companies to procurement teams who can buy. Pilots get scoped with a sponsor attached and a real answer at the end.",
    figure: "6 pilots run",
    color: "#E86A2B",
    mark: "CP",
  },
  {
    img: pUni,
    alt: "Graduate researchers at benches in a university laboratory",
    cat: "Universities",
    name: "Commonwealth research institutions",
    body: "Tech transfer offices bring us licensable research early. We help teams turn a disclosure into a company that can raise.",
    figure: "9 spinouts supported",
    color: "#7A5CF0",
    mark: "UN",
  },
] as const;

const NETWORK: Array<[string, string, string[]]> = [
  [
    "Accelerators & ESOs",
    "#00A8E1",
    [
      "XLerateHealth",
      "Awesome Inc",
      "Story Louisville",
      "Kentucky Innovation Hubs",
      "Render Capital programs",
    ],
  ],
  [
    "Universities",
    "#7A5CF0",
    ["University of Kentucky", "University of Louisville", "Western Kentucky University", "Murray State"],
  ],
  [
    "Corporate partners",
    "#E86A2B",
    ["Logistics operators", "Advanced manufacturers", "Health systems", "Utilities & materials"],
  ],
  [
    "Angels & investors",
    "#3F9B45",
    ["Bluegrass Angels", "Queen City Angels", "Regional co-investors", "Sector syndicates"],
  ],
  [
    "State & regional",
    "#C1436B",
    ["KSTC", "Cabinet for Economic Development", "KYInnovation", "Regional front doors"],
  ],
];

type RouteDef = {
  n: string;
  color: string;
  short: string;
  label: string;
  heading: string;
  lead: string;
  get: string[];
  need: string[];
  cta: string;
  img: string;
  alt: string;
};

const ROUTES: RouteDef[] = [
  {
    n: "01",
    color: "#00A8E1",
    short: "You run a program",
    label: "You run a program",
    heading: "Accelerators, incubators and pitch competitions looking for a capital partner.",
    lead: "Discovery Fund capital goes into cohort companies through partner programs rather than around them. You keep the relationship and the selection.",
    get: [
      "Capital into your cohort",
      "Follow-on route into KEF and KSBCI",
      "Co-hosted Venture Sessions",
      "Your programme named in our coverage",
    ],
    need: [
      "A defined cohort with dates",
      "Kentucky-based companies",
      "A selection process we can see",
      "One point of contact",
    ],
    cta: "Start a program conversation",
    img: pAccel,
    alt: "Accelerator cohort session in a converted warehouse",
  },
  {
    n: "02",
    color: "#E86A2B",
    short: "You are a corporate",
    label: "You are a corporate",
    heading: "Pilot partners, procurement teams and corporate venture arms.",
    lead: "The companies we back need first customers more than they need advice. If you can sponsor a pilot, you are more useful than most investors.",
    get: [
      "Early sight of companies in your category",
      "Diligence participation where relevant",
      "Introductions to founders solving your problems",
      "A seat at sector sessions",
    ],
    need: [
      "Someone who can actually sponsor a pilot",
      "A category we can match against",
      "Willingness to give a real answer, fast",
    ],
    cta: "Talk about a pilot",
    img: pCorp,
    alt: "Corporate team reviewing a pilot installation on a plant floor",
  },
  {
    n: "03",
    color: "#7A5CF0",
    short: "You invest",
    label: "You invest",
    heading: "Co-investors and funds looking at the region.",
    lead: "Deal flow access costs nothing and carries no obligation. Look at what is happening here before it is priced like everywhere else.",
    get: [
      "The earliest look at Kentucky rounds",
      "Syndication on deals we lead",
      "The Kentucky Venture Report before it publishes",
      "Introductions to regional co-investors",
    ],
    need: ["Nothing but an interest in the region"],
    cta: "Get on the co-invest list",
    img: routeAerial,
    alt: "Aerial view of a Kentucky industrial corridor",
  },
  {
    n: "04",
    color: "#3F9B45",
    short: "You are an angel",
    label: "You are an angel",
    heading: "Individuals investing their own capital.",
    lead: "Kentucky angel tax credits run up to 40% against state liability. Most people investing here do not claim what they are owed.",
    get: [
      "Access to active syndicates",
      "Guidance on the state angel credit",
      "Sight of companies raising now",
      "Invitations to sessions and demo days",
    ],
    need: ["Accredited investor status", "An interest in Kentucky companies specifically"],
    cta: "Join the angel list",
    img: routeFeature,
    alt: "A founder standing inside their own working facility",
  },
  {
    n: "05",
    color: "#C1436B",
    short: "You might be an LP",
    label: "You might be an LP",
    heading: "Institutions, family offices and prospective limited partners.",
    lead: "Current funds are public capital and not open to outside LPs. Private vehicles are being built, and KVCA is where that conversation will happen.",
    get: [
      "Early notice of private vehicles",
      "The annual report and portfolio data",
      "A view of the region before it is priced",
    ],
    need: ["Patience — this one is genuinely early"],
    cta: "Register interest",
    img: routeCargo,
    alt: "Freighter aircraft loading at a floodlit cargo apron at dusk",
  },
];

const ETA_ROWS: Array<[string, string]> = [
  ["Searchers", "Operators looking to buy and run a Kentucky business."],
  ["Owners planning an exit", "We can point you toward buyers and advisors."],
  ["ETA investors", "Search funds and holding companies active in the region."],
];

function Figures() {
  return (
    <div className="ptband ptfig">
      <div className="wrap">
        <div className="ptfig-grid">
          {FIGURES.map(([n, l]) => (
            <div className="ptfig-cell" key={l}>
              <div className="ptfig-n">{n}</div>
              <div className="ptfig-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Working() {
  return (
    <div className="ptband ptwhite">
      <div className="wrap">
        <p className="lbl">Working partnerships</p>
        <h2 className="pth2">What these actually look like in practice.</h2>
        <div className="ptcards">
          {WORKING.map((c) => (
            <article className="ptcard" key={c.name} style={{ ["--pc" as string]: c.color }}>
              <div className="ptcard-img">
                <span className="ptclip">
                  <img loading="lazy" src={c.img} alt={c.alt} width={1200} height={900} />
                </span>
                <span className="ptcard-mark">{c.mark}</span>
              </div>
              <div className="ptcard-body">
                <p className="ptmono">{c.cat}</p>
                <h3>{c.name}</h3>
                <p className="ptp">{c.body}</p>
                <div className="ptrule" />
                <p className="ptfigline">{c.figure}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Network() {
  return (
    <div className="ptband ptsoft" id="network">
      <div className="wrap">
        <p className="lbl">The network</p>
        <h2 className="pth2">Forty-odd organisations, five kinds of front door.</h2>
        <div className="ptnet">
          {NETWORK.map(([cat, color, names]) => (
            <div className="ptnet-col" key={cat} style={{ ["--pc" as string]: color }}>
              <p className="ptmono">{cat}</p>
              {names.map((n) => (
                <div className="ptnet-row" key={n}>
                  <span className="ptnet-mono">{n.replace(/[^A-Za-z]/g, "").charAt(0)}</span>
                  <span className="ptnet-nm">{n}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BecomePartner() {
  const [i, setI] = useState(0);
  const r = ROUTES[i]!;
  return (
    <div className="ptband ptwhite" id="become">
      <div className="wrap">
        <p className="lbl">Become a partner</p>
        <h2 className="pth2">Five ways in. Pick the one that describes you.</h2>
        <div className="ptroutes" style={{ ["--pc" as string]: r.color }}>
          <div className="ptroute-list" role="tablist" aria-label="Partner routes">
            {ROUTES.map((x, idx) => (
              <button
                key={x.n}
                role="tab"
                aria-selected={idx === i}
                className={`ptroute${idx === i ? " on" : ""}`}
                style={{ ["--pc" as string]: x.color }}
                onClick={() => setI(idx)}
              >
                <span className="ptroute-n">{x.n}</span>
                <span className="ptroute-t">{x.short}</span>
              </button>
            ))}
          </div>

          <div className="ptdetail" key={r.n}>
            <div className="ptduo">
              <img loading="lazy" src={r.img} alt={r.alt} />
              <span className="ptduo-wash" />
            </div>
            <div className="ptdetail-body">
              <h3>{r.heading}</h3>
              <p className="ptp">{r.lead}</p>
              <div className="ptcols">
                <div>
                  <p className="ptmono pc">What you get</p>
                  <ul className="ptlist">
                    {r.get.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="ptmono pc">What we need</p>
                  <ul className="ptlist">
                    {r.need.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="ptbtns">
                <a className="ptbtn solid" href="#enquiry">
                  {r.cta}
                </a>
                <a className="ptbtn out" href="#network">
                  See the network
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ETA() {
  return (
    <div className="ptband ptwhite">
      <div className="wrap ptteo">
        <div>
          <p className="lbl">Entrepreneurship through acquisition</p>
          <h2 className="pth2">
            Roughly 190,000 Kentucky business owners are expected to retire within ten years, against{" "}
            <em className="ptem">one search-fund deal closed in 2024</em>.
          </h2>
          <p className="ptp" style={{ marginTop: 14, maxWidth: "54ch" }}>
            Seventy-nine percent of them have no succession plan. That is a large pool of profitable
            companies with nobody lined up to run them.
          </p>
          <p className="ptp" style={{ maxWidth: "54ch" }}>
            This is a gap rather than a fund we run. If you are working on it from any side, we would
            like to know you.
          </p>
        </div>
        <div className="pteta">
          {ETA_ROWS.map(([t, d]) => (
            <a className="pteta-row" href="#enquiry" key={t}>
              <span>
                <b>{t}</b>
                <span className="pteta-d">{d}</span>
              </span>
              <span className="pteta-ar" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Enquiry() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="ptband ptcyan" id="enquiry">
      <span className="ptcyan-orb" aria-hidden="true" />
      <div className="wrap ptenq">
        <div>
          <h2 className="pth2 ptw">Tell us which one you are.</h2>
          <p className="ptp ptw-s" style={{ maxWidth: "44ch", marginTop: 14 }}>
            One form, one reply, from a person. If it is not a fit we will say so and point you
            somewhere that is.
          </p>
          <p className="ptmono ptw-s" style={{ marginTop: 18 }}>
            partners@keyhorse.vc
          </p>
        </div>
        <form className="ptform" onSubmit={submit}>
          <label>
            <span className="ptmono">Name</span>
            <input required name="name" autoComplete="name" />
          </label>
          <label>
            <span className="ptmono">Organisation</span>
            <input required name="org" autoComplete="organization" />
          </label>
          <label>
            <span className="ptmono">Email</span>
            <input required type="email" name="email" autoComplete="email" />
          </label>
          <label>
            <span className="ptmono">Which one are you</span>
            <select name="route" defaultValue={ROUTES[0]!.label}>
              {ROUTES.map((r) => (
                <option key={r.n}>{r.label}</option>
              ))}
              <option>Something else</option>
            </select>
          </label>
          <button className="ptsubmit" type="submit">
            {sent ? "Thank you — we will reply" : "Send enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Partners() {
  const { jump } = useSite();
  return (
    <section className="page on ptpage">
      <img className="pttexture" src={textureBg} alt="" aria-hidden="true" />

      <div className="pthero">
        <img className="pthero-img" src={heroBg} alt="" aria-hidden="true" />
        <span className="pthero-glow" aria-hidden="true" />
        <div className="wrap pthero-in">
          <p className="lbl ptw-s">Partners</p>
          <h1 className="pthero-h">
            Kentucky does not get built by <em className="ptem-cy">one firm</em>.
          </h1>
          <p className="pthero-lede">
            We invest through accelerators, alongside angels, and next to corporates who can actually
            buy from the companies we back. Most of what happens here happens because somebody else
            brought it to us first.
          </p>
          <div className="ptbtns">
            <a className="ptbtn cy" href="#become" onClick={() => jump("become")}>
              Become a partner
            </a>
            <a className="ptbtn outline-light" href="#network" onClick={() => jump("network")}>
              See the network
            </a>
          </div>
        </div>
      </div>

      <Figures />
      <Working />
      <Network />
      <BecomePartner />
      <ETA />
      <Enquiry />
    </section>
  );
}
