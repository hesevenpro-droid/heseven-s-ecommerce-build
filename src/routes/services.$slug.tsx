import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";
import { BRAND, SERVICES, SERVICES_BY_SLUG } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES_BY_SLUG[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — Heseven Shopify Services` },
        {
          name: "description",
          content: `${service.title} from £. ${service.desc}`,
        },
        { property: "og:title", content: `${service.title} — Heseven Shopify Services` },
        { property: "og:description", content: service.desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${loaderData.service.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${loaderData.service.slug}` }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 5);

  return (
    <SiteLayout>
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/services" className="hover:text-primary">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-ink">{service.title}</span>
      </nav>

      <section className="panel overflow-hidden p-0">
        {service.image ? (
          <img
            src={service.image}
            alt={`${service.title} illustration`}
            className="aspect-[21/9] w-full object-cover"
          />
        ) : null}
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-brand-ink">{service.title}</h1>
          <p className="mt-1 text-sm font-semibold text-primary">{service.price}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="btn-cta rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide"
            >
              Get a Quote
            </Link>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand-ink transition-colors hover:border-primary hover:text-primary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Panel title="What You Get">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Dedicated Heseven specialist assigned to your project",
            "Clear timeline, scope and deliverables agreed upfront",
            "Regular progress updates until the work is complete",
            "Post-delivery support to make sure everything runs smoothly",
          ].map((item) => (
            <li key={item} className="flex gap-2 rounded-xl border border-border p-4 text-xs leading-relaxed text-muted-foreground">
              <span className="mt-0.5 font-bold text-primary">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Other Services">
        <div className="space-y-2">
          {others.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:border-primary"
            >
              <span className="text-sm font-semibold text-brand-ink">{s.title}</span>
              <span className="text-xs font-semibold text-primary">{s.price} →</span>
            </Link>
          ))}
          <Link
            to="/services"
            className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
          >
            ← Back to all services
          </Link>
        </div>
      </Panel>
    </SiteLayout>
  );
}
