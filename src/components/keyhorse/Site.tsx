import { useCallback, useEffect, useState, type ReactNode } from "react";
import { PAGES } from "@/data/keyhorse";
import { SiteContext, type PageId } from "./shared";
import Home from "./Home";
import About from "./About";
import Industries from "./Industries";
import Companies from "./Companies";
import Media from "./Media";
import Resources from "./Resources";
import Partners from "./Partners";
import Apply from "./Apply";

const VIEWS: Record<PageId, () => ReactNode> = {
  home: Home,
  about: About,
  industries: Industries,
  companies: Companies,
  media: Media,
  resources: Resources,
  partners: Partners,
  apply: Apply,
};

export default function Site() {
  const [page, setPage] = useState<PageId>("home");
  const [slide, setSlide] = useState<ReactNode>(null);
  const [progress, setProgress] = useState(0);

  const closeSlide = useCallback(() => setSlide(null), []);

  const go = useCallback(
    (id: PageId) => {
      setPage(id);
      window.scrollTo(0, 0);
      closeSlide();
    },
    [closeSlide],
  );

  const jump = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight || 1));
      setAtTop(h.scrollTop < window.innerHeight - 90);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSlide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeSlide]);

  const View = VIEWS[page];

  return (
    <SiteContext.Provider
      value={{ page, go, jump, openSlide: setSlide, closeSlide }}
    >
      <header className={page === "home" && atTop ? "over" : ""}>
        <div className="wrap nav">
          <img
            className="logo"
            src="/keyhorse-logo.png"
            alt="Keyhorse Capital"
            onClick={() => go("home")}
          />
          <nav className="links">

            {PAGES.map(([id, l]) => (
              <button
                key={id}
                onClick={() => go(id as PageId)}
                aria-current={page === id ? "true" : "false"}
              >
                {l}
              </button>
            ))}
          </nav>
          <button className="btn" onClick={() => go("apply")}>
            Apply
          </button>
        </div>
        <div id="prog" style={{ width: `${progress * 100}%` }} />
      </header>

      <main key={page}>
        <View />
      </main>

      <footer>
        <div className="wrap">
          <div className="frow">
            <div>
              <div className="fn" style={{ maxWidth: "38ch" }}>
                An initiative of the Kentucky Science and Technology Corporation, in
                partnership with the Cabinet for Economic Development and
                KYInnovation.
              </div>
            </div>
            <div>
              <div className="fh">Read</div>
              <div className="fn">
                Industries
                <br />
                Perspectives
                <br />
                Companies
                <br />
                Resources
              </div>
            </div>
            <div>
              <div className="fh">Work with us</div>
              <div className="fn">
                About
                <br />
                Partners
                <br />
                Apply
                <br />
                Team
              </div>
            </div>
            <div>
              <div className="fh">Elsewhere</div>
              <div className="fn">
                Instagram
                <br />
                LinkedIn
                <br />X<br />
                Newsletter
              </div>
            </div>
          </div>
          <div className="legal">
            <b>Important disclosures — placeholder, subject to counsel review</b>
            This site is for informational purposes only. Nothing here constitutes a
            solicitation, offer, recommendation, or endorsement of any security or
            investment. Coverage of a company does not indicate that Keyhorse has
            invested or would invest. Portfolio companies shown are not
            representative of all investments; past performance does not indicate
            future results. Concept mockup — not a live site. Photography is
            reference only. Names and quotes are placeholder. © 2026 Keyhorse
            Capital.
          </div>
        </div>
      </footer>

      <div
        className={`scrim2${slide ? " on" : ""}`}
        onClick={closeSlide}
      />
      <aside className={`slide${slide ? " on" : ""}`} aria-hidden={!slide}>
        <button className="close" onClick={closeSlide} aria-label="Close">
          ×
        </button>
        <div>{slide}</div>
      </aside>
    </SiteContext.Provider>
  );
}
