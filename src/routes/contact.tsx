import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";
import { BRAND } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact Heseven: Shopify Agency" },
      {
        name: "description",
        content:
          "Talk to the Heseven team about your Shopify store. Send a message, average response time under one hour.",
      },
      { property: "og:title", content: "Contact Heseven: Shopify Agency" },
      {
        property: "og:description",
        content: "Get in touch with the Heseven team about your store build, SEO or ads.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <Panel
        title="We're Here to Help You Succeed"
        titleClassName="text-primary"
        subtitle="Ready to elevate your e-commerce business? Whether you need a new website, a redesign, or custom development services, we're here to assist you. Fill out the form below or email us directly, and our team will get back to you with a tailored solution to meet your needs."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-border p-5 transition-colors hover:bg-secondary"
          >
            <p className="text-xs font-semibold text-muted-foreground">WhatsApp</p>
            <p className="mt-1 text-sm font-bold text-brand-ink">{BRAND.whatsapp}</p>
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="rounded-xl border border-border p-5 transition-colors hover:bg-secondary"
          >
            <p className="text-xs font-semibold text-muted-foreground">Email</p>
            <p className="mt-1 text-sm font-bold text-brand-ink">{BRAND.email}</p>
          </a>
        </div>
        <div className="mt-4 rounded-xl bg-secondary p-4 text-sm">
          <span className="text-muted-foreground">Response Time</span>{" "}
          <strong className="text-brand-ink">{BRAND.responseTime}</strong>
        </div>
      </Panel>

      <Panel title="Send Us a Message">
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Full Name" required name="name" />
          <Field label="Email" required name="email" type="email" />
          <Field label="Phone Number" name="phone" />
          <Field label="Subject" required name="subject" />
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-brand-ink">Message *</label>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-cta rounded-full px-6 py-3 text-sm font-semibold">
              Send Message
            </button>
            {sent ? (
              <p className="mt-3 text-sm text-primary">
                Thanks, your message has been noted. We'll reply within the hour.
              </p>
            ) : null}
          </div>
        </form>
      </Panel>

      <Panel
        title="Prefer Instant Chat?"
        subtitle="Connect on WhatsApp for immediate assistance from the team."
      >
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-cta inline-block rounded-full px-6 py-3 text-sm font-semibold"
        >
          Start WhatsApp Chat
        </a>
      </Panel>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-brand-ink">
        {label} {required ? "*" : ""}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
