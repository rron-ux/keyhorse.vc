import { useEffect, useMemo, useState } from "react";
import raw from "@/data/companies.json";
import { ARTICLES } from "@/data/articles";
import { Rv, colorFor, useSite } from "./shared";
import { LogoMark, type Company } from "./CompanyCard";

const ALL = raw as Company[];

/* Direct investments — companies Keyhorse backed straight off its own balance
   sheet. Everything else came through a programmatic partner. */
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

const laneOf = (c: Company) =>
  DIRECT.has(c.display_name) ? "Direct" : "Programmatic";

type Lane = "Direct" | "Programmatic";

const SECTORS = Array.from(
  new Set(ALL.map((c) => c.sector).filter(Boolean)),
).sort();

const ACTIVE = ALL.filter((c) => c.status === "Active").length;
const EXITED = ALL.filter((c) => c.status === "Exited").length;
const TOTAL = ALL.length;
const DIRECT_N = ALL.filter((c) => laneOf(c) === "Direct").length;

const PAGE = 40;

/* Six founder stories — portrait links straight through to the article. */
const FEATURED_COMPANIES = [
  "Illume",
  "Flamel.ai",
  "AquiSense",
  "Proximity",
  "Resonate Recordings",
  "Revolution RE",
];

const FEATURED = FEATURED_COMPANIES.map((name) =>
  ARTICLES.find((a) => a.company === name && a.category === "stories"),
).filter(Boolean) as (typeof ARTICLES)[number][];

const findCo = (q: string) =>
  ALL.find((c) => c.display_name.toLowerCase().startsWith(q.toLowerCase()));


function CompanyPanel({ c }: { c: Company }) {
  return (
    <div className="bd cpanel">
      <div className="cpanel-mark">
        <LogoMark c={c} size={92} plate />
      </div>
      <h3>{c.display_name}</h3>
      <div className="role" style={{ color: "var(--cyan)" }}>
        {c.status}
      </div>
      {c.description ? (
        <p style={{ color: "var(--kh-muted)", fontSize: 13.5 }}>
          {c.description}
        </p>
      ) : null}
      {c.sector ? (
        <div className="kv">
          <span>Primary sector</span>
          <span>{c.sector}</span>
        </div>
      ) : null}
      {c.industry ? (
        <div className="kv">
          <span>Industry</span>
          <span>{c.industry}</span>
        </div>
      ) : null}
      {c.website ? (
        <div className="kv">
          <span>Website</span>
          <span>{c.domain}</span>
        </div>
      ) : null}
      {c.website ? (
        <div style={{ marginTop: 24, display: "flex", gap: 9 }}>
          <a
            className="btn g"
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit site
          </a>
        </div>
      ) : null}
    </div>
  );
}

function Mosaic() {
  const { go, openPost } = useSite();
  return (
    <div className="band">
      <Rv>
        <div className="mosaic-head">
          <p className="lbl">The people building it</p>
          <button className="mosaic-all" onClick={() => go("media")}>
            All features →
          </button>
        </div>
        <div className="mosaic">
          {FEATURED.map((a) => {
            const co = findCo(a.company);
            const col = colorFor(co?.name || a.company);
            return (
              <button
                type="button"
                className="mtile"
                key={a.slug}
                onClick={() => openPost(a.slug)}
              >
                <img
                  src={a.cover}
                  alt={`${a.person}, founder of ${a.company}`}
                  loading="lazy"
                />
                <figcaption>
                  <span className="mn">{a.person}</span>
                  <span className="mc">{co?.display_name || a.company}</span>
                  <span className="ms" style={{ color: col }}>
                    {co?.sector || ""}
                  </span>
                </figcaption>
              </button>
            );
          })}
        </div>
      </Rv>
    </div>
  );
}


