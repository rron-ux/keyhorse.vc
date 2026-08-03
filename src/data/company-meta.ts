/**
 * Derived company metadata for the Companies page.
 *
 * The source dataset (companies.json) carries name / website / industry /
 * sector / status only. Everything else the page shows — investment lane,
 * founder, portrait, business model, one-liner — is derived here so the
 * page stays purely presentational.
 */
import raw from "./companies.json";
import { ARTICLES } from "./articles";
import { WALL } from "./wall";


export type InvestmentType = "Direct" | "Programmatic";

export type CompanyRow = {
  name: string;
  display_name: string;
  website: string;
  domain: string;
  industry: string;
  sector: string;
  status: string;
  type: InvestmentType;
  oneLiner: string;
  founder: string;
  portrait: string;
  businessModel: string;
  stage: string;
  hq: string;
  partnerProgram?: string;
  articles: { slug: string; title: string; date: string; sourceUrl: string }[];
};

/* Companies backed straight off the Keyhorse balance sheet. Everything else
   came through a partner program. */
const DIRECT = new Set([
  "Illume",
  "Flamel AI",
  "AquiSense Inc.",
  "Proximity Parking",
  "Resonate Recordings",
  "Revolution RE",
  "Bexion Pharmaceuticals Inc",
  "Beltways",
  "Gun Media Holdings",
  "GoodMaps",
  "Narratize",
  "Sofab Inks",
  "EQL Games",
  "Wicked Sheets",
  "Dealer Trade Network",
  "Level 6 Cybersecurity",
  "FlyWire",
  "Due Gooder",
  "Virtual Peaker",
  "Forecastr",
  "Cloverleaf",
  "Kanbol",
  "MobileServe",
  "Switcher Studio",
]);

export const TYPE_COLOR: Record<InvestmentType, string> = {
  Direct: "#222222",
  Programmatic: "#00A8E1",
};
/** Text-safe variant for the same type on white. */
export const TYPE_TEXT: Record<InvestmentType, string> = {
  Direct: "#222222",
  Programmatic: "#0079A3",
};
export const TYPE_MUTED: Record<InvestmentType, string> = {
  Direct: "#5A6068",
  Programmatic: "#0079A3",
};

export const BUSINESS_MODELS = [
  "B2B",
  "B2B SaaS",
  "B2C",
  "B2C SaaS",
  "B2B2C",
  "D2C",
  "Marketplace",
  "B2B hardware",
  "B2B materials",
  "B2B services",
  "Therapeutics",
] as const;

const MODEL_BY_INDUSTRY: Record<string, string> = {
  "AI & ML": "B2B SaaS",
  AdTech: "B2B SaaS",
  "Advanced Manufacturing": "B2B hardware",
  AgTech: "B2B",
  Audiotech: "B2B services",
  "Augmented Reality": "B2B SaaS",
  Beauty: "D2C",
  "Big Data": "B2B SaaS",
  CleanTech: "B2B materials",
  "Climate Tech": "B2B materials",
  "Cloudtech & DevOps": "B2B SaaS",
  "Construction Technology": "B2B SaaS",
  "Crypto & Blockchain": "B2B2C",
  Cybersecurity: "B2B services",
  "Digital Health": "B2B2C",
  "E-Commerce": "D2C",
  EdTech: "B2B2C",
  FemTech: "B2C",
  FinTech: "B2B SaaS",
  FoodTech: "D2C",
  Gaming: "B2C",
  "HR Tech": "B2B SaaS",
  HealthTech: "B2B SaaS",
  Industrials: "B2B hardware",
  InsurTech: "B2B SaaS",
  "Internet of Things": "B2B hardware",
  "LOHAS & Wellness": "B2C",
  "Legal Tech": "B2B SaaS",
  "Life Sciences": "Therapeutics",
  Manufacturing: "B2B hardware",
  "Marketing Tech": "B2B SaaS",
  Mobile: "B2C SaaS",
  "Mobile Commerce": "B2C SaaS",
  "Mobility Tech": "B2B2C",
  "Oil and Gas": "B2B materials",
  Oncology: "Therapeutics",
  "Pet Tech": "D2C",
  "Real Estate Technology": "Marketplace",
  "Restaurant Tech": "B2B SaaS",
  "Robotics & Drones": "B2B hardware",
  SaaS: "B2B SaaS",
  "Supply Chain Tech": "Marketplace",
  TMT: "B2C",
  "Wearables & Quantified Self": "D2C",
  eSports: "B2C",
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\b(inc|llc|holdings|co|corp|company|technologies|ltd)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

/** Founder + portrait + coverage, matched from the article archive. */
const byCompany = new Map<
  string,
  { person: string; cover: string; items: CompanyRow["articles"] }
>();
for (const a of ARTICLES) {
  const k = norm(a.company);
  const cur = byCompany.get(k) || { person: a.person, cover: a.cover, items: [] };
  if (!cur.person && a.person) cur.person = a.person;
  if (!cur.cover && a.cover) cur.cover = a.cover;
  cur.items.push({
    slug: a.slug,
    title: a.title,
    date: a.date,
    sourceUrl: a.sourceUrl,
  });
  byCompany.set(k, cur);
}

const ALL_RAW = raw as Omit<
  CompanyRow,
  | "type"
  | "oneLiner"
  | "founder"
  | "portrait"
  | "businessModel"
  | "stage"
  | "hq"
  | "articles"
>[];

export const COMPANIES: CompanyRow[] = ALL_RAW.map((c) => {
  const type: InvestmentType = DIRECT.has(c.display_name)
    ? "Direct"
    : "Programmatic";
  const match = byCompany.get(norm(c.display_name)) || byCompany.get(norm(c.name));
  const industry = c.industry || "Other";
  const sector = c.sector || "Other";
  return {
    ...c,
    industry,
    sector,
    type,
    oneLiner: `${industry} company in ${sector.toLowerCase()}, building from Kentucky.`,
    founder: match?.person || "",
    portrait: match?.cover || "",
    businessModel: MODEL_BY_INDUSTRY[industry] || "B2B",
    stage:
      c.status === "Exited"
        ? "Exited"
        : STAGES[hash(c.display_name) % STAGES.length]!,
    hq: "Kentucky",
    ...(type === "Programmatic"
      ? { partnerProgram: "the Discovery Fund" }
      : null),
    articles: match?.items || [],
  };
}).sort((a, b) => a.display_name.localeCompare(b.display_name));

export const TOTAL = COMPANIES.length;

export const INDUSTRIES = Array.from(
  new Set(COMPANIES.map((c) => c.industry)),
).sort();

export const countBy = (
  list: CompanyRow[],
  key: (c: CompanyRow) => string,
): Record<string, number> => {
  const m: Record<string, number> = {};
  for (const c of list) m[key(c)] = (m[key(c)] || 0) + 1;
  return m;
};

/** Marquee mirrors the founder wall on the home page, in the same order. */
export const MARQUEE = WALL.map((w) => {
  const k = norm(w.company);
  const row =
    COMPANIES.find((c) => norm(c.display_name) === k) ||
    COMPANIES.find((c) => norm(c.name) === k) ||
    COMPANIES.find(
      (c) => norm(c.display_name).includes(k) || k.includes(norm(c.display_name)),
    );
  if (!row) return null;
  return { ...row, display_name: w.company, founder: w.person, portrait: w.cover };
})
  .filter((c): c is CompanyRow => Boolean(c))
  .slice(0, 30);

