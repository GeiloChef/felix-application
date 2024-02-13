'use strict';

/**
 * file-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::file-tag.file-tag');
