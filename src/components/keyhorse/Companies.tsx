import { useEffect, useMemo, useState } from "react";
import raw from "@/data/companies.json";
import { Rv, colorFor, useSite } from "./shared";
import { FOUNDER_PORTRAITS } from "@/lib/images";
import { LogoMark, type Company } from "./CompanyCard";

const ALL = raw as Company[];

const SECTORS = Array.from(
  new Set(ALL.map((c) => c.sector).filter(Boolean)),
).sort();

const ACTIVE = ALL.filter((c) => c.status === "Active").length;
const EXITED = ALL.filter((c) => c.status === "Exited").length;
const TOTAL = ALL.length;

const PAGE = 40;

/* Five featured founders — company records drive sector + colour. */
const FEATURED: { person: string; company: string }[] = [
  { person: "Marcus Ellery", company: "Beltways" },
  { person: "Dana Whitfield", company: "Bexion" },
  { person: "Priya Raman", company: "AquiSense" },
  { person: "Tom Vasquez", company: "BehaVR" },
  { person: "Elise Carter", company: "Biscuit Belly" },
];

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
  const { go } = useSite();
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
          {FEATURED.map((f, i) => {
            const co = findCo(f.company);
            const p = FOUNDER_PORTRAITS[i % FOUNDER_PORTRAITS.length]!;
            const col = colorFor(co?.name || f.company);
            return (
              <figure className="mtile" key={f.person}>
                <img src={p.src} alt={p.alt} loading="lazy" />
                <figcaption>
                  <span className="mn">{f.person}</span>
                  <span className="mc">{co?.display_name || f.company}</span>
                  <span className="ms" style={{ color: col }}>
                    {co?.sector || ""}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Rv>
    </div>
  );
}

export default function Companies() {
  const { openSlide } = useSite();
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
  const [shown, setShown] = useState(PAGE);

  /* Deep link: ?company=Name opens that company's panel on arrival. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("company");
    if (!q) return;
    const target =
      ALL.find((c) => c.display_name.toLowerCase() === q.toLowerCase()) ||
      findCo(q);
    if (target) openSlide(<CompanyPanel c={target} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keep the URL in step so filter state is shareable. */
  useEffect(() => {
    const p = new URLSearchParams();
    if (sector !== "All") p.set("sector", sector);
    if (status !== "All") p.set("status", status);
    const q = p.toString();
    window.history.replaceState({}, "", `/companies${q ? `?${q}` : ""}`);
  }, [sector, status]);

  const list = useMemo(
    () =>
      ALL.filter(
        (c) =>
          (status === "All" || c.status === status) &&
          (sector === "All" || c.sector === sector),
      ),
    [status, sector],
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
            We have funded more than 600 Kentucky companies since 2001. Over 200
            are active today. Every one of them is listed here, alongside the
            ones that exited.
          </p>
          <div className="cstats">
            {[
              ["600+", "funded since 2001"],
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
