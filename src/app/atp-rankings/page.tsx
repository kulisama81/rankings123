import { permanentRedirect } from "next/navigation";

// Top-1000 is now folded into /atp-live (full ranking + pagination).
export default function AtpRankingsRedirect() {
  permanentRedirect("/atp-live");
}
