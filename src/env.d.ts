/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
export interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STORE_SLUG: string;
  readonly POSTHOG_ID: string;
  readonly BASE_URL: string;
  readonly COLOR_PRIMARY: string;
  readonly COLOR_ACCENT: string;
  readonly STORE_AUTHOR: string;
  readonly STORE_DESCRIPTION: string;
  readonly STORE_TITLE: string;
  readonly STORE_OG_IMAGE: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
