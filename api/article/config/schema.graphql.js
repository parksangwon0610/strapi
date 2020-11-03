module.exports = {
  definition: `
  `,
  query: `
    articleBySlug(slug:String): [Article]
  `,
  mutation: `
  `,
  type: {
  },
  resolver: {
    Query: {
      articleBySlug: {
        description: 'Find Article by Slug',
        resolver: 'application::article.article.articleBySlug',
      }
    },
    Mutation: {
    }
  },
};
