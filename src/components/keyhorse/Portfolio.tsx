import { useEffect, useMemo, useRef, useState } from "react";
import heroBluegrass from "@/assets/hero-bluegrass.jpg";
import raw from "@/data/portfolio.json";
import { MARQUEE } from "@/data/company-meta";
import { initials as monogram } from "./CompanyCard";

type Row = {
  id: string;
  company: string;
  slug: string;
  description: string;
  website: string;
  sector: string;
  vertical: string;
  stage: string;
  raw_stage?: string;
  type: string;
  status: string;
  city: string;
  state: string;
  logo?: string;
};

const ROWS = raw as Row[];

/** Fixed sector order. */
export const INDUSTRY_ORDER = [
  "Agriculture & Food",
  "Business Services",
  "Consumer",
  "Education",
  "Energy & CleanTech",
  "Financial Services",
  "Healthcare & Life Sciences",
  "Industrials & Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Software & Technology",
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
  const joined = parts.join("");
  if (!joined) return "—";
  if (parts.length === 1) return joined.slice(0, 2).toUpperCase();
  return `${joined[0]}${(parts[1] ?? "")[0] ?? ""}`.toUpperCase();
};

/** Inline investment-type tag: colored pip + mono label in a hairline box. */
function Tag({ type, label }: { type: string; label: string }) {
  return (
    <span className="pf-tag" data-type={type}>
      <span className="pf-tag-dot" aria-hidden />
      <span className="pf-tag-label">{label}</span>
    </span>
  );
}

