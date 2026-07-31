import { useMemo, useState } from "react";
import raw from "@/data/companies.json";
import { PageHead, Rv, useSite } from "./shared";
import { CompanyCard, type Company } from "./CompanyCard";

const ALL = raw as Company[];

const SECTORS = Array.from(
  new Set(ALL.map((c) => c.sector).filter(Boolean)),
).sort();

const ACTIVE = ALL.filter((c) => c.status === "Active").length;
const EXITED = ALL.filter((c) => c.status === "Exited").length;

const PAGE = 40;

function CompanyPanel({ c }: { c: Company }) {
  return (
    <div className="bd" style={{ paddingTop: 44 }}>
      <h3>{c.name}</h3>
      <div className="role" style={{ color: "var(--cyan)" }}>
        {c.status}
      </div>
      {c.description ? (
        <p style={{ color: "var(--kh-muted)", fontSize: 13.5 }}>
          {c.description}
        </p>
      ) : null}
      {c.sector ? (
        <div className="kv">
          <span>Sector</span>
          <span>{c.sector}</span>
        </div>
      ) : null}
      {c.industry ? (
        <div className="kv">
          <span>Industry</span>
          <span>{c.industry}</span>
        </div>
      ) : null}
      {c.website ? (
        <div className="kv">
          <span>Website</span>
          <span>{c.domain}</span>
        </div>
      ) : null}
      {c.website ? (
        <div style={{ marginTop: 24, display: "flex", gap: 9 }}>
          <a
            className="btn g"
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit site
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default function Companies() {
  const { openSlide } = useSite();
  const [status, setStatus] = useState("All");
  const [sector, setSector] = useState("All");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(
    () =>
      ALL.filter(
        (c) =>
          (status === "All" || c.status === status) &&
          (sector === "All" || c.sector === sector),
      ),
    [status, sector],
  );

  const pick = (set: (v: string) => void) => (v: string) => {
    set(v);
    setShown(PAGE);
  };

  return (
    <section className="page on">
      <PageHead
        seed="kh-cos"
        title="Companies"
        lede="We have funded more than 600 Kentucky companies. Over 200 are active today."
      />
      <div className="band">
        <Rv>
          <div className="filters">
            {["All", "Active", "Exited"].map((s) => (
              <button
                key={s}
                className="chip"
                aria-pressed={status === s}
                onClick={() => pick(setStatus)(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="filters" style={{ marginTop: 8 }}>
            {["All", ...SECTORS].map((s) => (
              <button
                key={s}
                className="chip"
                aria-pressed={sector === s}
                onClick={() => pick(setSector)(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="lwcount">
            {ACTIVE} active · {EXITED} exited
          </p>
          <div className="lwall">
            {list.slice(0, shown).map((c) => (
              <CompanyCard
                key={`${c.name}-${c.domain}`}
                c={c}
                onOpen={() => openSlide(<CompanyPanel c={c} />)}
              />
            ))}
          </div>
          {shown < list.length ? (
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button
                className="btn"
                onClick={() => setShown((n) => n + PAGE)}
              >
                Load more
              </button>
            </div>
          ) : null}
        </Rv>
      </div>
    </section>
  );
}
