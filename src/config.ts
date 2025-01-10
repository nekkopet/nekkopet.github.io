import type { Site, SocialObjects } from "./types";
import type Store from './interfaces/Store';
import dotenv from 'dotenv';

let StoreRequest = null,
  StoreData: Store | null = null;

export type markketConfig = {
  STORE_SLUG: string;
  STRAPI_URL: string;
  url: string;
  colors: {
    primary: string;
    accent: string;
  };
  POSTHOG_ID: string;
};


if (typeof process !== 'undefined') {
  dotenv.config();

  if (process.env.STRAPI_URL && process.env.STORE_SLUG) {
    const url = `${process.env.STRAPI_URL}/api/stores?filters[slug][$eq]=${process.env.STORE_SLUG}&populate[0]=URLS&populate[1]=SEO`
      .replace('//api/', '/api/');

    console.log("Fetching store data", { x: process.env.STRAPI_URL, url });
    StoreRequest = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    const StoreRequestData = await StoreRequest.json();
    StoreData = StoreRequestData?.data?.[0] as Store;
  }
}

export const STRAPI_URL = import.meta.env.STRAPI_URL || "https://api.markket.place";
export const STORE_SLUG = import.meta.env.STORE_SLUG || "markket";
export const POSTHOG_ID = import.meta.env.POSTHOG_ID || "";
export const BASE_URL = StoreData?.URLS?.[0]?.URL
  || import.meta.env.BASE_URL || "https://markket.place";


/**
 * @type {{[string]: string}} Global Configuration attributes for the markket instance
 */
export const markketplace: markketConfig = {
  STORE_SLUG,
  STRAPI_URL,
  url: BASE_URL,
  colors: {
    primary: import.meta.env.COLOR_PRIMARY as string || '#fbda0c',
    accent: import.meta.env.COLOR_ACCENT as string || '#38b2ac',
  },
  POSTHOG_ID: import.meta.env.POSTHOG_ID as string || '',
};

console.log('Markket', { markketplace });

/**
 * Global configuration attributes for the astro site
 *
 * @TODO: Read these values from the API during launch or build time
 */
export const SITE: Site = {
  website: BASE_URL || "https://markket.place",
  author: StoreData?.SEO?.metaAuthor || import.meta.env.STORE_AUTHOR || "Markket",
  profile: `https://markket.place/stores/${STORE_SLUG}`,
  desc: StoreData?.SEO?.metaDescription || import.meta.env.STORE_DESCRIPTION || "markketplace store for creators ",
  title: StoreData?.title || import.meta.env.STORE_TITLE || "Markket",
  ogImage: StoreData?.SEO?.socialImage?.url || import.meta.env.STORE_OG_IMAGE || "https://markketplace.nyc3.digitaloceanspaces.com/uploads/3852868ed9aad1e45e4ee4992fe43177.png",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/calimania/markketplace-astro",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/morirsoniando/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/caliman",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  // {
  //   name: "Mail",
  //   href: "mailto:yourmail@gmail.com",
  //   linkTitle: `Send an email to ${SITE.title}`,
  //   active: false,
  // },
  // {
  //   name: "Twitch",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Twitch`,
  //   active: false,
  // },
  // {
  //   name: "YouTube",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: false,
  // },
  // {
  //   name: "WhatsApp",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on WhatsApp`,
  //   active: false,
  // },
  // {
  //   name: "Snapchat",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Snapchat`,
  //   active: false,
  // },
  // {
  //   name: "Pinterest",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Pinterest`,
  //   active: false,
  // },
  // {
  //   name: "TikTok",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on TikTok`,
  //   active: false,
  // },
  // {
  //   name: "CodePen",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on CodePen`,
  //   active: false,
  // },
  // {
  //   name: "Discord",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Discord`,
  //   active: false,
  // },
  // {
  //   name: "GitLab",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on GitLab`,
  //   active: false,
  // },
  // {
  //   name: "Reddit",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Reddit`,
  //   active: false,
  // },
  // {
  //   name: "Skype",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Skype`,
  //   active: false,
  // },
  // {
  //   name: "Steam",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Steam`,
  //   active: false,
  // },
  // {
  //   name: "Telegram",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Telegram`,
  //   active: false,
  // },
  // {
  //   name: "Mastodon",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Mastodon`,
  //   active: false,
  // },
  //   name: "BlueSky",
  //   href: "https://bsky.app/profile/markket.place",
  //   linkTitle: `${SITE.title} on BlueSKy`,
  //   active: false,
  // },
];
