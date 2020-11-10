const uidService = require('strapi-plugin-content-manager/services/uid');
const slugify = require('slugify');

module.exports = {
  makeUID: async (contentTypeUID, field, currentSlug, sourceText) => {
    let isAvailable = false;
    let newSlug = currentSlug;

    if (currentSlug) {
      isAvailable = await uidService.checkUIDAvailability({
        contentTypeUID: contentTypeUID,
        field: field,
        value: currentSlug,
      });
    }

    if (!isAvailable) {
      // change slug only if it is not available or not specified
      newSlug = await uidService.findUniqueUID({
        contentTypeUID: contentTypeUID,
        field: field,
        value: slugify(sourceText),
      });
    }

    return newSlug;
  }
};
