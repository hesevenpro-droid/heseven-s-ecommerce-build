import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BRAND, INDUSTRIES, LANGUAGES, NAV, SUPPORTED_LOCATIONS } from "@/lib/site-data";
import logo from "@/assets/heseven-logo.jpg.asset.json";
import partnerBadge from "@/assets/shopify-select-partner.webp.asset.json";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop nav — top centered pill */}
      <div className="hidden lg:flex justify-center px-4 py-4">
        <NavPill />
      </div>

      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <ProfileCard />
          {/* Mobile / tablet nav — below profile card */}
          <div className="mt-4 lg:hidden flex justify-center">
            <NavPill />
          </div>
        </aside>
        <div className="space-y-6">{children}</div>
      </main>

      <footer className="mt-10 border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-2 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-brand-ink">{BRAND.name}</p>
          <p className="text-xs text-muted-foreground">
            {BRAND.tagline} · {BRAND.email}
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavPill() {
  return (
    <nav className="rounded-full border border-border bg-card px-3 py-2 shadow-sm">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {NAV.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="block rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary [&.active]:bg-secondary [&.active]:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProfileCard() {
  const [showLocations, setShowLocations] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);

  return (
    <div className="panel mt-14 p-6 text-left">
      <div className="flex items-start justify-between gap-4">
        <div className="-mt-20 h-28 w-28 shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-card p-2 shadow-sm">
            <img src={logo.url} alt="Heseven logo" className="h-full w-full object-contain" />
          </div>
        </div>
        <img
          src={partnerBadge.url}
          alt="Shopify Select Partner"
          className="h-10 w-auto shrink-0 object-contain"
        />
      </div>

      <h1 className="mt-4 text-3xl font-bold italic leading-snug text-brand-ink">{BRAND.title}</h1>

      <span className="mt-3 inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-brand-ink">
        Service partner
      </span>

      <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-brand-ink">
        <span>
          <span className="text-amber-500">★</span> <strong>{BRAND.rating}</strong>{" "}
          <span className="text-muted-foreground">({BRAND.reviewCount})</span>
        </span>
        <span className="text-border">|</span>
        <span className="text-muted-foreground">Partner since September 2018</span>
      </p>


      <dl className="mt-6 space-y-3 text-left text-sm">
        <div>
          <dt className="text-muted-foreground">Primary location</dt>
          <dd className="font-medium text-brand-ink">
            <span className="inline-flex items-center gap-1.5"><img src="https://flagcdn.com/gb.svg" alt="United Kingdom flag" className="inline-block h-3 w-[18px] rounded-[2px] object-cover align-[-1px]" /> {BRAND.location}</span>
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Supported locations</dt>
          <dd className="font-medium text-brand-ink">
            {(showLocations ? SUPPORTED_LOCATIONS : SUPPORTED_LOCATIONS.slice(0, 3)).join(", ")}
          </dd>
          <button
            type="button"
            onClick={() => setShowLocations((v) => !v)}
            className="mt-1 text-xs font-semibold text-primary hover:underline"
          >
            {showLocations ? "Show less" : `View more (${SUPPORTED_LOCATIONS.length - 3})`}
          </button>
        </div>
        <div>
          <dt className="text-muted-foreground">Languages</dt>
          <dd className="font-medium text-brand-ink">
            {(showLanguages ? LANGUAGES : LANGUAGES.slice(0, 3)).join(", ")}
          </dd>
          <button
            type="button"
            onClick={() => setShowLanguages((v) => !v)}
            className="mt-1 text-xs font-semibold text-primary hover:underline"
          >
            {showLanguages ? "Fewer languages" : `More languages (${LANGUAGES.length - 3})`}
          </button>
        </div>
        <div>
          <dt className="text-muted-foreground">Industries</dt>
          <dd className="font-medium text-brand-ink">
            {(showIndustries ? INDUSTRIES : INDUSTRIES.slice(0, 3)).join(", ")}
          </dd>
          <button
            type="button"
            onClick={() => setShowIndustries((v) => !v)}
            className="mt-1 text-xs font-semibold text-primary hover:underline"
          >
            {showIndustries ? "Show less" : `View more (${INDUSTRIES.length - 3})`}
          </button>
        </div>
        <div>
          <dt className="text-muted-foreground">Average response time</dt>
          <dd className="font-medium text-brand-ink">{BRAND.responseTime}</dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3">
        <Link
          to="/contact"
          className="btn-cta block rounded-full px-4 py-3 text-sm font-semibold"
        >
          Contact Us
        </Link>
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="block rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-secondary"
        >
          Send a message
        </a>
      </div>
    </div>
  );
}
