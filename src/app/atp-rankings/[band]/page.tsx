import { permanentRedirect } from "next/navigation";

// Rank-band pages are folded into /atp-live (full ranking + pagination).
export default function AtpRankingBandRedirect() {
  permanentRedirect("/atp-live");
}
