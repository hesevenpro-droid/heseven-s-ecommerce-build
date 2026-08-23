import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OurStory, Panel, VideoReviews, WhyHeseven } from "@/components/site/Sections";
import { CORE_SERVICES, MORE_SKILLS, NAV, PROCESS, SKILLS } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Heseven Shopify Growth Agency | Custom Store Builds & Maintenance" },
      {
        name: "description",
        content:
          "Heseven is a Shopify Expert agency in London delivering custom Shopify store builds, migrations, CRO, speed optimisation, SEO and ongoing maintenance worldwide.",
      },
      { property: "og:title", content: "Heseven Shopify Growth Agency | Custom Store Builds & Maintenance" },
      {
        property: "og:description",
        content: "Custom Shopify store builds, platform migration, CRO, speed optimisation, SEO and store maintenance from a London-based Shopify Expert agency.",
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

      <WhyHeseven />

      <VideoReviews />


      <Panel title="Our Services">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          The Shop Maintenance plan is built around business size, complexity and specific needs, offering the
          most diversified type of service in Shopify maintenance.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {CORE_SERVICES.map((s) => (
            <div key={s.title} className="rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold text-brand-ink">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="What happens when you come onboard">
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          From initial strategy to the successful launch of your online store, we follow a detailed 5-step
          process to ensure outstanding results.
        </p>
        <ol className="space-y-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="rounded-xl border border-border p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.step}</span>
              <h3 className="mt-1 text-sm font-semibold text-brand-ink">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ol>
      </Panel>

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

    </SiteLayout>
  );
}
