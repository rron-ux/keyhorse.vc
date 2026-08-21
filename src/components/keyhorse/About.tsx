import { useEffect, useState } from "react";
import { useSite } from "./shared";
import { FOUNDER_PORTRAITS, HERO_FRAMES } from "@/lib/images";
import logoAsset from "@/assets/keyhorse-horizontal.png.asset.json";

const FIGURES: [string, string][] = [
  ["600+", "companies funded across all sub funds, grants and investments"],
  ["$100M+", "invested in Kentucky companies"],
  ["$3.3B+", "follow-on capital raised by portfolio companies"],
  ["800+", "jobs created by founders (active portfolio only)"],
];

const FACTS: [string, string][] = [
  ["Founded", "2001"],
  ["Structure", "Evergreen"],
  ["Stage", "Pre-seed → Series A+"],
  ["Industry focus", "Agnostic"],
];

type Person = {
  name: string;
  role: string;
  bio: string;
  focus: string;
  location: string;
};

const PEOPLE: Person[] = [
  {
    name: "Kelby Price",
    role: "Managing Partner",
    bio: "Leads the investment committee and the firm's direct investing across all three funds.",
    focus: "Investment committee",
    location: "Lexington, KY",
  },
  {
    name: "Autumn Rice",
    role: "Director of Operations",
    bio: "Runs the day-to-day operations of the firm and the application pipeline.",
    focus: "Fund operations",
    location: "Lexington, KY",
  },
  {
    name: "Eugene Yang",
    role: "Fund Operations Director",
    bio: "Oversees fund accounting, reporting and compliance across the portfolio.",
    focus: "Reporting and compliance",
    location: "Louisville, KY",
  },
  {
    name: "Devin Morris",
    role: "Strategic Communications",
    bio: "Handles communications for the firm and the companies it backs.",
    focus: "Communications",
    location: "Louisville, KY",
  },
  {
    name: "Bobby Riley",
    role: "Platform Manager",
    bio: "Connects portfolio companies to customers, co-investors and senior hires.",
    focus: "Portfolio support",
    location: "Lexington, KY",
  },
  {
    name: "Rron Thaci",
    role: "Associate",
    bio: "Sources new companies and runs diligence on direct investments.",
    focus: "Sourcing and diligence",
    location: "Lexington, KY",
  },
  {
    name: "Zimri Rodriguez",
    role: "Venture Programs Coordinator",
    bio: "Coordinates the partner programs that feed the Discovery Fund.",
    focus: "Programs and sessions",
    location: "Covington, KY",
  },
  {
    name: "Aditya Padmaraj",
    role: "Analyst",
    bio: "Tracks market data across Kentucky rounds, funds and sectors.",
    focus: "Market data",
    location: "Lexington, KY",
  },
];

function LabelRow({ left, right }: { left: string; right?: string }) {
  return (
    <div className="abt-lrow">
      <span className="abt-lleft">{left}</span>
      <span className="abt-lrule" />
      {right ? <span className="abt-lright">{right}</span> : null}
    </div>
  );
}

