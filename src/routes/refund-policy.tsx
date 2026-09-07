import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
  head: () => ({
    meta: [
      { title: "Refund Policy | Heseven" },
      { name: "description", content: "Heseven cancellation, refund and project payment policy." },
      { property: "og:title", content: "Refund Policy | Heseven" },
      { property: "og:description", content: "Heseven cancellation, refund and project payment policy." },
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
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p className="text-xs font-medium uppercase text-primary">Last updated: 7 September 2026</p>
          <p>
            Heseven provides bespoke digital services. Because time and resources are reserved for each
            project, refunds are assessed according to the stage of work completed and the written proposal
            or agreement accepted by the client.
          </p>
          <h3 className="font-semibold text-brand-ink">Deposits and advance payments</h3>
          <p>
            Deposits and advance payments secure project time and are non-refundable once work has started.
            If Heseven cancels a project before work begins, we will return the amount paid for undelivered
            services. Third-party charges already incurred are not refundable.
          </p>
          <h3 className="font-semibold text-brand-ink">Cancellations</h3>
          <p>
            A client may cancel by written notice. The client remains responsible for work completed, time
            committed and non-cancellable costs up to the cancellation date. Any eligible balance will be
            calculated after these amounts are deducted and returned to the original payment method.
          </p>
          <h3 className="font-semibold text-brand-ink">Completed work and digital services</h3>
          <p>
            Approved milestones, completed deliverables, delivered consultations and hours already worked are
            not refundable. Refunds are also unavailable where a delay or issue results from missing client
            content, access or feedback, a change in scope, or a third-party platform, app, theme or provider.
          </p>
          <h3 className="font-semibold text-brand-ink">Issues and revisions</h3>
          <p>
            If a deliverable does not match the agreed scope, notify us in writing within 7 calendar days of
            delivery and explain the issue clearly. We will first use the agreed revision process to correct
            qualifying issues. Additional requests or changes outside scope will be quoted separately.
          </p>
          <h3 className="font-semibold text-brand-ink">Requesting a refund</h3>
          <p>
            Email heseven.pro@gmail.com with your name, project reference, payment date and reason for the
            request. We will review the project record and respond within 10 business days. Any approved
            refund may take additional time to appear depending on the payment provider.
          </p>
          <p>
            If a signed proposal or service agreement contains different cancellation or refund terms, that
            agreement takes priority over this general policy.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
