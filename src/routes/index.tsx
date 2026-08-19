import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { KeyMetrics, Panel } from "@/components/site/Sections";
import { BRAND, MORE_SKILLS, NAV, SKILLS } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Heseven — eCommerce & Shopify Growth Agency" },
      {
        name: "description",
        content:
          "Heseven is a Shopify Partner agency building, optimising and scaling eCommerce stores with development, SEO, paid media and retention marketing.",
      },
      { property: "og:title", content: "Heseven — eCommerce & Shopify Growth Agency" },
      {
        property: "og:description",
        content: "Shopify store development, SEO, ads and CRO that turn storefronts into profitable sales channels.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [showAll, setShowAll] = useState(false);
  const skills = showAll ? [...SKILLS, ...MORE_SKILLS] : SKILLS;

  return (
    <SiteLayout>
      <Panel title="About Us">
        <p className="text-sm leading-relaxed text-muted-foreground">{BRAND.about}</p>
      </Panel>

      <Panel title="Skills & Expertise">
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-brand-ink"
            >
              {s}
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-brand-ink transition-colors hover:bg-secondary"
        >
          {showAll ? "Show fewer skills" : `Show all ${SKILLS.length + MORE_SKILLS.length} skills`}
        </button>
      </Panel>

      <KeyMetrics />

      <Panel title="Explore Heseven">
        <div className="grid gap-3 sm:grid-cols-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-secondary"
            >
              {item.label}
              <span className="text-primary">→</span>
            </Link>
          ))}
        </div>
      </Panel>
    </SiteLayout>
  );
}
