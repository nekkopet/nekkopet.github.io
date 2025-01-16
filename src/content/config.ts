import { markketplace } from "@config";
import { defineCollection } from "astro:content";

import { strapiLoader } from "../lib/strapi-loader";


const pages = defineCollection({
  loader: strapiLoader({
    contentType: "page",
    filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage'
  }),
});

const stores = defineCollection({
  loader: strapiLoader({
    contentType: "store",
    filter: `filters[active]=true`,
    populate: 'SEO.socialImage,Logo,URLS,Favicon'
  }),
});

const products = defineCollection({
  loader: strapiLoader({
    contentType: "product",
    filter: `filters[stores][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage,Thumbnail,Slides,PRICES'
  }),
});

const posts = defineCollection({
  loader: strapiLoader({
    contentType: "article",
    filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage,Tags,store,cover',
    paginate: {
      limit: 100,
    }
  }),
});

const events = defineCollection({
  loader: strapiLoader({
    contentType: "event",
    filter: `filters[stores][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO,SEO.socialImage,Tag,stores,Thumbnail,Slides'
  }),
});

export const collections = { posts, pages, stores, products, events };
