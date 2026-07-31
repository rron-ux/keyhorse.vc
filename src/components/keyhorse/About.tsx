import { useEffect, useRef, useState } from "react";
import { FUNDS_GEN, GOALS, RELS, STATS, TEAM } from "@/data/keyhorse";
import { Box, Head, MRow, PageHead, Rv, useSite } from "./shared";
import { PersonSlide } from "./cards";

function CountUp({ final }: { final: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(final.replace(/[^0-9.]/g, ""));
    const pre = final.startsWith("$") ? "$" : "";
    const suf = final.replace(/^[$]?[0-9.]+/, "");
    const dec = final.indexOf(".") > -1 ? 1 : 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let t0: number | null = null;
        const step = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min(1, (ts - t0) / 1200);
          const e = 1 - Math.pow(1 - p, 3);
          setText(pre + (num * e).toFixed(dec) + suf);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [final]);

  return (
    <div className="v" ref={ref}>
      {text}
    </div>
  );
}

export default function About() {
  const { go, openSlide } = useSite();

  return (
    <section className="page on">
      <PageHead
        seed="kh-about"
        title="About Keyhorse"
        lede="The venture arm of the Kentucky Science and Technology Corporation, working alongside the Cabinet for Economic Development and the KYInnovation network."
      />

      <div className="band">
        <Rv>
          <div className="two">
            <div>
              <p className="lbl">What we are</p>
              <h2 style={{ marginBottom: 20 }}>
                An investor and a publication, run by the same team.
              </h2>
              <p className="lede">
                Keyhorse invests in tech-enabled startups based in Kentucky. We also
                report on the market we invest in — every disclosed round in the
                Commonwealth, the funds forming, the programs opening, and the
                industries where the state has a real advantage.
              </p>
              <p className="lede" style={{ marginTop: 14 }}>
                The reporting is not marketing for the fund. It is open to anyone, it
                covers companies we have nothing to do with, and it is the reason
                people pay attention when we are not writing a check.
              </p>
            </div>
            <div>
              <p className="lbl">Our goals</p>
              <div>
                {GOALS.map(([n, t, d]) => (
                  <MRow key={n} n={n} t={t} d={d} />
                ))}
              </div>
            </div>
          </div>
        </Rv>
      </div>

      <div className="band band--ink">
        <Rv>
          <p className="lbl">Where we sit</p>
          <div className="two" style={{ marginTop: 8 }}>
            <div>
              <h2 className="w" style={{ marginBottom: 18 }}>
                Public capital, public record.
              </h2>
              <p className="lede">
                Our capital comes from the Commonwealth and the U.S. Treasury's State
                Small Business Credit Initiative. That carries an obligation to
                report, which is unusual for a venture firm and is the foundation the
                publication is built on.
              </p>
            </div>
            <div>
              {RELS.map(([t, d], i) => (
                <MRow key={t} n={`0${i + 1}`} t={t} d={d} ink />
              ))}
            </div>
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv>
          <p className="lbl">Track record</p>
          <div className="hstats">
            {STATS.map(([disp, , , , k]) => (
              <div className="s" key={disp}>
                <CountUp final={disp} />
                <div className="k">{k}</div>
              </div>
            ))}
          </div>
        </Rv>
      </div>

      <div className="band band--tint">
        <Rv>
          <Head label="The funds" title="How the capital is organised.">
            <button className="btn cy" onClick={() => go("apply")}>
              Criteria &amp; process
            </button>
          </Head>
          <div className="ind">
            {FUNDS_GEN.map(([n, d, seed, m]) => (
              <div className="icard" key={n} onClick={() => go("apply")}>
                <Box seed={seed} w={900} h={560} />
                <div className="bd">
                  <div className="nm">{n}</div>
                  <div className="d">{d}</div>
                  <div className="k">{m}</div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="reqbar"
            style={{ borderTop: "1px solid var(--line)", marginTop: 22 }}
          >
            <b>Every fund requires</b>
            <span>Tech-enabled</span>
            <span>Kentucky-based</span>
          </div>
        </Rv>
      </div>

      <div className="band">
        <Rv>
          <Head label="Team" title="Who runs it." />
          <div className="roster">
            {TEAM.map(([n, r, f], i) => (
              <div
                className="rrow"
                key={n}
                onClick={() => openSlide(<PersonSlide i={i} />)}
              >
                <div className="rn">{n}</div>
                <div className="rm">
                  <span className="rr">{r}</span>
                  <span className="rx">{f}</span>
                </div>
              </div>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
}
