'use strict';

/**
 * file-download service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::file-download.file-download');
