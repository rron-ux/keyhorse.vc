import { useMemo, useState } from "react";
import { ROUNDS, ROUND_SECTORS, ROUND_YEARS } from "@/data/media";
import { useSite } from "./shared";
import { SectionLabel } from "./Media";

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Record() {
  const { go, openPost } = useSite();
  const [year, setYear] = useState("all");
  const [sector, setSector] = useState("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ROUNDS.filter(
      (r) =>
        (year === "all" || r.date.startsWith(year)) &&
        (sector === "all" || r.sector === sector) &&
        (!t ||
          `${r.company} ${r.city} ${r.sector} ${r.outlet} ${r.stage}`
            .toLowerCase()
            .includes(t)),
    );
  }, [year, sector, q]);

  return (
    <section className="page on md mx">
      <div className="mx-dark mx-dark--head">
        <div className="wrap mx-dark-in">
          <SectionLabel left="The Record" right="Keyhorse Capital" />
          <div className="mx-rechead">
            <div>
              <button className="mx-muted-link" onClick={() => go("media")}>
                ← Media
              </button>
              <h1 className="mx-h2" style={{ marginTop: 10 }}>
                Every round raised in the Commonwealth.
              </h1>
              <p className="mx-sub">
                The full archive of disclosed rounds across Kentucky, filterable by year
                and sector.
              </p>
            </div>
            <span className="mx-live">
              <i aria-hidden="true" />
              {"\n"}
            </span>
          </div>

          <div className="mx-recfilters">
            <select value={year} onChange={(e) => setYear(e.target.value)} aria-label="Year">
              <option value="all">All years</option>
              {ROUND_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              aria-label="Sector"
            >
              <option value="all">All sectors</option>
              {ROUND_SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search company, city, outlet"
              aria-label="Search rounds"
            />
            <span className="mx-mono">{rows.length} rounds</span>
          </div>

          <table className="mx-tbl">
            <thead>
              <tr>
                <th>Date</th>
                <th>Company</th>
                <th>Location</th>
                <th>Sector</th>
                <th className="r">Raised</th>
                <th className="r">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.company + r.date}>
                  <td className="mx-mono">{fmt(r.date)}</td>
                  <td className="co">
                    {r.slug ? (
                      <button onClick={() => openPost(r.slug!)}>{r.company}</button>
                    ) : (
                      r.company
                    )}
                  </td>
                  <td>{r.city}, KY</td>
                  <td>{r.sector}</td>
                  <td className="r amt">{r.amount}</td>
                  <td className="r">
                    <a href={r.outletUrl} target="_blank" rel="noopener noreferrer">
                      {r.outlet} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? (
            <p className="mx-sub" style={{ marginTop: 22 }}>
              No rounds match those filters.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
