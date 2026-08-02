import { createContext, useContext, type ReactNode } from "react";
import { pic } from "@/lib/images";


export type PageId =
  | "home"
  | "about"
  | "industries"
  | "companies"
  | "media"
  | "resources"
  | "partners"
  | "apply"
  | "record"
  | "post";

type SiteCtx = {
  page: PageId;
  go: (id: PageId, search?: string) => void;
  jump: (id: string) => void;
  openSlide: (node: ReactNode) => void;
  closeSlide: () => void;
  openPost: (slug: string) => void;
  /** Company name to auto-open on the companies page, if any. */
  pendingCompany: string;
};

export const SiteContext = createContext<SiteCtx>({
  page: "home",
  go: () => {},
  jump: () => {},
  openSlide: () => {},
  closeSlide: () => {},
  openPost: () => {},
  pendingCompany: "",
});

export const useSite = () => useContext(SiteContext);


/** Resolve a legacy image seed to a real project asset URL. */
export const IMG = (seed: string, _w?: number, _h?: number) => pic(seed).src;

export function Box({
  seed,
  cap,
  className,
  style,
}: {
  seed: string;
  w?: number;
  h?: number;
  cap?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const real = pic(seed);
  return (
    <div className={className ? `imgbox ${className}` : "imgbox"} style={style}>
      <img loading="lazy" src={real.src} alt={real.alt} />
      <span className="cap">{cap || real.cap || "Reference image"}</span>
    </div>
  );
}



/** div.wrap — content container (scroll-reveal animation removed). */
export function Rv({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={`wrap${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}


export function MRow({
  n,
  t,
  d,
  ink,
}: {
  n: string;
  t: string;
  d: string;
  ink?: boolean;
}) {
  return (
    <div className="mrow" style={ink ? { borderColor: "#383838" } : undefined}>
      <div className="n">{n}</div>
      <div>
        <b style={ink ? { color: "#fff" } : undefined}>{t}</b>
        <p>{d}</p>
      </div>
    </div>
  );
}

export function PageHead({
  seed,
  title,
  lede,
}: {
  seed: string;
  title: string;
  lede: ReactNode;
}) {
  return (
    <div className="phead">
      <img className="bgimg" loading="lazy" src={pic(seed).src} alt={pic(seed).alt} />
      <div className="wrap">
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </div>
  );
}

export function Head({
  label,
  title,
  children,
  lede,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="head">
      <div>
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        {lede ? (
          <p className="lede" style={{ marginTop: 12 }}>
            {lede}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function Chips<T extends string>({
  items,
  value,
  onChange,
}: {
  items: readonly (readonly [T, string])[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="filters">
      {items.map(([v, l]) => (
        <button
          key={v}
          className="chip"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export const statusLabel = (s: string) =>
  s === "exit" ? "Exited" : s === "legacy" ? "Legacy" : "Active";

/** Deterministic brand-family colour for a company/entity name. */
const KH_PALETTE = ["#00A8E1","#0E7C86","#7A5CF0","#E86A2B","#3F9B45","#C1436B","#1F6FEB"];
export function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return KH_PALETTE[h % KH_PALETTE.length]!;
}
