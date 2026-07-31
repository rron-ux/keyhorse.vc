/**
 * Central image registry. No external placeholder services — every image
 * resolves to a project asset with descriptive alt text.
 */
import logisticsAsset from "@/assets/logistics.jpg.asset.json";
import manufacturingAsset from "@/assets/manufacturing.jpg.asset.json";
import healthcareAsset from "@/assets/healthcare.jpg.asset.json";
import energyAsset from "@/assets/energy.jpg.asset.json";
import agricultureAsset from "@/assets/agriculture.jpg.asset.json";

import heroCargo from "@/assets/hero-cargo.jpg";
import heroFactory from "@/assets/hero-factory.jpg";
import heroBluegrass from "@/assets/hero-bluegrass.jpg";
import missionHorse from "@/assets/mission-horsecountry.jpg";
import founderFeature from "@/assets/founder-feature.jpg";
import mediaRelocation from "@/assets/media-relocation.jpg";
import mediaAerial from "@/assets/media-aerial.jpg";
import mediaConveyor from "@/assets/media-conveyor.jpg";

import f1 from "@/assets/founders/f1.jpg";
import f2 from "@/assets/founders/f2.jpg";
import f3 from "@/assets/founders/f3.jpg";
import f4 from "@/assets/founders/f4.jpg";
import f5 from "@/assets/founders/f5.jpg";
import f6 from "@/assets/founders/f6.jpg";
import f7 from "@/assets/founders/f7.jpg";
import f8 from "@/assets/founders/f8.jpg";
import f9 from "@/assets/founders/f9.jpg";

export type Pic = { src: string; alt: string; cap?: string };

/** Nine founder portraits, greyscale by default, colour on hover. */
export const FOUNDER_PORTRAITS: Pic[] = [
  { src: f1, alt: "Founder standing in her robotics workshop beside robotic arms" },
  { src: f2, alt: "Founder in work clothes on the floor of his machine shop" },
  { src: f3, alt: "Founder in a lab coat inside her biotech laboratory" },
  { src: f4, alt: "Founder among oak barrels in a distillery rickhouse" },
  { src: f5, alt: "Founder in a logistics warehouse with racking and pallets" },
  { src: f6, alt: "Founder at a hardware test bench surrounded by circuit boards" },
  { src: f7, alt: "Founder standing beside a tractor at the edge of a field" },
  { src: f8, alt: "Founder in a safety vest inside a battery materials plant" },
  { src: f9, alt: "Founder in a clinic space with patient monitoring screens" },
];

/** Three crossfading hero frames — first one is the LCP image. */
export const HERO_FRAMES: Pic[] = [
  {
    src: heroCargo,
    alt: "Freighter aircraft being loaded at a floodlit air cargo apron at dusk",
  },
  {
    src: heroFactory,
    alt: "Factory floor mid-shift with machining centres in operation",
  },
  {
    src: heroBluegrass,
    alt: "Bluegrass farmland with horses grazing behind black plank fencing at low sun",
  },
];

export const PICS: Record<string, Pic> = {
  /* Five pillars */
  "kh-log": {
    src: logisticsAsset.url,
    alt: "Freight truck on a highway at sunset",
    cap: "Logistics & Trade",
  },
  "kh-mfg": {
    src: manufacturingAsset.url,
    alt: "CNC laser cutting sheet metal with sparks",
    cap: "Advanced Manufacturing, Aerospace & Defense",
  },
  "kh-health": {
    src: healthcareAsset.url,
    alt: "Two clinicians reviewing medical imaging on monitors",
    cap: "Health & Care",
  },
  "kh-ev": {
    src: energyAsset.url,
    alt: "Wind turbines on rolling hills at dusk",
    cap: "Energy, Materials & Climate",
  },
  "kh-ag": {
    src: agricultureAsset.url,
    alt: "Aerial view of a tractor working a field",
    cap: "Agriculture, Food & Consumer",
  },

  /* Homepage */
  "kh-kentucky": {
    src: missionHorse,
    alt: "Horses at pasture behind black plank fencing in Kentucky limestone country at early morning",
    cap: "Kentucky horse country",
  },
  "kh-feature": {
    src: founderFeature,
    alt: "A founder standing at a distance inside their own working facility",
    cap: "Founder feature",
  },

  /* Media cards */
  "kh-m-Feature": {
    src: mediaRelocation,
    alt: "Crates and part-installed machinery inside a half-set-up facility",
    cap: "Feature",
  },
  "kh-m-Market note": {
    src: mediaAerial,
    alt: "Aerial view of a Northern Kentucky industrial landscape with warehouses and rail",
    cap: "Market note",
  },
  "kh-m-Round": {
    src: mediaConveyor,
    alt: "Accelerating moving walkway and conveyor system inside a terminal",
    cap: "Round",
  },
};

/** Deterministic fallback so no seed ever hits an external service. */
const POOL: Pic[] = [
  PICS["kh-log"]!,
  PICS["kh-mfg"]!,
  PICS["kh-health"]!,
  PICS["kh-ev"]!,
  PICS["kh-ag"]!,
  { src: mediaAerial, alt: "Aerial view of a Kentucky industrial corridor" },
  { src: founderFeature, alt: "Interior of a working Kentucky facility" },
  { src: heroFactory, alt: "Factory floor mid-shift with machinery in operation" },
  { src: mediaConveyor, alt: "Conveyor and moving walkway inside a transit terminal" },
  { src: heroBluegrass, alt: "Kentucky farmland at low sun" },
];

export function pic(seed: string): Pic {
  const hit = PICS[seed];
  if (hit) return hit;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return POOL[h % POOL.length]!;
}
