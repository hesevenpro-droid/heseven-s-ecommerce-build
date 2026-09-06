import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/partnership")({
  component: Partnership,
  head: () => ({
    meta: [
      { title: "Partnership | Heseven" },
      { name: "description", content: "Partner with Heseven." },
      { property: "og:title", content: "Partnership | Heseven" },
      { property: "og:description", content: "Partner with Heseven." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/partnership" },
    ],
    links: [{ rel: "canonical", href: "/partnership" }],
  }),
});

function Partnership() {
  return (
    <SiteLayout>
      <Panel title="Partnership" titleClassName="text-primary">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Heseven partners with agencies, freelancers, and technology providers to deliver outstanding
            eCommerce experiences. If you are interested in working together, we would love to hear from you.
          </p>
          <h3 className="font-semibold text-brand-ink">Why Partner With Us</h3>
          <p>
            We bring deep Shopify expertise, a global client base, and a commitment to quality. Our partners
            benefit from referrals, shared knowledge, and access to specialised resources.
          </p>
          <h3 className="font-semibold text-brand-ink">Partnership Opportunities</h3>
          <p>
            Whether you offer complementary design, development, marketing, or technology services, there
            may be an opportunity to collaborate and grow together.
          </p>
          <h3 className="font-semibold text-brand-ink">Get in Touch</h3>
          <p>
            Please reach out through the contact form on our website with details about your business and
            how you would like to partner with Heseven.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
