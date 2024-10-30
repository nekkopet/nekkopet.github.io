/**
 *  Store Interface
 */
export default interface Store {
  id: number;
  title: string;
  Description: string;
  slug: string;
  products: { data: [] };
  Links: { label: string, url: string, }[];
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
