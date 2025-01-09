/**
 *  Store Interface
 */
export default interface Store {
  id: number;
  title: string;
  Description: string;
  slug: string;
  products: { data: [] };
  URLS: { Label: string, URL: string, }[];
  Favicon: {
    id: string, url: string,
  };
  SEO: {
    metaTitle: string,
    metaDescription: string,
    metaAuthor: string,
    socialImage: {
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
    }
  };
  Logo: {
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
