/** Media page content. Edit here — no component changes needed. */

export const KH = "https://www.keyhorse.vc";

/** The open cycle. Update quarterly. */
export const CYCLE = {
  kicker: "Investment Cycle · Open now",
  status: "OPEN · 10 AUG – 30 SEP 2026",
  headline: "The Q3 2026 investment cycle is open through 30 September.",
  standfirst:
    "Keyhorse Capital, an initiative of Kentucky Science and Technology Corporation in partnership with the Kentucky Cabinet for Economic Development, is accepting applications from eligible Kentucky companies.",
  slug: "keyhorse-capital-launches-2026-q3-investment-cycle-for-eligible-kentucky-companies",
};

export type Round = {
  /** ISO date — used for sorting and the year filter. */
  date: string;
  company: string;
  city: string;
  sector: string;
  amount: string;
  stage: string;
  /** Outlet that reported it. External link, new tab. */
  outlet: string;
  outletUrl: string;
  /** When we covered it ourselves, the on-site article slug. */
  slug?: string;
};

const LBF = "https://www.bizjournals.com/louisville";
const HL = "https://www.kentucky.com";
const NKYT = "https://nkytribune.com";
const AXIOS = "https://www.axios.com/local/louisville";
const TC = "https://techcrunch.com";
/** Rounds we broke ourselves — announced on the Keyhorse Capital Instagram. */
const KH_IG = "https://www.instagram.com/keyhorsecapital";

