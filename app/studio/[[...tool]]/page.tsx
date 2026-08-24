import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // fixed + inset-0 takes the Studio out of the marketing site's flex layout
  // and guarantees it fills the viewport regardless of its parent's sizing.
  return (
    <div className="fixed inset-0 z-[2147483647]">
      <NextStudio config={config} />
    </div>
  );
}
