export interface Tag {
  Label: string;
  Color: string;
}

export interface SEOImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  socialImage?: SEOImage;
}
