import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Heseven" },
      { name: "description", content: "How Heseven collects, uses, stores and protects your personal information." },
      { property: "og:title", content: "Privacy Policy | Heseven" },
      { property: "og:description", content: "How Heseven collects, uses, stores and protects your personal information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
});

function PrivacyPolicy() {
  return (
    <SiteLayout>
      <Panel title="Privacy Policy" titleClassName="text-primary">
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p className="text-xs font-medium uppercase text-primary">Last updated: 7 September 2026</p>
          <p>
            Heseven respects your privacy and is committed to protecting your personal information. This
            policy explains what we collect, why we collect it, how we use it and the rights available to you.
          </p>
          <h3 className="font-semibold text-brand-ink">Who we are</h3>
          <p>
            Heseven is an eCommerce agency based at 72 Shelton St., London, Greater London, WC2H 9JQ,
            United Kingdom. For privacy enquiries, email heseven.pro@gmail.com.
          </p>
          <h3 className="font-semibold text-brand-ink">Information we collect</h3>
          <p>
            We may collect your name, email address, telephone number, company details, project information,
            correspondence, payment and billing details, and technical information such as your IP address,
            browser type, device information and website usage data. We collect information when you contact
            us, request a quote, subscribe to updates, enter into a contract or use our website.
          </p>
          <h3 className="font-semibold text-brand-ink">How and why we use your information</h3>
          <p>
            We use personal information to respond to enquiries, prepare proposals, deliver and support our
            services, process payments, manage our client relationship, improve our website and comply with
            legal obligations. We rely on your consent, performance of a contract, our legitimate business
            interests or a legal obligation, as appropriate. You may withdraw marketing consent at any time.
          </p>
          <h3 className="font-semibold text-brand-ink">Sharing your information</h3>
          <p>
            We do not sell your personal information. We may share only what is necessary with trusted
            service providers that support hosting, communications, analytics, payments or project delivery,
            and with professional advisers or authorities where required by law. Providers are required to
            protect the information they process for us.
          </p>
          <h3 className="font-semibold text-brand-ink">International transfers and retention</h3>
          <p>
            Some providers may process information outside the United Kingdom. Where this happens, we use
            appropriate safeguards recognised by UK data protection law. We retain personal information only
            for as long as needed for the purpose collected, including legal, accounting and contractual
            requirements, then securely delete or anonymise it.
          </p>
          <h3 className="font-semibold text-brand-ink">Cookies and analytics</h3>
          <p>
            Our website may use essential cookies and limited analytics technologies to operate correctly,
            understand usage and improve performance. You can control non-essential cookies through your
            browser settings, although some features may not work as intended.
          </p>
          <h3 className="font-semibold text-brand-ink">Your rights</h3>
          <p>
            Subject to applicable law, you may request access to, correction or deletion of your information;
            restrict or object to processing; request data portability; or withdraw consent. You may also
            complain to the UK Information Commissioner’s Office. To exercise a right, email
            heseven.pro@gmail.com. We may need to verify your identity before responding.
          </p>
          <h3 className="font-semibold text-brand-ink">Security and updates</h3>
          <p>
            We use reasonable organisational and technical safeguards to protect personal information, but no
            online service is completely secure. We may update this policy to reflect changes to our practices
            or legal obligations. The date above shows the latest revision.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
