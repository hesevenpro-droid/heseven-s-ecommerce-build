import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { KeyMetrics, Panel } from "@/components/site/Sections";
import { BRAND, MORE_SKILLS, SKILLS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Heseven — Shopify eCommerce Agency" },
      {
        name: "description",
        content:
          "Heseven designs, builds and manages Shopify stores, combining development, SEO, paid media and retention marketing.",
      },
      { property: "og:title", content: "About Heseven — Shopify eCommerce Agency" },
      {
        property: "og:description",
        content: "Who we are and how our Shopify agency helps brands grow after launch day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <Panel title="About Us">
        <p className="text-sm leading-relaxed text-muted-foreground">{BRAND.about}</p>
      </Panel>

      <Panel title="Skills & Expertise">
        <div className="flex flex-wrap gap-2">
          {[...SKILLS, ...MORE_SKILLS].map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-brand-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </Panel>

      <KeyMetrics />
    </SiteLayout>
  );
}