export default function Companies() {
  const { openSlide, pendingCompany } = useSite();
  const [status, setStatus] = useState(() => {
    if (typeof window === "undefined") return "All";
    const q = new URLSearchParams(window.location.search).get("status");
    return q === "Active" || q === "Exited" ? q : "All";
  });
  const [sector, setSector] = useState(() => {
    if (typeof window === "undefined") return "All";
    const q = new URLSearchParams(window.location.search).get("sector");
    return q && SECTORS.includes(q) ? q : "All";
  });
  const [lane, setLane] = useState<Lane>(() => {
    if (typeof window === "undefined") return "Direct";
    const q = new URLSearchParams(window.location.search).get("lane");
    return q === "Programmatic" ? "Programmatic" : "Direct";
  });
  const [shown, setShown] = useState(PAGE);


  /* Deep link: ?company=Name opens that company's panel on arrival. */
  useEffect(() => {
    if (!pendingCompany) return;
    const target =
      ALL.find(
        (c) => c.display_name.toLowerCase() === pendingCompany.toLowerCase(),
      ) || findCo(pendingCompany);
    openSlide(
      <CompanyPanel
        c={
          target ||
          ({ display_name: pendingCompany, name: pendingCompany } as Company)
        }
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCompany]);

  /* Keep the URL in step so filter state is shareable. */
  useEffect(() => {
    const p = new URLSearchParams();
    p.set("lane", lane);
    if (sector !== "All") p.set("sector", sector);
    if (status !== "All") p.set("status", status);
    /* Preserve the deep-link company so a remount can still resolve it. */
    const co = new URLSearchParams(window.location.search).get("company");
    if (co) p.set("company", co);
    const q = p.toString();
    window.history.replaceState({}, "", `/companies${q ? `?${q}` : ""}`);
  }, [sector, status, lane]);

  const list = useMemo(
    () =>
      ALL.filter(
        (c) =>
          laneOf(c) === lane &&
          (status === "All" || c.status === status) &&
          (sector === "All" || c.sector === sector),
      ),
    [status, sector, lane],
  );

  const pick = (set: (v: string) => void) => (v: string) => {
    set(v);
    setShown(PAGE);
  };


  return (
    <section className="page on">
      <div className="chead">
        <div className="wrap">
          <h1>Companies</h1>
          <p className="lede">
            We invest in two lanes: directly from our own funds, and
            programmatically alongside partner programs. More than 600 Kentucky
            companies have been funded since 2001, and every one of them is
            listed here, alongside the ones that exited.
          </p>
          <div className="cstats">
            {[
              ["600+", "funded since 2001"],
              [String(DIRECT_N), "direct investments"],
              [String(ACTIVE), "active today"],
              [String(EXITED), "exited"],
              [String(SECTORS.length), "sectors"],
            ].map(([n, l]) => (

              <div key={l} className="cstat">
                <div className="n">{n}</div>
                <div className="l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Mosaic />

      <div className="band">
        <Rv>
          <div className="cfilters">
            <div className="cfrow">
              <div className="filters">
                {["All", "Active", "Exited"].map((s) => (
                  <button
                    key={s}
                    className="chip"
                    aria-pressed={status === s}
                    onClick={() => pick(setStatus)(s)}
                  >
                    {s}
                  </button>
                ))}
                {["All", ...SECTORS].map((s) => (
                  <button
                    key={`sec-${s}`}
                    className="chip"
                    aria-pressed={sector === s}
                    onClick={() => pick(setSector)(s)}
                  >
                    {s === "All" ? "All sectors" : s}
                  </button>
                ))}
              </div>
              <span className="cfcount">
                {list.length} shown · {TOTAL} total
              </span>
            </div>
          </div>

          <div className="ctable">
            <div className="chrow chhead">
              <span>Company</span>
              <span>Sector</span>
              <span>Industry</span>
              <span>Status</span>
              <span />
            </div>
            {list.slice(0, shown).map((c) => {
              const col = colorFor(c.name);
              return (
                <button
                  type="button"
                  key={`${c.name}-${c.domain}`}
                  className="chrow crow"
                  style={{ ["--cc" as string]: col }}
                  onClick={() => openSlide(<CompanyPanel c={c} />)}
                >
                  <span className="cname">
                    <LogoMark c={c} size={26} />
                    <b>{c.display_name}</b>
                  </span>
                  <span className="csec">{c.sector}</span>
                  <span className="cind">{c.industry}</span>
                  <span className={`cst${c.status === "Exited" ? " ex" : ""}`}>
                    {c.status}
                  </span>
                  <span className="car">→</span>
                </button>
              );
            })}
          </div>

          {shown < list.length ? (
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button className="btn" onClick={() => setShown((n) => n + PAGE)}>
                Load more
              </button>
            </div>
          ) : null}
        </Rv>
      </div>
    </section>
  );
}
