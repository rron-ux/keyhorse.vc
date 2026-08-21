import { ARTICLES, bySlug, initialsOf, relatedTo, sectorFor } from "@/data/articles";
import { CAT_COLOR, TAG_LABEL } from "./Media";
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
          {inline(raw.slice(2).replace(/\*\*|_/g, ""), k)}
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
      <section className="page on art">
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

  const c = CAT_COLOR[a.category];
  const more = relatedTo(a, 3);
  const sector = sectorFor(a.company);

  return (
    <section className="page on art" style={{ ["--sc" as string]: c }}>
      <div className="art-hero">
        {a.cover ? (
          <img className="art-hero-img" src={a.cover} alt={a.person || a.title} />
        ) : (
          <div className="art-hero-img art-hero-fill" style={{ background: c }} />
        )}
        <div className="art-hero-scrim" />
        <div className="wrap art-hero-in">
          <button className="art-back" onClick={() => go("media")}>
            ← Media
          </button>
          <span className="art-tag">{TAG_LABEL[a.series]}</span>
          <h1 className="art-title">{a.title}</h1>
        </div>
      </div>

      <div className="art-metabar">
        <div className="wrap art-metabar-in">
          <span className="art-avatar" style={{ background: c }}>
            {a.cover && a.category !== "announcements" ? (
              <img src={a.cover} alt="" />
            ) : (
              initialsOf(a.person || a.company || "Keyhorse Capital")
            )}
          </span>
          <div className="art-meta-who">
            <b>{a.person || "Keyhorse Capital"}</b>
            {a.company ? (
              <button
                className="art-colink"
                onClick={() => go("portfolio")}
              >
                {a.company} →
              </button>
            ) : null}
          </div>
          <span className="art-meta-dt">{a.date}</span>
        </div>
      </div>

      <div className="band">
        <Rv>
          <p className="art-stand">{a.standfirst}</p>
          <div className="art-body">
            <Body lines={a.body} />
          </div>

          <p className="art-src">
            Originally published at{" "}
            <a href={a.sourceUrl} target="_blank" rel="noreferrer">
              keyhorse.vc
            </a>
          </p>
          <div className="art-cta">
            <button className="btn" onClick={() => go("apply")}>
              Apply for investment
            </button>
            <button className="btn g" onClick={() => go("media")}>
              More stories
            </button>
          </div>

          {more.length ? (
            <>
              <p className="lbl art-morelbl">Related</p>
              <div className="art-more">
                {more.map((m) => (
                  <button
                    className="art-mcard"
                    key={m.slug}
                    onClick={() => openPost(m.slug)}
                    style={{ ["--sc" as string]: CAT_COLOR[m.category] }}
                  >
                    <div className="art-mimg">
                      {m.cover ? (
                        <img src={m.cover} alt={m.title} loading="lazy" />
                      ) : (
                        <span>{initialsOf(m.person || m.company || m.title)}</span>
                      )}
                    </div>
                    <div className="k">{TAG_LABEL[m.series]}</div>
                    <h3>{m.title}</h3>
                    <div className="dt">{m.date}</div>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </Rv>
      </div>
    </section>
  );
}

export const ALL_SLUGS = ARTICLES.map((a) => a.slug);
