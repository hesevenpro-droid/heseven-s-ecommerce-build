import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BRAND, NAV } from "@/lib/site-data";
import logo from "@/assets/heseven-logo.jpg.asset.json";

function ShopifyBag() {
  return (
    <svg viewBox="0 0 48 54" className="h-11 w-auto" aria-hidden="true">
      <path fill="#95BF47" d="M37.2 9.6c-.03-.24-.24-.37-.41-.39-.17-.01-3.8-.28-3.8-.28s-2.52-2.5-2.8-2.78c-.28-.28-.82-.19-1.03-.13l-1.41.44C26.9 4.06 25.55 2 23.13 2h-.26C22.2 1.16 21.36.8 20.64.8c-5.6.03-8.28 7.02-9.12 10.57l-3.92 1.21c-1.21.38-1.25.42-1.41 1.56L2.85 44.9l29.2 5.47L48 46.9 37.2 9.6ZM26.4 7.1l-2.28.7v-.5c0-1.5-.2-2.72-.54-3.68 1.36.18 2.27 1.73 2.82 3.48Zm-4.5-3.2c.38 1 .63 2.4.63 4.3v.31l-4.7 1.45c.9-3.47 2.6-5.15 4.07-5.79v-.27Zm-1.8-1.72c.26 0 .53.09.78.26-1.94.91-4.02 3.2-4.9 7.79l-3.72 1.15c1.03-3.5 3.3-9.2 7.84-9.2Z"/>
      <path fill="#5E8E3E" d="M36.79 9.21c-.17-.01-3.8-.28-3.8-.28s-2.52-2.5-2.8-2.78a.7.7 0 0 0-.39-.18L32.05 50.4 48 46.9 37.2 9.6a.53.53 0 0 0-.41-.39Z"/>
      <path fill="#FFF" d="M23.13 17.9l-1.97 5.85s-1.73-.92-3.84-.92c-3.1 0-3.26 1.95-3.26 2.44 0 2.68 6.99 3.71 6.99 10 0 4.94-3.13 8.12-7.36 8.12-5.07 0-7.66-3.16-7.66-3.16l1.36-4.49s2.66 2.28 4.9 2.28c1.47 0 2.07-1.15 2.07-2 0-3.5-5.73-3.66-5.73-9.41 0-4.84 3.47-9.52 10.48-9.52 2.7 0 4.02.77 4.02.77Z"/>
    </svg>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-10">
          <ShopifyBag />
          <span className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            shopify <span className="font-serif italic font-normal">partner</span>
          </span>
        </div>
      </header>

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
  return (
    <div className="panel p-6 text-center">
      <div className="relative mx-auto h-28 w-28">
        <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-card p-2">
          <img src={logo.url} alt="Heseven logo" className="h-full w-full object-contain" />
        </div>
        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-card bg-emerald-500" />
      </div>

      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
        </span>
        <span>•</span>
        <span>🇺🇸 From United States</span>
      </p>

      <h1 className="mt-4 text-xl font-bold leading-snug text-brand-ink">{BRAND.title}</h1>

      <p className="mt-3 text-sm text-brand-ink">
        <span className="text-amber-500">★</span> <strong>{BRAND.rating}</strong>{" "}
        <span className="text-muted-foreground">({BRAND.reviewCount} reviews)</span>
      </p>

      <span className="mt-3 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
        Shopify Partner
      </span>

      <p className="mt-4 text-sm italic text-muted-foreground">"{BRAND.tagline}"</p>

      <dl className="mt-6 space-y-3 text-left text-sm">
        <div>
          <dt className="text-muted-foreground">Primary location</dt>
          <dd className="font-medium text-brand-ink">
            {BRAND.locationFlag} {BRAND.location}
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
