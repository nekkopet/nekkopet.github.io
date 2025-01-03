/**
 * Interface for Product
 */
export default interface Product {
  id: number;
  Name: string;
  URLS: { Label: string, URL: string, }[];
  SEO: {
    metaTitle: string,
    metaDescription: string,
  };
  Thumbnail: {
    id: string,
    url: string,
    formats: {
      medium: {
        ext: string,
        url: string,
        width: number,
        height: number,
      },
      small: {
        ext: string,
        url: string,
        width: number,
        height: number,
      }
    }
  },
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
