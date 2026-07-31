import { useState } from "react";
import { COS } from "@/data/keyhorse";
import { Chips, PageHead, Rv, statusLabel, useSite } from "./shared";
import { CompanySlide, CompanyWall } from "./cards";

const FILTERS = [
  ["all", "All"],
  ["active", "Active"],
  ["exit", "Exited"],
  ["legacy", "Full history"],
] as const;

export default function Companies() {
  const { openSlide } = useSite();
  const [f, setF] = useState<(typeof FILTERS)[number][0]>("all");

  return (
    <section className="page on">
      <PageHead
        seed="kh-cos"
        title="Companies"
        lede="Companies building in Kentucky. The full record stays published."
      />
      <div className="band">
        <Rv>
          <div className="wall" style={{ marginBottom: 40 }}>
            <CompanyWall count={18} />
          </div>
          <Chips items={FILTERS} value={f} onChange={setF} />
          <div className="cgrid">
            {COS.map((c, i) => [c, i] as const)
              .filter(([c]) => f === "all" || c[3] === f)
              .map(([c, i]) => (
                <div
                  className="cc"
                  key={c[0]}
                  onClick={() => openSlide(<CompanySlide i={i} />)}
                >
                  <div>
                    <div className="nm">{c[0]}</div>
                    <div className="mt">{c[1]}</div>
                  </div>
                  <div className="st">
                    {statusLabel(c[3])} · {c[2]}
                  </div>
                </div>
              ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--faint)", marginTop: 20 }}>
            Showing 25 of 600+.
          </p>
        </Rv>
      </div>
    </section>
  );
}
