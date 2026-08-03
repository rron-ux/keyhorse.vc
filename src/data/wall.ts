/**
 * The founder "wall" — the moving card strips on the home page.
 * Shared so the Companies marquee shows exactly the same faces.
 */
import { ARTICLES } from "./articles";
import gunMedia from "@/assets/wall/gun-media-2.png.asset.json";
import biscuitBelly from "@/assets/wall/biscuit-belly-2.png.asset.json";
import proximity2 from "@/assets/wall/proximity-2.png.asset.json";
import level6 from "@/assets/wall/level6-cyber.png.asset.json";
import narratize from "@/assets/wall/narratize.png.asset.json";
import dueGooder2 from "@/assets/wall/due-gooder-2.png.asset.json";
import dealerTrade from "@/assets/wall/dealer-trade-network.png.asset.json";
import wicked from "@/assets/wall/wicked-technologies.png.asset.json";
import eqlGames from "@/assets/wall/eql-games.png.asset.json";
import goodmaps from "@/assets/wall/goodmaps.png.asset.json";
import flywire from "@/assets/wall/flywire-2.png.asset.json";
import sofab from "@/assets/wall/sofab-inks-clean.png.asset.json";

/** Cards swapped out for other portfolio companies, keyed by original company. */
const WALL_SWAP: Record<string, { company: string; cover: string }> = {
  VerityXR: { company: "Gun Media", cover: gunMedia.url },
  Ecoshell: { company: "Biscuit Belly", cover: biscuitBelly.url },
  "The Nori Project": { company: "Dealer Trade Network", cover: dealerTrade.url },
  "Advanced Energy Materials": { company: "Wicked Technologies", cover: wicked.url },
  "Garnet Gazelle": { company: "EQL Games", cover: eqlGames.url },
  BioGlitz: { company: "GoodMaps", cover: goodmaps.url },
  "River Guide": { company: "Flywire Cameras", cover: flywire.url },
  PONTIS: { company: "SoFab Inks", cover: sofab.url },
  Proximity: { company: "Proximity", cover: proximity2.url },
  DataRovers: { company: "Level 6 Cybersecurity", cover: level6.url },
  "Rhiza Health": { company: "Narratize AI", cover: narratize.url },
  "Due Gooder": { company: "Due Gooder", cover: dueGooder2.url },
};

/** Cards pulled from the wall entirely. */
const WALL_DROP = (a: { company: string; cover: string }) =>
  a.company === "Forecastr" || a.cover.includes("Bridget_Flamel");

export type WallCard = (typeof ARTICLES)[number];

export const WALL: WallCard[] = ARTICLES.filter(
  (a) => a.category === "stories" && a.cover && !WALL_DROP(a),
).map((a) => {
  const s = WALL_SWAP[a.company];
  return s ? { ...a, company: s.company, person: s.company, cover: s.cover } : a;
});
