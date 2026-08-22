import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaPanel, LiveSites, Panel, SalesProof, VideoReviews } from "@/components/site/Sections";
import { BRAND, REVIEW_BREAKDOWN, TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  component: Reviews,
  head: () => ({
    meta: [
      { title: "Work & Reviews: Heseven Shopify Agency" },
      {
        name: "description",
        content:
          "Shopify store owner reviews for Heseven: 4.9 average rating across 136 reviews, plus sales proof from real client stores.",
      },
      { property: "og:title", content: "Work & Reviews: Heseven Shopify Agency" },
      {
        property: "og:description",
        content: "What brands say after working with Heseven on their Shopify stores.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
});

function Reviews() {
  const total = REVIEW_BREAKDOWN.reduce((a, b) => a + b.count, 0);

  return (
    <SiteLayout>
      <VideoReviews />

      <KeyMetrics />

      <SalesProof />
      <LiveSites />

      <Panel
        title={`Rating ${BRAND.rating}(${BRAND.reviewCount})`}
        subtitle="Overall rating summary"
      >
        <p className="mb-5 text-sm text-muted-foreground">
          Ratings based on quality of work and communication
        </p>
        <div className="space-y-2">
          {REVIEW_BREAKDOWN.map((r) => (
            <div key={r.stars} className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="w-24 text-amber-500">{"★".repeat(r.stars)}</span>
              <div className="h-2 flex-1 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-amber-400"
                  style={{ width: `${total ? (r.count / total) * 100 : 0}%` }}
                />
              </div>
              <span className="w-10 text-right">({r.count})</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="rounded-xl border border-border p-5">
              <p className="text-amber-500">★★★★★</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <p className="mt-4 text-sm font-semibold text-brand-ink">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.country} · {t.service}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <CtaPanel />
    </SiteLayout>
  );
}
