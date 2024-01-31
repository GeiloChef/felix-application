'use strict';

/**
 * private-file service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::private-file.private-file');
