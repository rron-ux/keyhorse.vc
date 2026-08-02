/** Real Media page content. Edit here — no component changes needed. */

export const KH = "https://www.keyhorse.vc";

export type SeriesId = "founding" | "behind" | "cycle";

export const SERIES: Record<SeriesId, { label: string; color: string }> = {
  founding: { label: "Founding Stories", color: "#00A8E1" },
  behind: { label: "Behind the Scenes", color: "#7B4FD0" },
  cycle: { label: "Investment Cycles", color: "#222222" },
};

export const MEDIA_FILTERS = [
  ["all", "All"],
  ["founding", "Founding Stories"],
  ["behind", "Behind the Scenes"],
  ["cycle", "Investment Cycles"],
] as const;

/** The open cycle. Update quarterly. */
export const CYCLE = {
  kicker: "Investment Cycle · Open now",
  status: "OPEN · 10 AUG – 30 SEP 2026",
  headline: "The Q3 2026 investment cycle is open through 30 September.",
  standfirst:
    "Keyhorse Capital, an initiative of Kentucky Science and Technology Corporation in partnership with the Kentucky Cabinet for Economic Development, is accepting applications from eligible Kentucky companies.",
  announcement: `${KH}/post/keyhorse-capital-launches-2026-q3-investment-cycle-for-eligible-kentucky-companies`,
};

export type MediaPost = {
  s: SeriesId;
  t: string;
  d: string;
  href: string;
  seed: string;
};

export const MEDIA_POSTS: MediaPost[] = [
  {
    s: "founding",
    t: "Ben Wolber of Illume aims to simplify financial modeling for the MedSpa industry",
    d: "2026",
    href: `${KH}/post/founding-stories-ben-wolber-illume`,
    seed: "kh-mp-1",
  },
  {
    s: "founding",
    t: "Grant Murray of Proximity aims to transform the parking experience",
    d: "2026",
    href: `${KH}/post/keyhorse-founding-stories-grant-murray-of-proximity`,
    seed: "kh-mp-2",
  },
  {
    s: "founding",
    t: "Shiva Rallapalli of VerityXR is working to transform pain management through VR and AR",
    d: "2026",
    href: `${KH}/post/founding-stories-shiva-rallapalli-of-verityxr`,
    seed: "kh-mp-3",
  },
  {
    s: "founding",
    t: "Jawad Popalzai of DataRovers is working to modernize healthcare’s most outdated systems",
    d: "2026",
    href: `${KH}/post/founding-stories-jawad-popalzai-of-datarovers`,
    seed: "kh-mp-4",
  },
  {
    s: "founding",
    t: "Ellie Puckett of Resonate Recordings aims to elevate voices through purposeful podcasting",
    d: "2026",
    href: `${KH}/post/founding-stories-ellie-puckett-of-resonate-recordings`,
    seed: "kh-mp-5",
  },
  {
    s: "founding",
    t: "Oliver Lawal of AquiSense aims to revolutionize water disinfection with UV-C LED technology",
    d: "2026",
    href: `${KH}/post/founding-stories-oliver-lawal-of-aquisense`,
    seed: "kh-mp-6",
  },
  {
    s: "founding",
    t: "John Yuksel of Beltways on rethinking short-range transportation",
    d: "2026",
    href: `${KH}/post/founding-stories-john-yuksel-of-beltways`,
    seed: "kh-mp-7",
  },
  {
    s: "behind",
    t: "Inside Forecastr’s approach to founder-led scaling with Logan Burchett",
    d: "2026",
    href: `${KH}/post/behind-the-scenes-inside-forecastrs-approach-to-founder-led-scaling-with-logan-burchett`,
    seed: "kh-mp-8",
  },
  {
    s: "behind",
    t: "Inside Flamel.ai’s marketing evolution with Bridget Johnston",
    d: "2026",
    href: `${KH}/post/behind-the-scenes-inside-flamel-ais-marketing-evolution-with-bridget-johnston`,
    seed: "kh-mp-9",
  },
];

/** Curated LinkedIn highlights — editable. */
export const LINKEDIN_POSTS = [
  "Q3 2026 investment cycle is open to eligible Kentucky companies through 30 September.",
  "Founding Stories: Ben Wolber of Illume on financial modeling for the MedSpa industry.",
  "Behind the Scenes: Logan Burchett of Forecastr on founder-led scaling.",
];

export const MEDIA_CAL = [
  ["30", "Sep", "Q3 investment cycle closes", "Keyhorse", "Statewide", "own", ""],
  [
    "—",
    "TBC",
    "Awesome Inc 5 Across Pitch Competition",
    "Pitch competition",
    "Lexington",
    "",
    "https://awesomeinc.org",
  ],
  ["—", "TBC", "[Ecosystem event — placeholder]", "Placeholder", "[Location]", "", ""],
  ["—", "TBC", "[Ecosystem event — placeholder]", "Placeholder", "[Location]", "", ""],
] as const;

export const MEDIA_FIGURES = [
  ["$100M+", "Invested"],
  ["$3.3B+", "Follow-on capital"],
  ["600+", "Companies"],
  ["209", "Active"],
] as const;