function TeamModal({ p, i, onClose }: { p: Person; i: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const img = FOUNDER_PORTRAITS[i % FOUNDER_PORTRAITS.length]!;

  return (
    <div className="abt-scrim" onClick={onClose}>
      <div
        className="abt-modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="abt-x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <img src={img.src} alt={p.name} />
        <div className="abt-mbd">
          <h3>{p.name}</h3>
          <p className="abt-mrole">{p.role}</p>
          <p className="abt-mbio">{p.bio}</p>
          <div className="abt-kv">
            <span>Focus area</span>
            <span>{p.focus}</span>
          </div>
          <div className="abt-kv">
            <span>Location</span>
            <span>{p.location}</span>
          </div>
          <div className="abt-mbtns">
            <a
              className="btn cy"
              href="https://www.linkedin.com/company/keyhorse-capital/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a className="btn g" href="mailto:hello@keyhorse.vc">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { go } = useSite();
  const [open, setOpen] = useState<number | null>(null);
  const closing = HERO_FRAMES[0]!;

  return (
    <section className="page on abt">
      {/* 1 · Hero */}
      <div className="abt-sec abt-sec--hero">
        <img
          className="abt-hero-logo"
          src={logoAsset.url}
          alt=""
          aria-hidden="true"
        />
        <div className="wrap">
          <div className="abt-hero2">
            <div>
              <LabelRow left="About" right="Keyhorse Capital" />
              <h1 className="abt-h1">Go the distance.</h1>
              <p className="abt-dek">
                Keyhorse Capital invests seed and early stage venture capital
                focused on supporting a thriving community of entrepreneurs
                willing to build and scale innovative companies and bring value
                to Kentucky. We back exceptional founders across industries and
                sectors, from a first cheque through growth.
              </p>
              <div className="abt-tlinks">
                <button type="button" className="abt-tlink" onClick={() => go("apply")}>
                  Apply for investment →
                </button>
                <button
                  type="button"
                  className="abt-tlink"
                  onClick={() => go("industries")}
                >
                  The industries →
                </button>
              </div>
            </div>
            <div className="abt-facts">
              {FACTS.map(([k, v]) => (
                <div className="abt-fact" key={k}>
                  <span className="abt-fk">{k}</span>
                  <span className="abt-fv">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2 · Numbers */}
      <div className="abt-sec abt-sec--tight">
        <div className="wrap">
          <div className="abt-nums">
            {FIGURES.map(([n, l]) => (
              <div className="abt-ncell" key={l}>
                <div className="abt-nv">{n}</div>
                <div className="abt-nl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 · Thesis */}
      <div className="abt-sec" id="thesis">
        <div className="wrap">
          <LabelRow left="Thesis" right="What we invest in · Our approach" />
          <div className="abt-th2">
            <h2 className="abt-thh">
              We invest in any tech-enabled company here.{" "}
              <strong>We concentrate where the state has an edge.</strong>
            </h2>
            <div>
              <p className="abt-thp">
                We believe entrepreneurs pursuing big bets and scalable businesses
                are vital to our community's health and success. We invest in early
                and growth stage companies and technologies across industries and
                sectors, supporting exceptional founders with a vision to go the
                distance.
              </p>
              <p className="abt-thp">
                We take on financial risk and venture with founders and their
                companies in hopes they have a successful run building and scaling
                new businesses in Kentucky. We work with investors, subject matter
                experts and strategic partners to help founders gain early wins and
                growth — and our growth fund weights toward the industries where the
                Commonwealth holds an advantage that is hard to copy.
              </p>
              <button
                type="button"
                className="abt-tlink"
                onClick={() => go("industries")}
              >
                Where we weight →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 · Team */}
      <div className="abt-sec" id="team">
        <div className="wrap">
          <LabelRow left="Team" right="Lexington · Louisville · Covington" />
          <div className="abt-team2">
            {PEOPLE.map((p, i) => {
              const img = FOUNDER_PORTRAITS[i % FOUNDER_PORTRAITS.length]!;
              return (
                <button
                  type="button"
                  className="abt-pcard"
                  key={p.name}
                  onClick={() => setOpen(i)}
                >
                  <span className="abt-pimg">
                    <img src={img.src} alt={p.name} loading="lazy" />
                  </span>
                  <span className="abt-pn">{p.name}</span>
                  <span className="abt-pr">{p.role}</span>
                  <span className="abt-pv">View profile →</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5 · Closing */}
      <div className="abt-close2" id="apply">
        <img className="abt-close2-bg" src={closing.src} alt="" aria-hidden="true" />
        <div className="wrap abt-close2-in">
          <h2>
            Building something exceptional{" "}
            <strong>in Kentucky?</strong>
          </h2>
          <div className="abt-tlinks">
            <button type="button" className="abt-tlink w" onClick={() => go("apply")}>
              Apply →
            </button>
            <button
              type="button"
              className="abt-tlink w"
              onClick={() => go("partners")}
            >
              Talk to us first →
            </button>
          </div>
        </div>
      </div>

      {open !== null ? (
        <TeamModal p={PEOPLE[open]!} i={open} onClose={() => setOpen(null)} />
      ) : null}
    </section>
  );
}
