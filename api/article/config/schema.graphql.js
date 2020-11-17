module.exports = {
  definition: `
    input ArticleIDInput {
      id: String
    }
  `,
  query: `
    articleBySlug(slug:String): [Article]
    commentsInArticles(id:String): [Comment]
  `,
  mutation: `
    addMyComment(content: String, article: ArticleIDInput ): Comment
  `,
  type: {
  },
  resolver: {
    Query: {
      articleBySlug: {
        description: 'Find Article by Slug',
        resolver: 'application::article.article.articleBySlug',
      },
      commentsInArticles: {
        descriptions: '',
        resolver: 'application::article.article.comments'
      }
    },
    Mutation: {
      addMyComment: {
        description: 'content 필드값과 현재 선택된 article 번호를 인수로 받아 request header에 포함된 user가 자동으로 writer로 저장되는 기능',
        resolver: 'application::article.article.addMyComment'
      }
    }
  },
};
