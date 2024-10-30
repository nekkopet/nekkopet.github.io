import { markketplace } from "@config";
import { defineCollection } from "astro:content";

import { strapiLoader } from "../lib/strapi-loader";

const posts = defineCollection({
  loader: strapiLoader({ contentType: "article", filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}` }),
});

const pages = defineCollection({
  loader: strapiLoader({ contentType: "page", filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}` }),
});

const stores = defineCollection({
  loader: strapiLoader({ contentType: "store", filter: `filters[slug][$eq]=${markketplace.STORE_SLUG}` }),
});

export const collections = { posts, pages, stores };
