import { createContext, useContext, type ReactNode } from "react";

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

import logisticsAsset from "@/assets/logistics.jpg.asset.json";
import manufacturingAsset from "@/assets/manufacturing.jpg.asset.json";
import healthcareAsset from "@/assets/healthcare.jpg.asset.json";
import energyAsset from "@/assets/energy.jpg.asset.json";
import agricultureAsset from "@/assets/agriculture.jpg.asset.json";

const SEED_IMAGES: Record<string, { url: string; alt: string; cap: string }> = {
  "kh-log": {
    url: logisticsAsset.url,
    alt: "Freight truck on a highway at sunset",
    cap: "Logistics & Trade",
  },
  "kh-mfg": {
    url: manufacturingAsset.url,
    alt: "CNC laser cutting sheet metal with sparks",
    cap: "Advanced Manufacturing, Aerospace & Defense",
  },
  "kh-health": {
    url: healthcareAsset.url,
    alt: "Two clinicians reviewing medical imaging on monitors",
    cap: "Health & Care",
  },
  "kh-ev": {
    url: energyAsset.url,
    alt: "Wind turbines on rolling hills at dusk",
    cap: "Energy, Materials & Climate",
  },
  "kh-ag": {
    url: agricultureAsset.url,
    alt: "Aerial view of a tractor working a field",
    cap: "Agriculture, Food & Consumer",
  },
};

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
  const real = SEED_IMAGES[seed];
  return (
    <div className={className ? `imgbox ${className}` : "imgbox"} style={style}>
      <img
        loading="lazy"
        src={real ? real.url : IMG(seed, w, h)}
        alt={real ? real.alt : ""}
      />
      <span className="cap">{cap || real?.cap || "Reference image"}</span>
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