/** Square pale-cyan tile: logo file when present, initials otherwise. */
function Mark({ r, className }: { r: Row; className: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [r.slug]);
  return (
    <span className={className} aria-hidden="true">
      {failed ? (
        initials(r.company)
      ) : (
        <img
          src={`/logos/${r.slug}.png`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

/* --------------------------------------------------------------- marquee */

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="cx-marquee">
      <div className="cx-track">
        {row.map((c, i) => (
          <span key={`${c.domain}-${i}`} className="cx-mcard">
            <span className="cx-mshot">
              {c.portrait ? (
                <img
                  src={c.portrait}
                  alt={c.founder ? `${c.founder}, ${c.display_name}` : c.display_name}
                  loading="lazy"
                />
              ) : (
                <span className="cx-mono-fallback" aria-hidden>
                  {monogram(c.display_name)}
                </span>
              )}
            </span>
            <span className="cx-mname">{c.display_name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- dropdown */

function Dropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
  open,
  setOpen,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className="cx-dd" ref={ref}>
      <button
        type="button"
        className="cx-ddb"
        aria-expanded={open}
        data-active={selected.length > 0 || undefined}
        onClick={() => setOpen(!open)}
      >
        {label}
        {selected.length ? ` (${selected.length})` : ""}
        <i aria-hidden>▾</i>
      </button>
      {open ? (
        <div className="cx-ddp" role="group" aria-label={label}>
          <div className="cx-ddscroll">
            {options.map((o) => (
              <label key={o} className="cx-ddrow">
                <input
                  type="checkbox"
                  checked={selected.includes(o)}
                  onChange={() => onToggle(o)}
                />
                <span className="cx-ddn">{o}</span>
              </label>
            ))}
          </div>
          <button type="button" className="cx-ddclear" onClick={onClear}>
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
}

const toggler =
  (set: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) =>
    set((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

/* ------------------------------------------------------------------ page */

export default function Portfolio() {
  const [inds, setInds] = useState<string[]>([]);
  const [verts, setVerts] = useState<string[]>([]);
  const [stages, setStages] = useState<string[]>([]);
  const [stats, setStats] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState<Row | null>(null);
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const [open, setOpen] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  /* Shareable params on mount. */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const iSlug = p.get("sector") || p.get("industry");
    const vSlug = p.get("vertical");
    if (iSlug) {
      const hit = INDUSTRY_ORDER.find((i) => slug(i) === iSlug);
      if (hit) setInds([hit]);
    }
    if (vSlug) {
      const hit = ROWS.find((r) => slug(r.vertical) === vSlug);
      if (hit) setVerts([hit.vertical]);
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
    p.delete("industry");
    p.delete("sector");
    p.delete("vertical");
    p.delete("stage");
    if (inds.length === 1) p.set("sector", slug(inds[0]!));
    if (verts.length === 1) p.set("vertical", slug(verts[0]!));
    const s = p.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (s ? `?${s}` : ""),
    );
  }, [inds, verts]);

  /* Verticals come from the records visible under the current sector choice. */
  const verticalOptions = useMemo(() => {
    const set = new Set<string>();
    ROWS.forEach((r) => {
      if (inds.length && !inds.includes(r.sector)) return;
      if (r.vertical) set.add(r.vertical);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [inds]);

  /* Drop verticals that no longer exist under the selected sectors. */
  useEffect(() => {
    setVerts((prev) => {
      const next = prev.filter((v) => verticalOptions.includes(v));
      return next.length === prev.length ? prev : next;
    });
  }, [verticalOptions]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ROWS.filter((r) => {
      if (inds.length && !inds.includes(r.sector)) return false;
      if (verts.length && !verts.includes(r.vertical)) return false;
      if (stages.length && !stages.includes(r.stage)) return false;
      if (stats.length && !stats.includes(r.status)) return false;
      if (needle) {
        const hay =
          `${r.company} ${r.description} ${r.vertical}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    }).sort((a, b) => a.company.localeCompare(b.company));
  }, [inds, verts, stages, stats, q]);

  const chips = [
    ...inds.map((v) => ({ k: "Sector", v, drop: () => toggler(setInds)(v) })),
    ...verts.map((v) => ({ k: "Vertical", v, drop: () => toggler(setVerts)(v) })),
    ...stages.map((v) => ({ k: "Stage", v, drop: () => toggler(setStages)(v) })),
    ...stats.map((v) => ({ k: "Status", v, drop: () => toggler(setStats)(v) })),
  ];

  return (
    <section className="page on cx pf">
      <header className="cx-head">
        <img src={heroBluegrass} alt="" aria-hidden />
        <div className="wrap">
          <p className="cx-eyebrow">Portfolio</p>
          <h1>Founders we've backed.</h1>
          <p className="cx-sub">
            Kentucky entrepreneurs are building impactful companies within a
            growing community of resources designed to support the next
            generation of scalable businesses. Our work leads us to be the most
            active investor in the state, providing capital to Kentucky
            companies at their earliest stages of development.
          </p>
        </div>
      </header>

      <Marquee />

      <div className="cx-bar">
        <div className="wrap cx-barin">
          <Dropdown
            label="Sector"
            options={INDUSTRY_ORDER}
            selected={inds}
            onToggle={toggler(setInds)}
            onClear={() => setInds([])}
            open={open === "i"}
            setOpen={(v) => setOpen(v ? "i" : null)}
          />
          <Dropdown
            label="Vertical"
            options={verticalOptions}
            selected={verts}
            onToggle={toggler(setVerts)}
            onClear={() => setVerts([])}
            open={open === "v"}
            setOpen={(v) => setOpen(v ? "v" : null)}
          />
          <Dropdown
            label="Stage"
            options={["Inception", "Seed", "Growth"]}
            selected={stages}
            onToggle={toggler(setStages)}
            onClear={() => setStages([])}
            open={open === "g"}
            setOpen={(v) => setOpen(v ? "g" : null)}
          />
          <Dropdown
            label="Status"
            options={["Active", "Exited"]}
            selected={stats}
            onToggle={toggler(setStats)}
            onClear={() => setStats([])}
            open={open === "s"}
            setOpen={(v) => setOpen(v ? "s" : null)}
          />
          <input
            className="cx-search"
            value={q}
            placeholder="Search companies"
            aria-label="Search companies"
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="cx-count">
            {results.length} of {ROWS.length}
          </span>
        </div>
        {chips.length ? (
          <div className="wrap cx-chips">
            {chips.map((ch) => (
              <button key={`${ch.k}-${ch.v}`} className="cx-chip" onClick={ch.drop}>
                {ch.v} <i aria-hidden>×</i>
              </button>
            ))}
            <button
              className="cx-clearall"
              onClick={() => {
                setInds([]);
                setVerts([]);
                setStages([]);
                setStats([]);
                setQ("");
              }}
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>

      <div className="wrap pf-body" ref={gridRef}>
        {!results.length && (
          <p className="pf-empty">No companies match those filters.</p>
        )}

        <div className="pf-grid">
          {results.map((r) => {
            const exited = r.status === "Exited";
            return (
              <div className={`pf-card${exited ? " ex" : ""}`} key={r.id}>
                <button
                  type="button"
                  className="pf-link"
                  onClick={() => setModal(r)}
                >
                  <Mark r={r} className="pf-tile" />
                  <span className="pf-main">
                    <span className="pf-name">
                      {r.company}
                      {exited && <i className="pf-exit">Exited</i>}
                      {r.type && (
                        <i className={`pf-type ${r.type === "Programmatic" ? "pg" : "dir"}`}>
                          {r.type}
                        </i>
                      )}
                    </span>
                    <span className="pf-one">{r.description}</span>
                  </span>
                </button>
                {(r.vertical || r.city) && (
                  <button
                    type="button"
                    className="pf-vert"
                    onClick={() => r.vertical && setVerts([r.vertical])}
                  >
                    {[r.vertical, r.city].filter(Boolean).join(" · ")}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {modal && (
          <div
            className="pfm-scrim"
            role="dialog"
            aria-modal="true"
            aria-label={modal.company}
            onClick={() => setModal(null)}
          >
            <div className="pfm" onClick={(e) => e.stopPropagation()}>
              <button
                className="pfm-x"
                onClick={() => setModal(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="pfm-head">
                <Mark r={modal} className="pfm-logo" />
                <div>
                  <h3 className="pfm-name">
                    {modal.company}
                    {modal.status === "Exited" && (
                      <i className="pf-exit">Exited</i>
                    )}
                  </h3>
                  <p className="pfm-one">{modal.description}</p>
                </div>
              </div>
              <dl className="pfm-meta">
                <div>
                  <dt>Sector</dt>
                  <dd>{modal.sector}</dd>
                </div>
                <div>
                  <dt>Vertical</dt>
                  <dd>{modal.vertical}</dd>
                </div>
                <div>
                  <dt>Stage</dt>
                  <dd>{modal.stage}</dd>
                </div>
                {modal.type ? (
                  <div>
                    <dt>Type</dt>
                    <dd>{modal.type}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Location</dt>
                  <dd>{[modal.city, modal.state].filter(Boolean).join(", ")}</dd>
                </div>
              </dl>
              {modal.website && (
                <a
                  className="pfm-site"
                  href={modal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        )}

        <p className="pf-note">
          Coverage of a company does not indicate a current investment. Past
          performance does not indicate future results.
        </p>
      </div>
    </section>
  );
}
