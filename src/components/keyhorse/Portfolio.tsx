import { useEffect, useMemo, useRef, useState } from "react";
import raw from "@/data/companies.json";
import { Head } from "./shared";

type Row = {
  company: string;
  industry: string;
  vertical: string;
  one_liner: string;
  website: string;
  status: string;
  verified?: string;
};

const ROWS = raw as Row[];

/** Fixed pill order. "All" first, then the industries as written in the data. */
export const INDUSTRY_ORDER = [
  "Health & Life Sciences",
  "Software & AI",
  "Consumer & Media",
  "Business & Professional",
  "Agriculture, Food & Beverage",
  "Energy, Materials & Climate",
  "Manufacturing & Industrials",
  "Logistics & Mobility",
];

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const initials = (name: string) => {
  const parts = name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const joined = parts.join(" ").replace(/ /g, "");
  if (!parts.length || !joined) return "—";
  if (parts.length === 1) return joined.slice(0, 2).toUpperCase();
  return `${joined[0]}${(parts[1] ?? "")[0] ?? ""}`.toUpperCase();
};

export default function Portfolio() {
  const [industry, setIndustry] = useState("All");
  const [vertical, setVertical] = useState("All verticals");
  const [status, setStatus] = useState("All");
  const [q, setQ] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  /* Read shareable params on mount. */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const iSlug = p.get("industry");
    const vSlug = p.get("vertical");
    let nextIndustry = "All";
    if (iSlug) {
      const hit = INDUSTRY_ORDER.find((i) => slug(i) === iSlug);
      if (hit) nextIndustry = hit;
    }
    setIndustry(nextIndustry);
    if (vSlug) {
      const pool = ROWS.filter(
        (r) => nextIndustry === "All" || r.industry === nextIndustry,
      );
      const hit = pool.find((r) => slug(r.vertical) === vSlug);
      if (hit) setVertical(hit.vertical);
    }
    if (iSlug || vSlug) {
      requestAnimationFrame(() =>
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
    mounted.current = true;
  }, []);

  /* Keep the URL in sync without polluting history. */
  useEffect(() => {
    if (!mounted.current) return;
    const p = new URLSearchParams(window.location.search);
    if (industry === "All") p.delete("industry");
    else p.set("industry", slug(industry));
    if (vertical === "All verticals") p.delete("vertical");
    else p.set("vertical", slug(vertical));
    const s = p.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (s ? `?${s}` : ""),
    );
  }, [industry, vertical]);

  /* Verticals come from the records visible under the current industry. */
  const verticals = useMemo(() => {
    const set = new Set<string>();
    ROWS.forEach((r) => {
      if (industry === "All" || r.industry === industry) {
        if (r.vertical) set.add(r.vertical);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [industry]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ROWS.filter((r) => {
      if (industry !== "All" && r.industry !== industry) return false;
      if (vertical !== "All verticals" && r.vertical !== vertical) return false;
      if (status === "Active" && r.status !== "Active") return false;
      if (status === "Exits" && r.status !== "Exit") return false;
      if (needle) {
        const hay = `${r.company} ${r.vertical} ${r.one_liner}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    }).sort((a, b) => a.company.localeCompare(b.company));
  }, [industry, vertical, status, q]);

  const sections =
    industry === "All"
      ? INDUSTRY_ORDER.map((name) => ({
          name,
          rows: results.filter((r) => r.industry === name),
        })).filter((s) => s.rows.length)
      : [{ name: "", rows: results }];

  const pickVertical = (v: string) => {
    setIndustry("All");
    setVertical(v);
  };

  return (
    <section className="page on pf">
      <Head
        label="Portfolio"
        title="Every company we have backed."
        lede="Grouped by industry. Filter by vertical, or search by name. Companies that have exited are marked."
      />

      <div className="pf-bar">
        <div className="wrap pf-bar-in">
          <div className="pf-pills" role="group" aria-label="Filter by industry">
            {["All", ...INDUSTRY_ORDER].map((name) => (
              <button
                key={name}
                type="button"
                className={`pf-pill${industry === name ? " on" : ""}`}
                aria-pressed={industry === name}
                onClick={() => {
                  setIndustry(name);
                  setVertical("All verticals");
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="pf-controls">
            <label className="pf-ctl">
              <span className="pf-ctl-l">Vertical</span>
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
                aria-label="Filter by vertical"
              >
                <option>All verticals</option>
                {verticals.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>

            <label className="pf-ctl">
              <span className="pf-ctl-l">Search</span>
              <input
                type="text"
                value={q}
                placeholder="Company, vertical or description"
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search companies"
              />
            </label>

            <label className="pf-ctl">
              <span className="pf-ctl-l">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option>All</option>
                <option>Active</option>
                <option>Exits</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="wrap pf-body" ref={gridRef}>
        {!results.length && (
          <p className="pf-empty">No companies match those filters.</p>
        )}

        {sections.map((sec) => (
          <div className="pf-sec" key={sec.name || "one"}>
            {sec.name && (
              <h2 className="pf-sec-h">
                <span>{sec.name}</span>
                <i aria-hidden="true" />
              </h2>
            )}

            <div className="pf-grid">
              {sec.rows.map((r) => {
                const exited = r.status === "Exit";
                return (
                  <div className={`pf-card${exited ? " ex" : ""}`} key={r.company}>
                    <a
                      className="pf-link"
                      href={r.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="pf-tile" aria-hidden="true">
                        {initials(r.company)}
                      </span>
                      <span className="pf-main">
                        <span className="pf-name">
                          {r.company}
                          {exited && <i className="pf-exit">Exit</i>}
                        </span>
                        <span className="pf-one">{r.one_liner}</span>
                      </span>
                    </a>
                    {r.vertical && (
                      <button
                        type="button"
                        className="pf-vert"
                        onClick={() => pickVertical(r.vertical)}
                      >
                        {r.vertical}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <p className="pf-note">
          Coverage of a company does not indicate a current investment. Past
          performance does not indicate future results.
        </p>
      </div>
    </section>
  );
}
