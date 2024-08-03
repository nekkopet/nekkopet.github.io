/**
 *  Store Interface
 */
export default interface Store {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    products: { data: [] };
    Links: { label: string, url: string, }[];
    Logo: {
      data: {
        id: string,
        attributes: {
          formats: {
            medium: {
              ext: string,
              url: string,
              width: number,
              height: number,
            }
          }
        }
      }
    },
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
