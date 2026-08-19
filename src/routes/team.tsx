import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";
import { TEAM } from "@/lib/site-data";

export const Route = createFileRoute("/team")({
  component: Team,
  head: () => ({
    meta: [
      { title: "The Heseven Team — Shopify Experts" },
      {
        name: "description",
        content:
          "Meet the Heseven team: Shopify developers, SEO specialists, paid media strategists and project managers across the US, UK and Nigeria.",
      },
      { property: "og:title", content: "The Heseven Team — Shopify Experts" },
      {
        property: "og:description",
        content: "The people behind Heseven, working across development, marketing and project delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
});

const FLAGS = [
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "ng", label: "Nigeria" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

function Team() {
  return (
    <SiteLayout>
      <Panel
        title="Our Expert Team"
        subtitle="Meet the people behind Heseven. Our team works across development, marketing and project delivery to keep every build on track."
      >
        <div className="rounded-xl bg-secondary p-5">
          <h3 className="text-sm font-semibold text-brand-ink">Global Presence</h3>
          <ul className="mt-3 flex flex-wrap gap-4">
            {FLAGS.map((f) => (
              <li key={f.code} className="flex items-center gap-2 text-xs text-muted-foreground">
                <img src={`https://flagcdn.com/w40/${f.code}.png`} alt="" className="h-4 w-6 rounded-sm" />
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TEAM.map((m) => (
            <article key={m.name} className="rounded-xl border border-border p-5 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                {initials(m.name)}
              </div>
              <h3 className="mt-3 text-sm font-bold text-brand-ink">{m.name}</h3>
              <p className="text-xs font-medium text-primary">{m.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
            </article>
          ))}
        </div>
      </Panel>
    </SiteLayout>
  );
}
