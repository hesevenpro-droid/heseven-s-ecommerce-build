import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaPanel, LiveSites, SalesProof } from "@/components/site/Sections";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Portfolio: Live Shopify Stores by Heseven" },
      {
        name: "description",
        content:
          "Browse live client Shopify stores built, optimised and maintained by Heseven, with sales proof from real store growth.",
      },
      { property: "og:title", content: "Portfolio: Live Shopify Stores by Heseven" },
      {
        property: "og:description",
        content: "Live client Shopify stores built and optimised by the Heseven team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
});

function Portfolio() {
  return (
    <SiteLayout>
      <SalesProof />
      <LiveSites />
      <CtaPanel />
    </SiteLayout>
  );
}
