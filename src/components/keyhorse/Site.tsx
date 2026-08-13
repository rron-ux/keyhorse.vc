import { useCallback, useEffect, useState, type ReactNode } from "react";
import { PAGES } from "@/data/keyhorse";
import khLogo from "@/assets/keyhorse-horizontal-light.png.asset.json";
import kstcLogo from "@/assets/kstc-white.png.asset.json";
import cedLogo from "@/assets/ced-white.png.asset.json";
import kyiLogo from "@/assets/kyinnovation-white.png.asset.json";
import { SiteContext, type PageId } from "./shared";

import Home from "./Home";
import About from "./About";
import Industries from "./Industries";
import Companies from "./Companies";
import Media from "./Media";
import Resources from "./Resources";
import Partners from "./Partners";
import Apply from "./Apply";
import Record from "./Record";
import Post from "./Post";

const VIEWS: Record<Exclude<PageId, "post">, () => ReactNode> = {
  home: Home,
  about: About,
  industries: Industries,
  companies: Companies,
  media: Media,
  resources: Resources,
  partners: Partners,
  apply: Apply,
  record: Record,
};

export default function Site({
  initialPage = "home",
  initialSlug = "",
}: { initialPage?: PageId; initialSlug?: string } = {}) {
  const [page, setPage] = useState<PageId>(initialPage);
  const [slug, setSlug] = useState(initialSlug);
  const [slide, setSlide] = useState<ReactNode>(null);
  const [progress, setProgress] = useState(0);
  const [pendingCompany, setPendingCompany] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("company") || "";
  });

  const closeSlide = useCallback(() => setSlide(null), []);

  const go = useCallback(
    (id: PageId, search?: string) => {
      const path =
        id === "home"
          ? "/"
          : id === "record"
            ? "/media/record"
            : `/${id}${search || ""}`;
      window.history.pushState({}, "", path);
      setPendingCompany(
        new URLSearchParams(search || "").get("company") || "",
      );
      setPage(id);
      window.scrollTo(0, 0);
      closeSlide();
    },
    [closeSlide],
  );

  const openPost = useCallback(
    (s: string) => {
      window.history.pushState({}, "", `/media/${s}`);
      setSlug(s);
      setPage("post");
      window.scrollTo(0, 0);
      closeSlide();
    },
    [closeSlide],
  );


  const jump = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Navigate to a page, then scroll to a section once it has rendered.
  const goSection = useCallback(
    (id: PageId, anchor: string) => {
      go(id);
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 40) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    },
    [go],
  );


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

  const View = page === "post" ? null : VIEWS[page];

  return (
    <SiteContext.Provider
      value={{ page, go, jump, openSlide: setSlide, closeSlide, openPost, pendingCompany }}
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

      <main key={page + slug} className={page === "home" ? "" : "pt-nav"}>
        {View ? <View /> : <Post slug={slug} />}
      </main>


      <footer>
        <div className="wrap">
          <div className="frow">
            <div>
              <img
                className="flogo"
                src={khLogo.url}
                alt="Keyhorse Capital"
                onClick={() => go("home")}
              />
              <div className="fn" style={{ maxWidth: "38ch" }}>
                An initiative of the Kentucky Science and Technology Corporation, in
                partnership with the Cabinet for Economic Development and
                KYInnovation.
              </div>
              <div className="fpartners">
                <div className="fpart">
                  <span className="fpl">An initiative of</span>
                  <a href="https://www.kstc.com" target="_blank" rel="noreferrer noopener">
                    <img src={kstcLogo.url} alt="Kentucky Science and Technology Corporation" />
                  </a>
                </div>
                <div className="fpart">
                  <span className="fpl">In partnership with</span>
                  <div className="fprow">
                    <a href="https://ced.ky.gov" target="_blank" rel="noreferrer noopener">
                      <img src={cedLogo.url} alt="Team Kentucky Cabinet for Economic Development" />
                    </a>
                    <a href="https://kyinnovation.com" target="_blank" rel="noreferrer noopener">
                      <img className="kyi" src={kyiLogo.url} alt="KY Innovation" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="fh">PAGES</div>
              <div className="fn">
                <div onClick={() => go("industries")}>Industries</div>
                <div onClick={() => go("companies")}>Portfolio</div>
                <div onClick={() => go("media")}>Media</div>
                <div onClick={() => goSection("media", "record")}>The Record</div>
                <div onClick={() => go("record")}>Record archive</div>
                <div onClick={() => go("resources")}>Resources</div>
                <div onClick={() => goSection("resources", "res")}>Resource library</div>
                <div onClick={() => go("partners")}>Partners</div>
                <div onClick={() => goSection("partners", "become")}>Become a partner</div>
                <div onClick={() => goSection("partners", "network")}>The network</div>
              </div>
            </div>
            <div>
              <div className="fh">Work with us</div>
              <div className="fn">
                <div onClick={() => go("about")}>About</div>
                <div onClick={() => goSection("about", "team")}>Team</div>
                <div onClick={() => goSection("about", "funds")}>The funds</div>
                <div onClick={() => go("apply")}>Apply</div>
                <div onClick={() => goSection("apply", "criteria-apply")}>Criteria</div>
                <div onClick={() => goSection("partners", "enquiry")}>Enquiries</div>
              </div>
            </div>

            <div>
              <div className="fh">Contact</div>
              <div className="fn">
                <div className="fc">
                  <b>Mailing Address</b>
                  <span>PO Box 1049</span>
                  <span>Lexington, KY 40588</span>
                </div>
                <div className="fc">
                  <b>Office Locations</b>
                  <span><strong>Story</strong></span>
                  <span>828 E. Market St. Ste. 212</span>
                  <span>Louisville, KY</span>
                  <span><strong>SparkHaus</strong></span>
                  <span>727 Madison Ave</span>
                  <span>Covington, KY</span>
                  <span><strong>Dudley Square</strong></span>
                  <span>380 S Mill St, Ste 300</span>
                  <span>Lexington, KY</span>
                </div>
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
