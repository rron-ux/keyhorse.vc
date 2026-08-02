import { bySlug, ARTICLES, CONTAIN } from "@/data/articles";
import { SERIES } from "@/data/media";
import { Rv, useSite } from "./shared";

/** Minimal inline markdown → JSX (links, bold, italic). */
function inline(src: string, key: string) {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*_([^_]+)_\*\*|\*\*([^*]+)\*\*|_([^_]+)_/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1])
      out.push(
        <a key={k} href={m[2]} target="_blank" rel="noreferrer">
          {m[1].replace(/[_*]/g, "")}
        </a>,
      );
    else if (m[3]) out.push(<strong key={k}><em>{m[3]}</em></strong>);
    else if (m[4]) out.push(<strong key={k}>{m[4]}</strong>);
    else out.push(<em key={k}>{m[5]}</em>);
    last = re.lastIndex;
  }
  out.push(src.slice(last));
  return out;
}

function Body({ lines }: { lines: string[] }) {
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: string) => {
    if (!list.length) return;
    nodes.push(
      <ul className="art-ul" key={`ul-${k}`}>
        {list.map((li, i) => (
          <li key={i}>{inline(li, `${k}-${i}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  lines.forEach((raw, i) => {
    const k = String(i);
    if (/^[-*]\s+/.test(raw)) {
      list.push(raw.replace(/^[-*]\s+/, ""));
      return;
    }
    flush(k);
    if (raw.startsWith("### ")) {
      nodes.push(<h3 key={k}>{inline(raw.slice(4).replace(/\*\*/g, ""), k)}</h3>);
    } else if (raw.startsWith("## ")) {
      nodes.push(<h2 key={k}>{inline(raw.slice(3).replace(/\*\*/g, ""), k)}</h2>);
    } else if (raw.startsWith("> ")) {
      nodes.push(
        <blockquote className="art-q" key={k}>
          {inline(raw.slice(2), k)}
        </blockquote>,
      );
    } else {
      nodes.push(<p key={k}>{inline(raw, k)}</p>);
    }
  });
  flush("end");
  return <>{nodes}</>;
}

export default function Post({ slug }: { slug: string }) {
  const a = bySlug(slug);
  const { go, openPost } = useSite();

  if (!a)
    return (
      <section className="page on">
        <div className="band">
          <Rv>
            <h2>Story not found.</h2>
            <button className="btn" style={{ marginTop: 18 }} onClick={() => go("media")}>
              Back to Media
            </button>
          </Rv>
        </div>
      </section>
    );

  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <section className="page on art">
      <div className="band">
        <Rv>
          <button className="art-back" onClick={() => go("media")}>
            ← Media
          </button>
          <div className="k" style={{ color: SERIES[a.series].color }}>
            {SERIES[a.series].label}
          </div>
          <h1 className="art-title">{a.title}</h1>
          <div className="art-date">{a.date}</div>
          <div className="art-cover">
            <img
              src={a.cover}
              alt={a.title}
              loading="lazy"
              style={CONTAIN.has(a.slug) ? { objectFit: "contain", background: "#222222" } : undefined}
            />
          </div>
          <div className="art-body">
            <Body lines={a.body} />
          </div>
          <div className="art-cta">
            <button className="btn" onClick={() => go("apply")}>
              Apply for investment
            </button>
            <button className="btn g" onClick={() => go("media")}>
              More stories
            </button>
          </div>

          <div className="art-more">
            {more.map((m) => (
              <button
                className="art-mcard"
                key={m.slug}
                onClick={() => openPost(m.slug)}
                style={{ ["--sc" as string]: SERIES[m.series].color }}
              >
                <img
                  src={m.cover}
                  alt={m.title}
                  loading="lazy"
                  style={CONTAIN.has(m.slug) ? { objectFit: "contain", background: "#222222" } : undefined}
                />
                <div className="k" style={{ color: SERIES[m.series].color }}>
                  {SERIES[m.series].label}
                </div>
                <h3>{m.title}</h3>
                <div className="dt">{m.date}</div>
              </button>
            ))}
          </div>
        </Rv>
      </div>
    </section>
  );
}
