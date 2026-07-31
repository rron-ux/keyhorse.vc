import { FUNDS3, STEPS } from "@/data/keyhorse";
import { Head, PageHead, Rv } from "./shared";

const CRITERIA = [
  "Tech-enabled product or business model",
  "Headquartered in, or relocating to, Kentucky",
  "Validated prototype, MVP, or traction toward product-market fit",
  "Demonstrated ability to generate revenue",
  "Customers beyond a local market",
  "Potential to create employment in the Commonwealth",
];

export default function Apply() {
  return (
    <section className="page on">
      <PageHead
        seed="kh-apply"
        title="Apply"
        lede="Three funds, three sets of criteria, one process. All of it published before the form, not behind it."
      />

      <div className="band">
        <Rv>
          <Head label="The funds" title="Which one fits." />
          <div className="funds3">
            {FUNDS3.map((f) => (
              <div className="f3" key={f.n}>
                <div className="k">{f.k}</div>
                <div className="nm">{f.n}</div>
                <div className="chk" style={{ fontSize: "clamp(19px,1.9vw,24px)" }}>
                  {f.c}
                </div>
                <div className="chkl">{f.cl}</div>
                <div className="d">{f.d}</div>
                <ul>
                  {f.cr.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="reqbar">
            <b>Every fund requires</b>
            <span>Tech-enabled</span>
            <span>Kentucky-based</span>
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">General criteria</p>
              <ul className="crit">
                {CRITERIA.map((c, i) => (
                  <li key={c}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="lbl">Thesis</p>
              <h3>
                Weighted toward the industries where Kentucky already has an
                advantage.
              </h3>
              <p
                style={{
                  marginTop: 18,
                  color: "var(--kh-muted)",
                  fontSize: 14.5,
                }}
              >
                Not exclusively — but deliberately concentrated in advanced
                manufacturing, logistics and aging care. We invest outside those
                sectors where the case is strong.
              </p>
              <button className="btn g" style={{ marginTop: 16 }}>
                Download full thesis (PDF)
              </button>
              <div
                style={{
                  marginTop: 26,
                  borderTop: "1px solid var(--line)",
                  paddingTop: 18,
                }}
              >
                <p className="lbl" style={{ marginBottom: 10 }}>
                  Preparation
                </p>
                <p style={{ color: "var(--kh-muted)", fontSize: 14 }}>
                  The Investment Process Checklist lists every diligence item by
                  stage, so nothing arrives unannounced.
                </p>
                <button className="btn g" style={{ marginTop: 10 }}>
                  Download checklist
                </button>
              </div>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv>
          <Head label="Process" title="What to expect after you apply." />
          <div className="steps">
            {STEPS.map(([n, t, d]) => (
              <div className="step" key={n}>
                <div className="n">{n}</div>
                <div className="t">{t}</div>
                <div className="d">{d}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--faint)", marginTop: 16 }}>
            We do not publish timelines. Pace depends on the round, the fund, and how
            ready the data room is.
          </p>
          <div style={{ marginTop: 36 }}>
            <button className="btn cy" style={{ padding: "15px 30px" }}>
              Start the application
            </button>
          </div>
        </Rv>
      </div>
    </section>
  );
}
