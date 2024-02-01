'use strict';

/**
 * public-file service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-file.public-file');
