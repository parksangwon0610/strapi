'use strict';
const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async model => {
      console.log('model ', model);
      if (model.title) {
        model.slug = slugify(model.title);
      }
    }
  }
};
