import { SITE, markketplace } from "@config";
import { defineCollection, z } from "astro:content";

import { strapiLoader } from "../lib/strapi-loader";

// Define the Strapi posts collection
// This sets up a custom loader for Strapi content
const strapiPosts = defineCollection({
  loader: strapiLoader({ contentType: "article", filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}` }),
});

const pages = defineCollection({
  loader: strapiLoader({ contentType: "page", filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}` }),
});

const stores = defineCollection({
  loader: strapiLoader({ contentType: "store", filter: `filters[slug][$eq]=${markketplace.STORE_SLUG}` }),
});

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog, strapiPosts, pages, stores };
