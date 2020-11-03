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
  }
};
