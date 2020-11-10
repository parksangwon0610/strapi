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

  addMyComment: async function(ctx) {

    const {
      content,
      article
    } = ctx.request.body;
    const {
      id
    } = ctx.params;

    const requestQueryData = {
      content: content,
      article: {
        id: id || article.id
      }
    };

    const foundMember = await strapi.services.member.findOne({user: ctx.state.user.id});

    const createdComment = await strapi.services.comment.create({
      content: requestQueryData.content,
      article: requestQueryData.article.id,
      writer: foundMember.id
    });
    console.log('created Comment >>> ', createdComment);
    return createdComment;
  }

};
