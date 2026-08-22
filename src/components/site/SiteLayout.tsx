import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BRAND, INDUSTRIES, LANGUAGES, NAV, SUPPORTED_LOCATIONS } from "@/lib/site-data";
import logo from "@/assets/heseven-logo.jpg.asset.json";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <ProfileCard />
        </aside>
        <div className="space-y-6">
          <nav className="panel px-6 py-4">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {children}
        </div>
      </main>

      <footer className="mt-10 border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-brand-ink">{BRAND.name}</p>
          <p className="text-xs text-muted-foreground">
            {BRAND.tagline} · {BRAND.email}
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProfileCard() {
  const [showLocations, setShowLocations] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div className="panel p-6 text-center">
      <div className="relative mx-auto h-28 w-28">
        <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-card p-2">
          <img src={logo.url} alt="Heseven logo" className="h-full w-full object-contain" />
        </div>
        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
      </div>

      <h1 className="mt-4 text-2xl font-bold italic leading-snug text-brand-ink">{BRAND.title}</h1>

      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1"><img src="https://flagcdn.com/gb.svg" alt="United Kingdom flag" className="inline-block h-3 w-[18px] rounded-[2px] object-cover align-[-1px]" /> {BRAND.location}</span>
      </p>

      <p className="mt-3 text-sm text-brand-ink">
        <span className="text-amber-500">★</span> <strong>{BRAND.rating}</strong>{" "}
        <span className="text-muted-foreground">({BRAND.reviewCount})</span>
      </p>

      <p className="mt-4 text-sm italic text-muted-foreground">"{BRAND.tagline}"</p>

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
          <dd className="font-medium text-brand-ink">{INDUSTRIES.join(", ")}</dd>
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
