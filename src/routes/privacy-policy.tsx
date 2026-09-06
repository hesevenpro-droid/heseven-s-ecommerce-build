import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Heseven" },
      { name: "description", content: "Heseven privacy policy." },
      { property: "og:title", content: "Privacy Policy | Heseven" },
      { property: "og:description", content: "Heseven privacy policy." },
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
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            At Heseven, we respect your privacy and are committed to protecting any personal information
            you share with us. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
          <h3 className="font-semibold text-brand-ink">Information We Collect</h3>
          <p>
            We may collect personal information such as your name, email address, phone number, and business
            details when you contact us through our website or services.
          </p>
          <h3 className="font-semibold text-brand-ink">How We Use Your Information</h3>
          <p>
            Your information is used to respond to inquiries, provide our services, and improve your
            experience with Heseven. We do not sell or share your data with third parties for marketing
            purposes.
          </p>
          <h3 className="font-semibold text-brand-ink">Data Security</h3>
          <p>
            We implement appropriate security measures to protect your personal information from
            unauthorised access, disclosure, or misuse.
          </p>
          <h3 className="font-semibold text-brand-ink">Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the contact form
            on our website.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
