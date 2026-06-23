import { permanentRedirect } from "next/navigation";

// Force dynamic rendering to enable redirect
export const dynamic = "force-dynamic";

export default function WhatsNewRedirect() {
  permanentRedirect("/changelog");
}
