import { useState } from "react";
import { cn } from "@/lib/utils";
import v1 from "@/assets/video-review-1.mp4.asset.json";
import v2 from "@/assets/video-review-2.mp4.asset.json";
import v3 from "@/assets/video-review-3.mp4.asset.json";
import v4 from "@/assets/video-review-4.mp4.asset.json";
import v5 from "@/assets/video-review-5.mp4.asset.json";
import v6 from "@/assets/video-review-6.mp4.asset.json";
import v7 from "@/assets/video-review-7.mp4.asset.json";
import v8 from "@/assets/video-review-8.mp4.asset.json";

const VIDEO_ASSETS = [v1, v2, v3, v4, v5, v6, v7, v8];
import {
  BRAND,
  LIVE_SITES,
  SALES_PROOF,
  STORY_INTRO,
  STORY_TIMELINE,
  VALUES,
  WHY_HESEVEN,
  WHY_HESEVEN_INTRO,
} from "@/lib/site-data";

export function Panel({
  title,
  subtitle,
  titleClassName,
  children,
}: {
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="panel p-6 sm:p-8">
      {title ? <h2 className={cn("text-xl font-bold", titleClassName || "text-brand-ink")}>{title}</h2> : null}
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className={title ? "mt-6" : ""}>{children}</div>
    </section>
  );
}

export function Values() {
  return (
    <Panel title="Our Values" titleClassName="text-primary">
      <div className="grid gap-4 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold text-brand-ink">{v.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function VideoReviews() {
  return (
    <Panel
      title="Worn by you"
      titleClassName="text-primary"
      subtitle="Shopify and ecommerce store owners talking about sales growth, in their own words."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VIDEO_ASSETS.map((v, i) => (
          <video
            key={i}
            src={v.url}
            controls
            playsInline
            preload="metadata"
            className="aspect-[9/16] w-full rounded-xl border border-border bg-black object-cover"
          />
        ))}
      </div>
    </Panel>
  );
}


export function SalesProof() {
  return (
    <Panel
      title="Shopify Sales Proof"
      subtitle="Real Shopify dashboards and ecommerce revenue screens from stores we've grown, not mockups."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {SALES_PROOF.map((s) => (
          <article key={s.title} className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-32 items-end gap-1.5 bg-secondary p-4">
              {[35, 52, 44, 68, 60, 82, 95].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-primary/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-brand-ink">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

export function WhyHeseven() {
  return (
    <Panel
      title="Why Heseven?"
      titleClassName="text-brand-ink"
      subtitle={WHY_HESEVEN_INTRO}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {WHY_HESEVEN.map((w) => (
          <div key={w.title} className="rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold text-brand-ink">{w.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function OurStory() {
  return (
    <Panel title="Our Story" subtitle={STORY_INTRO}>
      <ol className="relative space-y-5 border-l border-border pl-6">
        {STORY_TIMELINE.map((t) => (
          <li key={t.year} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-sm font-semibold">
              <span className="text-primary">{t.year}</span>
              <span className="text-muted-foreground"> | </span>
              <span className="text-brand-ink">{t.title}</span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm font-semibold italic text-brand-ink">The journey continues.</p>
    </Panel>
  );
}

function SiteThumbnail({ domain, name }: { domain: string; name: string }) {
  const sources = [
    `https://image.thum.io/get/width/800/crop/900/noanimate/https://${domain}/`,
    `https://api.microlink.io/?url=${encodeURIComponent(`https://${domain}/`)}&screenshot=true&meta=false&embed=screenshot.url`,
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(`https://${domain}/`)}?w=800`,
  ];
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = index >= sources.length;

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-secondary">
        <span className="text-lg font-bold text-brand-ink">{name}</span>
        <span className="text-[11px] text-muted-foreground">Preview unavailable</span>
      </div>
    );
  }

  return (
    <>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-secondary" /> : null}
      <img
        key={sources[index]}
        src={sources[index]}
        alt={`${name} homepage screenshot`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setIndex((i) => i + 1)}
        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </>
  );
}

export function LiveSites() {
  return (
    <Panel
      title="Live Client Websites"
      subtitle="Live stores we have built, optimised or scaled. Open any preview to visit the site."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIVE_SITES.map((site) => (
          <a
            key={site.domain}
            href={`https://${site.domain}/`}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-card"
          >
            <div className="border-b border-border bg-secondary px-3 py-2 text-[11px] text-muted-foreground">
              {site.domain}
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
              <SiteThumbnail domain={site.domain} name={site.name} />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-brand-ink">{site.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{site.desc}</p>
              <span className="mt-3 inline-block text-xs font-semibold text-primary group-hover:underline">
                Visit live site →
              </span>
            </div>
          </a>
        ))}
      </div>
    </Panel>
  );
}

export function CtaPanel() {
  return (
    <section className="panel p-6 text-center sm:p-8">
      <h2 className="text-xl font-bold text-brand-ink">
        Interested in working <span className="text-primary">Together</span>?
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        Let's unlock your business's full potential together. Reach out today to start the
        conversation and ignite your growth
      </p>
      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-cta mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide"
      >
        Contact Us Now
      </a>
    </section>
  );
}
