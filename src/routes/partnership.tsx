import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Panel } from "@/components/site/Sections";

export const Route = createFileRoute("/partnership")({
  component: Partnership,
  head: () => ({
    meta: [
      { title: "Partnership | Heseven" },
      { name: "description", content: "Partner with Heseven on referrals, white-label delivery and technology collaborations." },
      { property: "og:title", content: "Partnership | Heseven" },
      { property: "og:description", content: "Partner with Heseven on referrals, white-label delivery and technology collaborations." },
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
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Heseven collaborates with agencies, consultants, freelancers and technology providers to deliver
            dependable eCommerce work for growing brands. We build partnerships around clear communication,
            complementary expertise and consistently high standards.
          </p>
          <h3 className="font-semibold text-brand-ink">Referral partnerships</h3>
          <p>
            Refer clients who need store builds, redesigns, custom development, performance improvements,
            conversion optimisation or ongoing support. Referral arrangements, responsibilities and any fees
            are agreed in writing before an introduction becomes an active project.
          </p>
          <h3 className="font-semibold text-brand-ink">Agency and white-label delivery</h3>
          <p>
            We can support agencies that need additional design, development or eCommerce capacity. Heseven
            can work as a visible delivery partner or under an agreed white-label arrangement, with defined
            communication, confidentiality and quality controls.
          </p>
          <h3 className="font-semibold text-brand-ink">Technology partnerships</h3>
          <p>
            We welcome collaboration with app providers, platforms and specialists whose products or services
            can improve our clients’ stores. Recommendations remain based on client needs, suitability and
            transparency rather than commission alone.
          </p>
          <h3 className="font-semibold text-brand-ink">How partnerships work</h3>
          <p>
            Every opportunity is reviewed individually. Before work begins, we agree the scope, ownership of
            the client relationship, confidentiality, commercial terms and delivery responsibilities in
            writing. Either party may decline an opportunity where it is not the right fit.
          </p>
          <h3 className="font-semibold text-brand-ink">Start a conversation</h3>
          <p>
            Email heseven.pro@gmail.com with an introduction to your business, the type of partnership you
            have in mind and any relevant client or project details. Please do not send confidential client
            information until an appropriate agreement is in place.
          </p>
        </div>
      </Panel>
    </SiteLayout>
  );
}
