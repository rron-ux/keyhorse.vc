import { useEffect, useMemo, useRef, useState } from "react";
import heroBluegrass from "@/assets/hero-bluegrass.jpg";
import {
  BUSINESS_MODELS,
  COMPANIES,
  INDUSTRIES,
  MARQUEE,
  TOTAL,
  TYPE_COLOR,
  TYPE_TEXT,
  type CompanyRow,
} from "@/data/company-meta";
import { initials } from "./CompanyCard";
import { useSite } from "./shared";

const PAGE = 40;

/* ---------------------------------------------------------------- helpers */

function Portrait({
  c,
  className,
}: {
  c: CompanyRow;
  className?: string;
}) {
  if (c.portrait)
    return (
      <img
        className={className}
        src={c.portrait}
        alt={c.founder ? `${c.founder}, ${c.display_name}` : c.display_name}
        loading="lazy"
      />
    );
  return (
    <span
      className={`cx-mono-fallback${className ? ` ${className}` : ""}`}
      style={{ color: TYPE_TEXT[c.type] }}
      aria-hidden
    >
      {initials(c.display_name)}
    </span>
  );
}

/* --------------------------------------------------------------- marquee */

function Marquee({ onPick }: { onPick: (c: CompanyRow) => void }) {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="cx-marquee">
      <div className="cx-track">
        {row.map((c, i) => (
          <button
            type="button"
            key={`${c.domain}-${i}`}
            className="cx-mcard"
            style={{ ["--tc" as string]: TYPE_COLOR[c.type] }}
            onClick={() => onPick(c)}
          >
            <span className="cx-mshot">
              <Portrait c={c} />
            </span>
            <span className="cx-mname">{c.display_name}</span>
            <span className="cx-mtype">{c.type.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- dropdown */

function Dropdown({
  label,
  options,
  counts,
  selected,
  onToggle,
  onClear,
  open,
  setOpen,
}: {
  label: string;
  options: string[];
  counts: Record<string, number>;
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
                <span className="cx-ddc">{counts[o] || 0}</span>
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

/* ----------------------------------------------------------------- modal */

function Modal({ c, onClose }: { c: CompanyRow; onClose: () => void }) {
  const { openPost } = useSite();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const rows: [string, string][] = [
    ["Founder", c.founder || "—"],
    ["Industry", c.industry],
    ["Sector", c.sector],
    ["Business model", c.businessModel],
    ["Stage", c.stage],
    ["Headquarters", c.hq],
  ];
  if (c.type === "Programmatic")
    rows.push(["Invested via", c.partnerProgram || "—"]);

  return (
    <div className="cx-scrim" onClick={onClose}>
      <div
        className="cx-modal"
        role="dialog"
        aria-modal="true"
        aria-label={c.display_name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cx-x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="cx-mleft">
          <Portrait c={c} />
        </div>
        <div className="cx-mbody">
          <span className="cx-badge" style={{ ["--tc" as string]: TYPE_TEXT[c.type] }}>
            {c.type.toUpperCase()}
          </span>
          <h2>{c.display_name}</h2>
          <p className="cx-one">{c.oneLiner}</p>
          <div className="cx-kv">
            {rows.map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
          {c.articles.length ? (
            <div className="cx-cov">
              <p className="cx-covl">Coverage</p>
              {c.articles.map((a) => (
                <a
                  key={a.slug}
                  href={a.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <em>Keyhorse</em>
                  <b>{a.title}</b>
                  <i>{a.date}</i>
                </a>
              ))}
            </div>
          ) : null}
          <div className="cx-acts">
            {c.website ? (
              <a
                className="cx-btn cy"
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {c.domain}
              </a>
            ) : null}
            {c.articles[0] ? (
              <button
                className="cx-btn out"
                onClick={() => {
                  onClose();
                  openPost(c.articles[0]!.slug);
                }}
              >
                Read the story
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function Companies() {
  const { pendingCompany } = useSite();
  const [types, setTypes] = useState<string[]>([]);
  const [inds, setInds] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<CompanyRow | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pendingCompany) return;
    const hit = COMPANIES.find(
      (c) => c.display_name.toLowerCase() === pendingCompany.toLowerCase(),
    );
    if (hit) setActive(hit);
  }, [pendingCompany]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COMPANIES.filter(
      (c) =>
        (!types.length || types.includes(c.type)) &&
        (!inds.length || inds.includes(c.industry)) &&
        (!models.length || models.includes(c.businessModel)) &&
        (!needle ||
          c.display_name.toLowerCase().includes(needle) ||
          c.oneLiner.toLowerCase().includes(needle) ||
          c.founder.toLowerCase().includes(needle)),
    );
  }, [types, inds, models, q]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const cur = Math.min(page, pages);
  const slice = list.slice((cur - 1) * PAGE, cur * PAGE);

  const toggler =
    (set: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) => {
      setPage(1);
      set((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    };

  const goPage = (n: number) => {
    setPage(n);
    barRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const counts = (key: (c: CompanyRow) => string) => {
    const m: Record<string, number> = {};
    for (const c of COMPANIES) m[key(c)] = (m[key(c)] || 0) + 1;
    return m;
  };

  const chips: { k: string; v: string; drop: () => void }[] = [
    ...types.map((v) => ({ k: "Investment", v, drop: () => toggler(setTypes)(v) })),
    ...inds.map((v) => ({ k: "Industry", v, drop: () => toggler(setInds)(v) })),
    ...models.map((v) => ({ k: "Model", v, drop: () => toggler(setModels)(v) })),
  ];

  return (
    <section className="page on cx">
      <header className="cx-head">
        <img src={heroBluegrass} alt="" aria-hidden />
        <div className="wrap">
          <p className="cx-eyebrow">Companies</p>
          <h1>Companies</h1>
        </div>
      </header>

      <Marquee onPick={setActive} />

      <div className="cx-bar" ref={barRef}>
        <div className="wrap cx-barin">
          <Dropdown
            label="Investment"
            options={["Direct", "Programmatic"]}
            counts={counts((c) => c.type)}
            selected={types}
            onToggle={toggler(setTypes)}
            onClear={() => setTypes([])}
            open={open === "t"}
            setOpen={(v) => setOpen(v ? "t" : null)}
          />
          <Dropdown
            label="Industry"
            options={INDUSTRIES}
            counts={counts((c) => c.industry)}
            selected={inds}
            onToggle={toggler(setInds)}
            onClear={() => setInds([])}
            open={open === "i"}
            setOpen={(v) => setOpen(v ? "i" : null)}
          />
          <Dropdown
            label="Business model"
            options={[...BUSINESS_MODELS]}
            counts={counts((c) => c.businessModel)}
            selected={models}
            onToggle={toggler(setModels)}
            onClear={() => setModels([])}
            open={open === "m"}
            setOpen={(v) => setOpen(v ? "m" : null)}
          />
          <input
            className="cx-search"
            value={q}
            placeholder="Search companies, founders"
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
          <span className="cx-count">
            {list.length} of {TOTAL}
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
                setTypes([]);
                setInds([]);
                setModels([]);
                setPage(1);
              }}
            >
              Clear all
            </button>
          </div>
        ) : null}
      </div>

      <div className="wrap cx-listwrap">
        <div className="cx-lhead">
          <span>Company</span>
          <span>Industry</span>
          <span>Sector</span>
          <span>Investment</span>
          <span />
        </div>

        {slice.length ? (
          slice.map((c) => (
            <button
              type="button"
              key={`${c.name}-${c.domain}`}
              className="cx-row"
              style={{ ["--tc" as string]: TYPE_TEXT[c.type] }}
              onClick={() => setActive(c)}
            >
              <span className="cx-co">
                <span className="cx-shot">
                  <Portrait c={c} />
                </span>
                <span className="cx-cot">
                  <b>{c.display_name}</b>
                  <em>{c.oneLiner}</em>
                </span>
              </span>
              <span className="cx-cell">{c.industry}</span>
              <span className="cx-cell">{c.sector}</span>
              <span className="cx-typecell">
                <span className="cx-pill">{c.type.toUpperCase()}</span>
                {c.type === "Programmatic" ? (
                  <em>via {c.partnerProgram}</em>
                ) : null}
              </span>
              <span className="cx-arrow" aria-hidden>
                →
              </span>
            </button>
          ))
        ) : (
          <p className="cx-empty">No companies match those filters.</p>
        )}

        {pages > 1 ? (
          <div className="cx-pager">
            <button disabled={cur === 1} onClick={() => goPage(cur - 1)}>
              Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                aria-current={n === cur || undefined}
                onClick={() => goPage(n)}
              >
                {n}
              </button>
            ))}
            <button disabled={cur === pages} onClick={() => goPage(cur + 1)}>
              Next
            </button>
          </div>
        ) : null}
      </div>

      {active ? <Modal c={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
