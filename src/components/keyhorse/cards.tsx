import { Box, statusLabel, useSite } from "./shared";
import { COS, POSTS, TEAM } from "@/data/keyhorse";

export function PostCard({ p, i }: { p: (typeof POSTS)[number]; i: number }) {
  const { go } = useSite();
  return (
    <article className="card" onClick={() => go("media")}>
      <Box seed={`kh-post${i}`} w={900} h={560} />
      <div className="k">
        {p.k === "deal" ? "Round" : p.k === "note" ? "Market note" : "Feature"}
      </div>
      <h3>{p.t}</h3>
      <div className="dt">{p.d}</div>
    </article>
  );
}

export function PCell({ n, ty }: { n: string; ty: string }) {
  return (
    <div className="pcell">
      <div className="mark">{n.replace(/[[\]]/g, "").trim()[0]}</div>
      <div className="nm">{n}</div>
      <div className="ty">{ty}</div>
    </div>
  );
}

export function CompanySlide({ i }: { i: number }) {
  const [n, s, l, x] = COS[i % COS.length]!;
  return (
    <>
      <Box seed={`kh-co${i}`} w={900} h={560} cap="Company image" />
      <div className="bd">
        <h3>{n}</h3>
        <div className="role">{statusLabel(x)}</div>
        <p style={{ color: "var(--kh-muted)", fontSize: 13.5 }}>
          Placeholder description.
        </p>
        <div className="kv">
          <span>Sector</span>
          <span>{s}</span>
        </div>
        <div className="kv">
          <span>Headquarters</span>
          <span>{l}, KY</span>
        </div>
        <div className="kv">
          <span>Latest round</span>
          <span>[Stage, year]</span>
        </div>
        <div className="kv">
          <span>Investors</span>
          <span>[List]</span>
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 9 }}>
          <button className="btn g">Company site</button>
          <button className="btn g">Coverage</button>
        </div>
      </div>
    </>
  );
}

export function PersonSlide({ i }: { i: number }) {
  const [n, r, f] = TEAM[i]!;
  return (
    <div className="bd" style={{ paddingTop: 44 }}>
      <h3>{n}</h3>
      <div className="role">{r}</div>
      <div className="kv">
        <span>Focus area</span>
        <span>{f}</span>
      </div>
      <p style={{ color: "var(--kh-muted)", fontSize: 13.5 }}>
        Placeholder biography.
      </p>
      <div className="kv">
        <span>Focus</span>
        <span>[Sectors, stage]</span>
      </div>
      <div className="kv">
        <span>Based</span>
        <span>[City], KY</span>
      </div>
    </div>
  );
}

export function CompanyWall({ count }: { count: number }) {
  const { openSlide } = useSite();
  return (
    <>
      {COS.slice(0, count).map((c, i) => (
        <div
          key={c[0]}
          className="wcell"
          onClick={() => openSlide(<CompanySlide i={i} />)}
        >
          {c[0]}
        </div>
      ))}
    </>
  );
}
