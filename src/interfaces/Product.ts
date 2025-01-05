/**
 * Interface for Product
 */
export default interface Product {
  id: number;
  Name: string;
  URLS: { Label: string, URL: string, }[];
  PRICES: {
    Name: number,
    Price: string,
    STRIPE_ID: string,
    Description: string,
  },
  SEO: {
    metaTitle: string,
    metaDescription: string,
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
    },
    metaImage: {
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
  Slides: {
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
        height: number
      }
    }
  }[],
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
  SKU: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
