'use strict';

/**
 * private-file router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::private-file.private-file');
