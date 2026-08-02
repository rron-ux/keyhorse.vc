import { useMemo, useState } from "react";
import { ROUNDS, ROUND_SECTORS, ROUND_YEARS } from "@/data/media";
import { colorFor, useSite } from "./shared";

const PER_PAGE = 20;

export default function Record() {
  const { go, openPost } = useSite();
  const [year, setYear] = useState("all");
  const [sector, setSector] = useState("all");
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      ROUNDS.filter(
        (r) =>
          (year === "all" || r.date.startsWith(year)) &&
          (sector === "all" || r.sector === sector),
      ),
    [year, sector],
  );
  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = rows.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <section className="page on md">
      <div className="md-hero md-hero--slim">
        <span className="md-hero-orb" aria-hidden="true" />
        <div className="wrap md-hero-in">
          <button className="md-back" onClick={() => go("media")}>
            ← Media
          </button>
          <p className="md-eyebrow md-eyebrow--dark">The record</p>
          <h1 className="md-hero-h">Every round raised in Kentucky.</h1>
          <p className="md-hero-p">
            The full archive of disclosed rounds across the Commonwealth, filterable by
            year and sector.
          </p>
        </div>
      </div>

      <div className="band">
        <div className="wrap">
          <div className="md-bar-in md-recbar">
            <div className="md-pills">
              <button
                className="md-pill"
                aria-pressed={year === "all"}
                onClick={() => {
                  setYear("all");
                  setPage(1);
                }}
              >
                All years
              </button>
              {ROUND_YEARS.map((y) => (
                <button
                  key={y}
                  className="md-pill"
                  aria-pressed={year === y}
                  onClick={() => {
                    setYear(y);
                    setPage(1);
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
            <span className="md-count">
              {rows.length} rounds · page {current} of {pages}
            </span>
          </div>

          <div className="md-pills" style={{ marginTop: 12, marginBottom: 26 }}>
            <button
              className="md-pill"
              aria-pressed={sector === "all"}
              onClick={() => {
                setSector("all");
                setPage(1);
              }}
            >
              All sectors
            </button>
            {ROUND_SECTORS.map((s) => (
              <button
                key={s}
                className="md-pill"
                aria-pressed={sector === s}
                onClick={() => {
                  setSector(s);
                  setPage(1);
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="md-rows md-rows--light">
            {shown.map((r) => (
              <div
                className="md-row"
                key={r.company + r.date}
                style={{ ["--fc" as string]: colorFor(r.company) }}
              >
                <div className="md-row-dt">
                  {new Date(`${r.date}T00:00:00Z`).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </div>
                <div className="md-row-co">
                  {r.slug ? (
                    <button onClick={() => openPost(r.slug!)}>{r.company}</button>
                  ) : (
                    r.company
                  )}
                  <small>{r.city}, Kentucky</small>
                </div>
                <div className="md-row-sec">{r.sector}</div>
                <div className="md-row-amt">{r.amount}</div>
                <div className="md-row-out">
                  <a href={r.outletUrl} target="_blank" rel="noopener noreferrer">
                    {r.outlet} ↗
                  </a>
                </div>
                <div className="md-row-ar">→</div>
              </div>
            ))}
          </div>

          <div className="md-pager">
            <button
              className="md-pg"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              ← Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className="md-pg num"
                aria-current={n === current ? "true" : "false"}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="md-pg"
              disabled={current === pages}
              onClick={() => setPage(current + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
