import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaPanel, KeyMetrics, LiveSites, Panel, SalesProof, VideoReviews } from "@/components/site/Sections";
import { PORTFOLIO } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio: Heseven Shopify Projects" },
      {
        name: "description",
        content:
          "Recent Shopify projects from Heseven: technical SEO overhauls, page speed work, Merchant Center approvals and paid media scaling.",
      },
      { property: "og:title", content: "Portfolio: Heseven Shopify Projects" },
      {
        property: "og:description",
        content: "A selection of recent eCommerce projects and the outcomes that mattered to each client.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
});

function Portfolio() {
  return (
    <SiteLayout>
      <VideoReviews />

      <KeyMetrics />

      <Panel
        title="Our Portfolio"
        subtitle="A selection of recent projects across different eCommerce categories, each with the outcome that mattered to the client."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {PORTFOLIO.map((p) => (
            <article key={p.title} className="rounded-xl border border-border p-5">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
                {p.tag}
              </span>
              <h3 className="mt-3 text-sm font-bold text-brand-ink">{p.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              <p className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span>{p.time}</span>
                <span>♥ {p.likes}</span>
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <SalesProof />
      <LiveSites />
      <CtaPanel />
    </SiteLayout>
  );
}
