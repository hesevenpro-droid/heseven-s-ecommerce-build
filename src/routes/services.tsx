import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";
import { SERVICES, SUCCESS_RATINGS } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Shopify & eCommerce Services: Heseven" },
      {
        name: "description",
        content:
          "Shopify store development, dropshipping builds, SEO, CRO, Google and Meta ads, email automation and more from Heseven.",
      },
      { property: "og:title", content: "Shopify & eCommerce Services: Heseven" },
      {
        property: "og:description",
        content: "End-to-end Shopify solutions built to help your brand grow in a competitive eCommerce market.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function Services() {
  return (
    <SiteLayout>
      <Panel
        title="Our Services"
        subtitle="End-to-end Shopify solutions built to help your brand grow in a competitive eCommerce market."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.title} className="flex flex-col overflow-hidden rounded-xl border border-border">
              {s.image && (
                <img
                  src={s.image}
                  alt={`${s.title} illustration`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
              <h3 className="text-sm font-bold text-brand-ink">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="flex-1" />
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-bold text-brand-ink">{s.price}</span>
                <span className="text-xs font-semibold text-primary">View details →</span>
              </div>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <Panel title="Our Success Ratings">
        <div className="space-y-4">
          {SUCCESS_RATINGS.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-xs font-medium text-brand-ink">
                <span>{r.label}</span>
                <span>{r.value}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${r.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </SiteLayout>
  );
}
