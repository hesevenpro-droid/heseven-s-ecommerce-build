import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/terms-of-service")({
  component: TermsOfService,
  head: () => ({
    meta: [
      { title: "Terms of Service | Heseven" },
      { name: "description", content: "Terms governing use of Heseven's website and eCommerce agency services." },
      { property: "og:title", content: "Terms of Service | Heseven" },
      { property: "og:description", content: "Terms governing use of Heseven's website and eCommerce agency services." },
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
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p className="text-xs font-medium uppercase text-primary">Last updated: 7 September 2026</p>
          <p>
            These terms govern your use of the Heseven website and any services we provide. By accepting a
            proposal, paying an invoice or instructing us to begin work, you agree to these terms together
            with the applicable written proposal or service agreement.
          </p>
          <h3 className="font-semibold text-brand-ink">Scope and delivery</h3>
          <p>
            Heseven provides eCommerce design, development, optimisation, marketing and support. The agreed
            scope, deliverables, timetable, fees and revision allowance will be set out in writing. Estimates
            and target dates depend on timely client cooperation and are not guarantees unless expressly
            stated otherwise.
          </p>
          <h3 className="font-semibold text-brand-ink">Client responsibilities</h3>
          <p>
            You must provide accurate instructions, lawful content, timely feedback and secure access to any
            accounts needed for the project. You confirm that you own or have permission to use all supplied
            text, images, trademarks and other materials. Delays in providing these items may change the
            delivery schedule and may result in additional fees.
          </p>
          <h3 className="font-semibold text-brand-ink">Fees and payment</h3>
          <p>
            Fees are payable according to the relevant proposal or invoice. Unless agreed otherwise, work may
            be paused while an invoice is overdue. You are responsible for taxes, transaction fees and
            third-party costs identified in the project. Additional work outside the agreed scope requires
            approval and may be billed separately.
          </p>
          <h3 className="font-semibold text-brand-ink">Revisions and acceptance</h3>
          <p>
            Revisions are limited to those included in the agreed scope. A deliverable is treated as accepted
            when you approve it in writing, publish or use it, or do not report a scope-related issue within 7
            calendar days of delivery. New requests after acceptance are treated as additional work.
          </p>
          <h3 className="font-semibold text-brand-ink">Intellectual property</h3>
          <p>
            Once all related invoices are paid, you receive the rights to bespoke final deliverables created
            specifically for your project, unless the proposal states otherwise. Heseven retains ownership of
            pre-existing methods, know-how, reusable code and working files. Third-party themes, fonts, apps,
            software and media remain subject to their own licences.
          </p>
          <h3 className="font-semibold text-brand-ink">Third-party services</h3>
          <p>
            Your project may rely on external platforms, apps, payment providers or integrations. Their terms,
            fees, availability and changes are outside our control. We are not responsible for outages,
            policy changes, account suspensions or defects caused by a third party, but we will reasonably
            assist with diagnosis where included in scope.
          </p>
          <h3 className="font-semibold text-brand-ink">Confidentiality and publicity</h3>
          <p>
            Each party will protect confidential information received from the other and use it only for the
            project. Unless agreed otherwise in writing, Heseven may identify the client and display
            non-confidential completed work in its portfolio after public launch.
          </p>
          <h3 className="font-semibold text-brand-ink">Warranties and liability</h3>
          <p>
            We will provide services with reasonable care and skill. To the fullest extent permitted by law,
            we exclude implied warranties and are not liable for indirect or consequential loss, loss of
            profit, revenue, data or opportunity. Our total liability relating to a project will not exceed
            the fees paid to Heseven for that project. Nothing in these terms excludes liability that cannot
            legally be excluded.
          </p>
          <h3 className="font-semibold text-brand-ink">Termination</h3>
          <p>
            Either party may terminate where the other materially breaches the agreement and does not remedy
            the breach within a reasonable written notice period. On termination, all fees for completed work,
            committed time and non-cancellable costs become due. Our Refund Policy applies to any remaining
            balance.
          </p>
          <h3 className="font-semibold text-brand-ink">Governing law and contact</h3>
          <p>
            These terms are governed by the laws of England and Wales, and the courts of England and Wales
            have exclusive jurisdiction. Questions may be sent through our contact page or to 72 Shelton St.,
            London, Greater London, WC2H 9JQ, United Kingdom.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
