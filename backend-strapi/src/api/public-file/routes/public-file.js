'use strict';

/**
 * public-file router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::public-file.public-file');
