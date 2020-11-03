module.exports = {
  definition: `
  `,
  query: `
    articleBySlug(slug:String): [Article]
  `,
  mutation: `
    createArticle(input:createArticleInput): createArticlePayload
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
      createArticle: {
        description: 'overwrite create Article without title duplication',
        resolver: 'application::article.article.articleBySlug',
      }
    }
  },
};
