import type Store from "@interfaces/Store";
import type { Site, SocialObjects } from "./types";

const STRAPI_URL = (process.env.STRAPI_URL || '').replace(/\/$/, '') || 'https://api.markket.place';
const STORE_SLUG = process.env.STORE_SLUG as string || 'markket';

let baseURL = '';
let store: Store = {} as Store;

try {
  const url = `${STRAPI_URL}/api/stores?filters[slug][$eq]=${STORE_SLUG}&populate[1]=URLS&populate[2]=SEO`;
  const storeRequest = await fetch(url);
  const StoreData = await storeRequest.json();
  if (StoreData?.data?.[0]?.slug) {
    store = StoreData.data[0];
  }

  baseURL = store?.URLS?.[0]?.URL || '';
} catch (error) {
  console.error("Error fetching store data", error);
}

/**
 * @type {{[string]: string}} Global Configuration attributes for the markket instance
 */
export const markketplace = {
  STORE_SLUG,
  STRAPI_URL,
  url: baseURL,
  colors: {
    primary: import.meta.env.COLOR_PRIMARY as string || '#fbda0c',
    accent: import.meta.env.COLOR_ACCENT as string || '#38b2ac',
  },
  POSTHOG_ID: import.meta.env.POSTHOG_ID as string || '',
};

/**
 * Global configuration attributes for the astro site
 *
 * @TODO: Read these values from the API during launch or build time
 */
export const SITE: Site = {
  website: baseURL || "https://markket.place",
  author: store.SEO?.metaAuthor || "Markket",
  profile: `https://markket.place/stores/${STORE_SLUG}`,
  desc: store.Description || "markketplace store for creators ",
  title: store.title || "Markket",
  ogImage: store.SEO?.socialImage?.url || "https://markketplace.nyc3.digitaloceanspaces.com/uploads/3852868ed9aad1e45e4ee4992fe43177.png",
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
