import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/reviews" });
  },
  head: () => ({
    meta: [
      { title: "Work & Reviews | Heseven" },
      {
        name: "description",
        content: "Read client reviews and explore the work Heseven has delivered for eCommerce brands.",
      },
      { property: "og:title", content: "Work & Reviews | Heseven" },
      {
        property: "og:description",
        content: "Read client reviews and explore the work Heseven has delivered for eCommerce brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});