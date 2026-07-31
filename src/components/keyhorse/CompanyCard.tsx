import { useEffect, useState } from "react";
import { colorFor } from "./shared";

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

export const initials = (n: string) =>
  n
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Logo with favicon fallback, then an initials disc in the company colour. */
export function LogoMark({
  c,
  size,
  plate,
}: {
  c: Company;
  size: number;
  plate?: boolean;
}) {
  const url = logoUrl(c);
  const [ok, setOk] = useState(!!url);
  useEffect(() => setOk(!!url), [url]);
  const col = colorFor(c.name);

  if (ok && url) {
    return (
      <span
        className={plate ? "lgm plate" : "lgm"}
        style={{ width: size, height: size }}
      >
        <img
          src={url}
          alt={`${c.display_name} logo`}
          loading="lazy"
          onError={() => setOk(false)}
        />
      </span>
    );
  }
  return (
    <span
      className={plate ? "lgm disc plate" : "lgm disc"}
      style={{
        width: size,
        height: size,
        background: `${col}42`,
        color: col,
        fontSize: Math.max(9, size * 0.36),
      }}
    >
      {initials(c.display_name)}
    </span>
  );
}