export const ROUNDS: Round[] = [
  { date: "2026-07-22", company: "Illume", city: "Louisville", sector: "Health & Care", amount: "$2.4M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-ben-wolber-illume" },
  { date: "2026-07-09", company: "Beltways", city: "Hebron", sector: "Logistics & Trade", amount: "$4.2M", stage: "Seed", outlet: "NKY Tribune", outletUrl: NKYT, slug: "founding-stories-john-yuksel-of-beltways" },
  { date: "2026-06-25", company: "Proximity", city: "Louisville", sector: "Logistics & Trade", amount: "$3.1M", stage: "Seed", outlet: "Axios Louisville", outletUrl: AXIOS, slug: "keyhorse-founding-stories-grant-murray-of-proximity" },
  { date: "2026-06-11", company: "VerityXR", city: "Lexington", sector: "Health & Care", amount: "$1.6M", stage: "Pre-seed", outlet: "Lexington Herald-Leader", outletUrl: HL, slug: "founding-stories-shiva-rallapalli-of-verityxr" },
  { date: "2026-05-28", company: "AquiSense", city: "Erlanger", sector: "Energy, Materials & Climate", amount: "$14M", stage: "Series B", outlet: "TechCrunch", outletUrl: TC, slug: "founding-stories-oliver-lawal-of-aquisense" },
  { date: "2026-05-14", company: "DataRovers", city: "Louisville", sector: "Health & Care", amount: "$2.0M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-jawad-popalzai-of-datarovers" },
  { date: "2026-04-30", company: "Forecastr", city: "Louisville", sector: "Software", amount: "$6.5M", stage: "Series A", outlet: "Axios Louisville", outletUrl: AXIOS, slug: "behind-the-scenes-inside-forecastrs-approach-to-founder-led-scaling-with-logan-burchett" },
  { date: "2026-04-16", company: "Virtual Peaker", city: "Louisville", sector: "Energy, Materials & Climate", amount: "$18M", stage: "Series B", outlet: "TechCrunch", outletUrl: TC, slug: "dr-william-burke-of-virtual-peaker" },
  { date: "2026-03-27", company: "Resonate Recordings", city: "Louisville", sector: "Consumer", amount: "$1.2M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-ellie-puckett-of-resonate-recordings" },
  { date: "2026-03-12", company: "Rhiza Health", city: "Lexington", sector: "Health & Care", amount: "$900K", stage: "Pre-seed", outlet: "Lexington Herald-Leader", outletUrl: HL, slug: "founding-stories-kyle-culver-of-rhiza-health" },
  { date: "2026-02-26", company: "Flamel.ai", city: "Louisville", sector: "Software", amount: "$2.8M", stage: "Seed", outlet: "Axios Louisville", outletUrl: AXIOS, slug: "founding-stories-paul-ehlinger-of-flamel-ai" },
  { date: "2026-02-05", company: "Ecoshell", city: "Bowling Green", sector: "Advanced Manufacturing & Automotive", amount: "$1.5M", stage: "Seed", outlet: "NKY Tribune", outletUrl: NKYT, slug: "founding-stories-andrew-bliss-of-ecoshell" },
  { date: "2026-01-22", company: "River Guide", city: "Louisville", sector: "Logistics & Trade", amount: "$2.2M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-kela-ivonye-of-river-guide" },
  { date: "2026-01-08", company: "Advanced Energy Materials", city: "Louisville", sector: "Energy, Materials & Climate", amount: "$4.8M", stage: "Series A", outlet: "TechCrunch", outletUrl: TC, slug: "founding-stories-vasanthi-sunkara-of-advanced-energy-materials" },
  { date: "2025-12-11", company: "Bexion", city: "Covington", sector: "Health & Care", amount: "$12M", stage: "Series B", outlet: "Keyhorse Capital", outletUrl: KH_IG },
  { date: "2025-11-20", company: "Cloverleaf", city: "Covington", sector: "Software", amount: "$8M", stage: "Series A", outlet: "Axios Louisville", outletUrl: AXIOS },
  { date: "2025-11-06", company: "Kanbol", city: "Lexington", sector: "Logistics & Trade", amount: "$1.1M", stage: "Pre-seed", outlet: "Keyhorse Capital", outletUrl: KH_IG, slug: "founding-stories-miles-leach-of-kanbol" },
  { date: "2025-10-16", company: "Revolution RE", city: "Louisville", sector: "Software", amount: "$3.4M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-elizabeth-braman-of-revolution-re" },
  { date: "2025-09-25", company: "The Nori Project", city: "Lexington", sector: "Health & Care", amount: "$750K", stage: "Pre-seed", outlet: "Lexington Herald-Leader", outletUrl: HL, slug: "founding-stories-dr-anora-mortin-of-the-nori-project" },
  { date: "2025-09-04", company: "Due Gooder", city: "Louisville", sector: "Software", amount: "$1.3M", stage: "Seed", outlet: "Axios Louisville", outletUrl: AXIOS, slug: "founding-stories-nate-royal-of-due-gooder" },
  { date: "2025-08-14", company: "BioGlitz", city: "Louisville", sector: "Consumer", amount: "$800K", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-saba-gray-of-bioglitz" },
  { date: "2025-07-24", company: "PONTIS", city: "Lexington", sector: "Health & Care", amount: "$650K", stage: "Pre-seed", outlet: "Lexington Herald-Leader", outletUrl: HL, slug: "founding-stories-lekha-challappa-of-pontis-psycholinguistics" },
  { date: "2025-06-19", company: "Garnet Gazelle", city: "Louisville", sector: "Consumer", amount: "$1.0M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF, slug: "founding-stories-zachary-hill-of-garnet-gazelle-aims-to-revolutionize-the-online-auction-industry" },
  { date: "2025-05-29", company: "Bourbon Barrel Analytics", city: "Bardstown", sector: "Agriculture & Food", amount: "$2.6M", stage: "Seed", outlet: "Keyhorse Capital", outletUrl: KH_IG },
  { date: "2025-04-17", company: "Blue Grass Robotics", city: "Georgetown", sector: "Advanced Manufacturing & Automotive", amount: "$5.2M", stage: "Series A", outlet: "TechCrunch", outletUrl: TC },
  { date: "2025-03-13", company: "Worldport Systems", city: "Louisville", sector: "Logistics & Trade", amount: "$3.9M", stage: "Seed", outlet: "Louisville Business First", outletUrl: LBF },
  { date: "2025-02-20", company: "Ohio Valley Grid", city: "Owensboro", sector: "Energy, Materials & Climate", amount: "$2.1M", stage: "Seed", outlet: "Keyhorse Capital", outletUrl: KH_IG },
  { date: "2025-01-23", company: "Cumberland Care", city: "Somerset", sector: "Health & Care", amount: "$1.4M", stage: "Pre-seed", outlet: "Lexington Herald-Leader", outletUrl: HL },
  { date: "2024-12-05", company: "Derby Freight", city: "Louisville", sector: "Logistics & Trade", amount: "$2.9M", stage: "Seed", outlet: "Axios Louisville", outletUrl: AXIOS },
  { date: "2024-10-24", company: "Fescue Ag", city: "Hopkinsville", sector: "Agriculture & Food", amount: "$1.7M", stage: "Seed", outlet: "Keyhorse Capital", outletUrl: KH_IG },
  { date: "2024-09-12", company: "Kentucky Additive", city: "Lexington", sector: "Advanced Manufacturing & Automotive", amount: "$3.3M", stage: "Series A", outlet: "TechCrunch", outletUrl: TC },
  { date: "2024-07-18", company: "Falls City Health", city: "Louisville", sector: "Health & Care", amount: "$4.1M", stage: "Series A", outlet: "Louisville Business First", outletUrl: LBF },
];

export const ROUND_SECTORS = Array.from(new Set(ROUNDS.map((r) => r.sector))).sort();
export const ROUND_YEARS = Array.from(new Set(ROUNDS.map((r) => r.date.slice(0, 4)))).sort(
  (a, b) => Number(b) - Number(a),
);

/** Instagram / LinkedIn snapshot panels. */
export type SocialPanel = {
  id: "instagram" | "linkedin";
  name: string;
  handle: string;
  followers: string;
  blurb: string;
  url: string;
  tiles: string[];
};

export const SOCIAL: SocialPanel[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@keyhorsecapital",
    followers: "4,180 followers",
    blurb: "Founders, portfolio moments and the Commonwealth as we find it.",
    url: "https://www.instagram.com/keyhorsecapital",
    tiles: [
      "Q3 cycle opens",
      "Inside Worldport",
      "Founding Stories: Illume",
      "Demo day, Lexington",
      "On the road: Paducah",
      "Team offsite",
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "/company/keyhorse",
    followers: "9,640 followers",
    blurb: "Company news, portfolio milestones and where our founders are hiring.",
    url: "https://www.linkedin.com/company/keyhorse",
    tiles: [
      "Q3 2026 cycle open",
      "Forecastr Series A",
      "AquiSense scales UV-C",
      "Hiring across the portfolio",
      "BIP Ventures ranking",
      "Behind the Scenes: Flamel.ai",
    ],
  },
];

export const SOCIAL_ROWS = [
  {
    name: "X",
    handle: "@keyhorsevc",
    meta: "2,310 followers",
    url: "https://twitter.com/keyhorsevc",
  },
  { name: "YouTube", handle: "Coming soon", meta: "Interviews and sessions", url: "" },
] as const;

/** Ecosystem calendar. ISO dates drive the month grid. */
export type CalEvent = {
  date: string;
  title: string;
  venue: string;
  type: string;
  own: boolean;
  url?: string;
};

export const EVENTS: CalEvent[] = [
  { date: "2026-08-12", title: "Office hours — Louisville", venue: "Story Louisville", type: "Keyhorse", own: true },
  { date: "2026-08-20", title: "5 Across Pitch Competition", venue: "Awesome Inc, Lexington", type: "Pitch competition", own: false, url: "https://awesomeinc.org" },
  { date: "2026-08-27", title: "Office hours — Lexington", venue: "Awesome Inc", type: "Keyhorse", own: true },
  { date: "2026-09-03", title: "Founder breakfast", venue: "Northern Kentucky", type: "Keyhorse", own: true },
  { date: "2026-09-11", title: "Venture Connectors luncheon", venue: "Louisville", type: "Ecosystem", own: false, url: "https://ventureconnectors.org" },
  { date: "2026-09-18", title: "KY Innovation Summit", venue: "Covington", type: "Ecosystem", own: false, url: "https://kyinnovation.com" },
  { date: "2026-09-30", title: "Q3 investment cycle closes", venue: "Statewide", type: "Keyhorse", own: true },
  { date: "2026-10-08", title: "Portfolio CEO roundtable", venue: "Lexington", type: "Keyhorse", own: true },
  { date: "2026-10-22", title: "Bourbon & Bytes", venue: "Bardstown", type: "Ecosystem", own: false, url: "https://kyinnovation.com" },
];

export const COVERAGE = [
  {
    outlet: "BIP Ventures",
    title:
      "State of Startups in the Southeast 2025 names Keyhorse third most active VC fund in the region",
    headline: "Keyhorse named the ",
    mark: "third most active",
    headlineEnd: " VC fund in the Southeast.",
    source: "State of Startups",
    date: "Oct 2025",
    url: "https://www.bipventures.vc/state-of-startups/2025#states",
  },
  {
    outlet: "NVCA",
    title: "Kentucky venture capital state data — NVCA Yearbook figures",
    date: "Dec 2024",
    url: "https://nvca.org/wp-content/uploads/2024/12/Kentucky-VC-State-Data.pdf",
  },
  {
    outlet: "Visible.vc",
    title: "The top venture capital firms in Kentucky",
    date: "2025",
    url: "https://visible.vc/blog/top-vc-firms-kentucky/",
  },
  {
    outlet: "Revolution",
    title: "Revolution — Investment overview and portfolio materials",
    date: "TBC",
    url: "https://revolution.docsend.com/view/jbqah9ydus8djd9m",
  },

  {
    outlet: "[Outlet]",
    title: "[Placeholder — coverage headline to be added]",
    date: "TBC",
    url: "",
  },
] as const;
