import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfService,
  head: () => ({
    meta: [
      { title: "Terms of Service | Heseven" },
      { name: "description", content: "Heseven terms of service." },
      { property: "og:title", content: "Terms of Service | Heseven" },
      { property: "og:description", content: "Heseven terms of service." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms-of-service" },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
});

function TermsOfService() {
  return (
    <SiteLayout>
      <Panel title="Terms of Service" titleClassName="text-primary">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            These Terms of Service govern your use of the Heseven website and services. By using our website
            or engaging our services, you agree to these terms.
          </p>
          <h3 className="font-semibold text-brand-ink">Services</h3>
          <p>
            Heseven provides Shopify and eCommerce services including store builds, redesigns,
            optimisation, marketing, and ongoing support. Service details and pricing are provided in
            project proposals or on our services page.
          </p>
          <h3 className="font-semibold text-brand-ink">Client Responsibilities</h3>
          <p>
            Clients are responsible for providing accurate project information, timely feedback, and access
            to necessary accounts and assets required to complete the work.
          </p>
          <h3 className="font-semibold text-brand-ink">Intellectual Property</h3>
          <p>
            Upon full payment, clients receive ownership of deliverables created specifically for them,
            excluding third-party tools, themes, or plugins used in the project.
          </p>
          <h3 className="font-semibold text-brand-ink">Limitation of Liability</h3>
          <p>
            Heseven is not liable for indirect, incidental, or consequential damages arising from the use
            of our services or website.
          </p>
          <h3 className="font-semibold text-brand-ink">Changes to Terms</h3>
          <p>
            We may update these Terms of Service from time to time. Continued use of our services after
            changes constitutes acceptance of the updated terms.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
