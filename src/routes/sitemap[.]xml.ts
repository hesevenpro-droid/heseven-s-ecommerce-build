import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { SERVICES } from "@/lib/site-data";

const BASE_URL = "https://heseven-growth-hub.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        for (const service of SERVICES) {
          const location = router.buildLocation({
            to: "/services/$slug",
            params: { slug: service.slug },
            search: () => ({}),
            hash: "",
          });
          const path = sitemapPathForLocation(router, location, "/services/$slug");
          if (path) entries.push({ path });
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});