/**
 *  Store Interface
 */
export default interface Store {
  id: number;
  Title: string;
  Description: string;
  slug: string;
  products: { data: [] };
  Links: { label: string, url: string, }[];
  Logo: {
    id: string,
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
