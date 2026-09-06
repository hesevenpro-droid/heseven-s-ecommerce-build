import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
  head: () => ({
    meta: [
      { title: "Refund Policy | Heseven" },
      { name: "description", content: "Heseven refund policy." },
      { property: "og:title", content: "Refund Policy | Heseven" },
      { property: "og:description", content: "Heseven refund policy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
});

function RefundPolicy() {
  return (
    <SiteLayout>
      <Panel title="Refund Policy" titleClassName="text-primary">
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Heseven is committed to delivering high-quality services. This Refund Policy outlines the terms
            under which refunds may be issued.
          </p>
          <h3 className="font-semibold text-brand-ink">Service Deposits</h3>
          <p>
            Deposits for custom work are non-refundable once work has commenced, unless otherwise agreed in
            writing.
          </p>
          <h3 className="font-semibold text-brand-ink">Refund Requests</h3>
          <p>
            If you are not satisfied with our services, please contact us within 7 days of delivery. We will
            review your request and may offer a partial or full refund at our discretion.
          </p>
          <h3 className="font-semibold text-brand-ink">Exclusions</h3>
          <p>
            Refunds do not apply to completed work that has been approved, third-party costs, or services
            where the scope was clearly agreed upon and delivered.
          </p>
          <h3 className="font-semibold text-brand-ink">Contact</h3>
          <p>For refund inquiries, please reach out through the contact form on our website.</p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
