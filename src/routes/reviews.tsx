import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaPanel, KeyMetrics, LiveSites, Panel, SalesProof } from "@/components/site/Sections";
import { BRAND, REVIEW_BREAKDOWN, TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  component: Reviews,
  head: () => ({
    meta: [
      { title: "Reviews — Heseven Shopify Agency" },
      {
        name: "description",
        content:
          "Shopify store owner reviews for Heseven: 4.9 average rating across 1,024 reviews, plus sales proof from real client stores.",
      },
      { property: "og:title", content: "Reviews — Heseven Shopify Agency" },
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
      <KeyMetrics />

      <Panel
        title="Video Reviews"
        subtitle="Shopify and ecommerce store owners talking about sales growth — in their own words."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-secondary to-accent">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ▶
                </span>
              </div>
              <p className="p-4 text-sm font-semibold text-brand-ink">Shopify store owner review</p>
            </div>
          ))}
        </div>
      </Panel>

      <SalesProof />
      <LiveSites />

      <Panel
        title="Shopify Store Owner Reviews"
        subtitle="Every piece of client feedback shapes how we work. Here is what brands say after working with us."
      >
        <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
          <div className="rounded-xl bg-secondary p-5 text-center">
            <p className="text-4xl font-bold text-brand-ink">4.9</p>
            <p className="mt-1 text-amber-500">★★★★★</p>
            <p className="mt-1 text-xs text-muted-foreground">{BRAND.reviewCount} reviews</p>
          </div>
          <div className="space-y-2">
            {REVIEW_BREAKDOWN.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="w-12">{r.stars} star</span>
                <div className="h-2 flex-1 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-amber-400"
                    style={{ width: `${(r.count / total) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right">{r.count}</span>
              </div>
            ))}
          </div>
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
