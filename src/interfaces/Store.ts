export default interface Store {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    Logo: {
      data: {
        id: string,
        attributes: {
          format: {
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
