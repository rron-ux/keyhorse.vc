import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PageId =
  | "home"
  | "about"
  | "industries"
  | "companies"
  | "media"
  | "resources"
  | "partners"
  | "apply";

type SiteCtx = {
  page: PageId;
  go: (id: PageId) => void;
  jump: (id: string) => void;
  openSlide: (node: ReactNode) => void;
  closeSlide: () => void;
};

export const SiteContext = createContext<SiteCtx>({
  page: "home",
  go: () => {},
  jump: () => {},
  openSlide: () => {},
  closeSlide: () => {},
});

export const useSite = () => useContext(SiteContext);

export const IMG = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export function Box({
  seed,
  w,
  h,
  cap,
  className,
  style,
}: {
  seed: string;
  w: number;
  h: number;
  cap?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className ? `imgbox ${className}` : "imgbox"} style={style}>
      <img loading="lazy" src={IMG(seed, w, h)} alt="" />
      <span className="cap">{cap || "Reference image"}</span>
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
      <img className="bgimg" src={IMG(seed, 1800, 700)} alt="" />
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
