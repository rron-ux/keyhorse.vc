import { useMemo, useState } from "react";

type Item = {
  group: string;
  title: string;
  desc: string;
  format: string;
  date: string;
};

const ITEMS: Item[] = [
  { group: "Frameworks", title: "Investment Process Checklist", desc: "Every diligence item and task, stage by stage.", format: "PDF", date: "Jan 2026" },
  { group: "Frameworks", title: "Term sheet primer", desc: "Plain-English walkthrough of the terms you will see from us.", format: "PDF", date: "Jan 2026" },
  { group: "Frameworks", title: "Investment scorecard", desc: "The scorecard we actually use when we assess a company.", format: "PDF", date: "Nov 2025" },
  { group: "Reports", title: "Kentucky Venture Report", desc: "The annual record of every round, fund and program in the state.", format: "PDF", date: "Feb 2026" },
  { group: "Reports", title: "Kentucky ecosystem map", desc: "Accelerators, universities, support organisations and co-investors.", format: "Notion", date: "Mar 2026" },
  { group: "Tools", title: "Cap table template", desc: "A clean starting point with common scenarios modelled.", format: "XLSX", date: "Sep 2025" },
  { group: "Tools", title: "Data room checklist", desc: "What to have ready before diligence starts.", format: "PDF", date: "Sep 2025" },
  { group: "Tools", title: "Financial model template", desc: "Three statements, driver-based, built for a seed raise.", format: "XLSX", date: "Oct 2025" },
  { group: "Video", title: "Raising your first round — full session", desc: "Recording, slides and takeaways.", format: "Video", date: "Apr 2026" },
  { group: "Video", title: "Founder features", desc: "Long-form profiles of companies building here.", format: "Video", date: "Ongoing" },
  { group: "Sessions", title: "Venture Sessions calendar", desc: "Where we will be next, and how to register.", format: "Link", date: "Ongoing" },
  { group: "Ecosystem", title: "StartupKY Navigator", desc: "The statewide map of programs, funders and support organisations. Built by us, open to everyone.", format: "Notion", date: "Ongoing" },
  { group: "Ecosystem", title: "InnovateKentucky", desc: "The KY Innovation network — regional hubs, programs and state resources.", format: "Link", date: "Ongoing" },
  { group: "Ecosystem", title: "Regional front doors", desc: "Amplify · Awesome Inc · Blue North · CREATE · Sprocket · SOAR.", format: "Link", date: "Ongoing" },
  { group: "Ecosystem", title: "Angel & investor networks", desc: "Bluegrass Angels · Kentucky Angels · Louisville Angel Network · Tri-State · Appalachian Investors Alliance.", format: "Link", date: "Ongoing" },
];

const GROUPS = ["Frameworks", "Reports", "Tools", "Video", "Sessions", "Ecosystem"] as const;
const CHIPS = ["All", ...GROUPS] as const;

export default function Resources() {
  const [chip, setChip] = useState<string>("All");
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = ITEMS.filter(
      (i) =>
        (chip === "All" || i.group === chip) &&
        (!needle ||
          i.title.toLowerCase().includes(needle) ||
          i.desc.toLowerCase().includes(needle)),
    );
    return GROUPS.map((g) => [g, filtered.filter((i) => i.group === g)] as const).filter(
      ([, list]) => list.length > 0,
    );
  }, [chip, q]);

  return (
    <section className="page on">
      <div className="wrap rsc">
        <div className="rsc-lab">
          <span className="t">Resources</span>
          <span className="line" />
          <span>Keyhorse Capital</span>
        </div>
        <h1 className="rsc-h1">The library.</h1>
        <p className="rsc-sub">
          Frameworks, templates, recordings and reports, including the checklists we use
          ourselves. Free, no form, and open to any Kentucky founder rather than only the
          portfolio.
        </p>

        <div className="rsc-bar">
          <div className="rsc-chips">
            {CHIPS.map((c) => (
              <button key={c} aria-pressed={chip === c} onClick={() => setChip(c)}>
                {c}
              </button>
            ))}
          </div>
          <input
            className="rsc-search"
            type="search"
            placeholder="Search"
            aria-label="Search the library"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {grouped.length ? (
          grouped.map(([g, list]) => (
            <div key={g}>
              <div className="rsc-gh">
                <span className="gt">{g}</span>
                <span className="gl" />
              </div>
              {list.map((i) => (
                <button className="rsc-row" key={i.title} type="button">
                  <span className="cell">
                    <span className="ti">{i.title}</span>
                    <span className="ds">{i.desc}</span>
                  </span>
                  <span className="fm">{i.format}</span>
                  <span className="yr">{i.date}</span>
                  <span className="op">Open →</span>
                </button>
              ))}
            </div>
          ))
        ) : (
          <p className="rsc-empty">Nothing here yet for that search.</p>
        )}

        <div className="rsc-foot">
          <p>
            Something missing, or a template you would find useful? Most of what is here
            started as a request from a founder.
          </p>
          <span>Suggest a resource →</span>
        </div>
      </div>
    </section>
  );
}
