import { useEffect, useRef, useState } from "react";

export type Company = {
  name: string;
  display_name: string;
  website: string;
  domain: string;
  industry: string;
  sector: string;
  status: string;
  description?: string;
  logo?: string;
};

export const logoUrl = (c: Company) =>
  c.logo ||
  (c.domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(c.domain)}&sz=128`
    : "");

type Tint = { bg: string; border: string; light: boolean } | null;

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

function analyse(img: HTMLImageElement): Tint {
  const cv = document.createElement("canvas");
  cv.width = 44;
  cv.height = 44;
  const ctx = cv.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, 44, 44);
  const { data } = ctx.getImageData(0, 0, 44, 44);
  let lum = 0;
  let n = 0;
  const buckets = new Map<number, { r: number; g: number; b: number; c: number }>();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!, g = data[i + 1]!, b = data[i + 2]!, a = data[i + 3]!;
    if (a < 130) continue;
    lum += 0.299 * r + 0.587 * g + 0.114 * b;
    n++;
    if (Math.max(r, g, b) - Math.min(r, g, b) < 30) continue;
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const e = buckets.get(key) || { r: 0, g: 0, b: 0, c: 0 };
    e.r += r; e.g += g; e.b += b; e.c++;
    buckets.set(key, e);
  }
  if (!n || !buckets.size) return null;
  let best = { r: 0, g: 0, b: 0, c: 0 };
  buckets.forEach((e) => {
    if (e.c > best.c) best = e;
  });
  const r = clamp(best.r / best.c);
  const g = clamp(best.g / best.c);
  const b = clamp(best.b / best.c);
  const light = lum / n > 168;
  const dk = 0.22;
  return {
    bg: light
      ? `rgb(${clamp(r * dk)}, ${clamp(g * dk)}, ${clamp(b * dk)})`
      : `rgba(${r}, ${g}, ${b}, 0.07)`,
    border: `rgb(${r}, ${g}, ${b})`,
    light,
  };
}

export function CompanyCard({
  c,
  onOpen,
}: {
  c: Company;
  onOpen: () => void;
}) {
  const url = logoUrl(c);
  const [ok, setOk] = useState(!!url);
  const [tint, setTint] = useState<Tint>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    if (!url) return;
    let img: HTMLImageElement | null = null;
    try {
      img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const t = analyse(img!);
          if (alive.current && t) setTint(t);
        } catch {
          /* canvas read failed — keep default card */
        }
      };
      img.src = url;
    } catch {
      /* ignore */
    }
    return () => {
      alive.current = false;
      if (img) img.onload = null;
    };
  }, [url]);

  const dark = tint?.light === true;

  return (
    <button
      type="button"
      className={`lwc${dark ? " dark" : ""}`}
      onClick={onOpen}
      style={
        tint
          ? ({
              background: tint.bg,
              "--lw-hover-border": tint.border,
            } as React.CSSProperties)
          : undefined
      }
    >
      <span className={`lwc-st${c.status === "Exited" ? " ex" : ""}`}>
        {c.status}
      </span>
      <span className="lwc-mark">
        {ok && url ? (
          <img src={url} alt={`${c.display_name} logo`} loading="lazy" onError={() => setOk(false)} />
        ) : (
          <span className="lwc-word">{c.display_name}</span>
        )}
      </span>
      <span className="lwc-rev">
        <span className="nm">{c.display_name}</span>
        <span className="in">{c.industry}</span>
        {c.website ? <span className="vs">Visit site ↗</span> : null}
      </span>
    </button>
  );
}
