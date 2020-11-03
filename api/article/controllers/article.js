'use strict';
const slugify = require('slugify');
module.exports = {
  findBySlug: async function(ctx) {
    console.log('findBySlug ctx.query >>> ', ctx.query);
    return await strapi.services.article.find(ctx.query);
  },
  articleBySlug: async function(ctx) {
    console.log('articleBySlug ctx.query >>> ', ctx.query);
    return await strapi.services.article.find({slug:ctx.query._slug});
  },
  createArticle: async function(ctx) {
    const { title, content } = ctx.query;
    const slug = slugify(title);
    const hasDuplicatedArticle = await strapi.services.article.findOne({slug});
    const obj = (hasDuplicatedArticle)
                  ? {title: title, content}
                  : ctx.query;

    return strapi.services.article.create(obj);
  }
};
