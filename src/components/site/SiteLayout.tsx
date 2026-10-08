import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { ChatWidget } from "@/components/site/ChatWidget";
import { BRAND, INDUSTRIES, LANGUAGES, NAV, SUPPORTED_LOCATIONS } from "@/lib/site-data";
import logo from "@/assets/heseven-logo.jpg.asset.json";
import partnerBadge from "@/assets/shopify-select-partner.webp.asset.json";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop nav — top centered pill */}
      <div className="hidden lg:flex justify-center px-4 py-4">
        <NavPill />
      </div>

      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <ProfileCard onOpenChat={() => setChatOpen(true)} />
          {/* Mobile / tablet nav — below profile card */}
          <div className="mt-4 lg:hidden flex justify-center">
            <NavPill />
          </div>
        </aside>
        <div className="space-y-6">{children}</div>
      </main>

      <Footer />
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const headingClass =
    "text-xs font-bold uppercase tracking-[0.18em] text-white/90";
  const linkClass =
    "text-sm text-white/55 transition-colors hover:text-white";
  const socialClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-primary hover:bg-primary hover:text-white";

  return (
    <footer className="mt-10 bg-footer text-white">
      <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      <div className="mx-auto max-w-[1500px] px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={headingClass}>Contact Us</h3>
            <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/55">
              {BRAND.address}
            </p>
            <Link
              to="/contact"
              className="mt-4 block text-sm text-white/55 transition-colors hover:text-white"
            >
              Send us a message
            </Link>
          </div>

          <div>
            <h3 className={headingClass}>Menu</h3>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Policies</h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link to="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className={linkClass}>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className={linkClass}>
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link to="/partnership" className={linkClass}>
                  Partnership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Get Started</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Fill out the form below or email us directly, and our team will get back to you with a
              tailored solution to meet your needs.
            </p>
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 focus-within:border-primary">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Get Started
                </button>
              </div>
            </form>
            {submitted ? (
              <p className="mt-3 text-sm text-primary">Thanks! We will be in touch soon.</p>
            ) : null}

            <div className="mt-6 flex items-center gap-3">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={socialClass}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={socialClass}
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={BRAND.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={socialClass}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <span>London, United Kingdom</span>
        </div>
      </div>
    </footer>
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

function ProfileCard({ onOpenChat }: { onOpenChat: () => void }) {
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
        <button
          type="button"
          onClick={onOpenChat}
          className="block w-full rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-secondary"
        >
          Send a message
        </button>
      </div>

    </div>
  );
}
