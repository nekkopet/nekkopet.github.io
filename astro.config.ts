import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE, markketplace } from "./src/config";




let baseURL = SITE.website;

try {
  const url = `${markketplace.STRAPI_URL}/api/stores?filters[slug][$eq]=${markketplace.STORE_SLUG}&populate[1]=URLS&populate[2]=SEO`;
  const storeRequest = await fetch(url);
  const StoreData = await storeRequest.json();
  baseURL = StoreData?.data?.[0]?.URLS?.[0]?.URL || '';
} catch (error) {
  console.error("Error fetching store data", error);
}

/**
 * @type {import('astro/types').RuntimeConfig}
 */
export default defineConfig({
  site: baseURL,
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  output: "static",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
