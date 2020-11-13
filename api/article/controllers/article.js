'use strict';
const slugify = require('slugify');
const redis = require('../../utils/services/redis');
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

    // 요청 처리가 끝나면 messageAdded topic에 publish 함
    strapi.services.pubsub.publish("messageAdded", {
      messageAdded: createdComment.content
    })
    console.log('created Comment >>> ', createdComment);
    return createdComment;
  }

};
