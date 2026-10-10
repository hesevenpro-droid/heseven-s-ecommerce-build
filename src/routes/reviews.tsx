import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaPanel, Panel, VideoReviews } from "@/components/site/Sections";
import { BRAND, REVIEW_BREAKDOWN } from "@/lib/site-data";
import { CLIENT_REVIEWS } from "@/lib/reviews-data";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
});

const PER_PAGE = 10;

function Stars({ value }: { value: number }) {
  return (
    <span className="text-amber-500" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-muted-foreground/40">{"★".repeat(5 - value)}</span>
    </span>
  );
}

function Reviews() {
  const total = REVIEW_BREAKDOWN.reduce((a, b) => a + b.count, 0);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(CLIENT_REVIEWS.length / PER_PAGE);
  const items = CLIENT_REVIEWS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const go = (p: number) => {
    setPage(Math.min(Math.max(p, 1), pageCount));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SiteLayout>
      <VideoReviews />

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

        <div className="mt-8 divide-y divide-border border-t border-border">
          {items.map((r, i) => (
            <article key={`${r.name}-${r.date}-${i}`} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-brand-ink">{r.name}</h3>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-36 text-muted-foreground">Quality of work</span>
                  <Stars value={r.quality} />
                  <span className="text-xs text-muted-foreground">{r.quality}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-36 text-muted-foreground">Communication</span>
                  <Stars value={r.communication} />
                  <span className="text-xs text-muted-foreground">{r.communication}</span>
                </div>
              </div>

              {r.text ? (
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
              ) : null}

              <p className="mt-4 text-xs text-muted-foreground">
                Service reviewed: <span className="font-medium text-brand-ink">{r.service}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 1}
            className="rounded-full border border-border px-4 py-2 text-brand-ink transition disabled:opacity-40 hover:bg-secondary"
          >
            Previous
          </button>
          <select
            value={page}
            onChange={(e) => go(Number(e.target.value))}
            className="rounded-full border border-border bg-background px-3 py-2 text-brand-ink"
            aria-label="Page"
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <span className="text-muted-foreground">/ {pageCount}</span>
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === pageCount}
            className="rounded-full border border-border px-4 py-2 text-brand-ink transition disabled:opacity-40 hover:bg-secondary"
          >
            Next
          </button>
        </div>
      </Panel>

      <CtaPanel />
    </SiteLayout>
  );
}

