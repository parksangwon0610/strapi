'use strict';
const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async data => {
      data.slug = await strapi.services.unique.makeUID('article', 'slug', data.slug, data.title);
    }
  }
};
