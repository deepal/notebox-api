const Tag = require('../models/tag');
const { isNone } = require('../../util/validation');
const { MissingParameterError } = require('../../error');
const logger = require('../../logger')(module);

/**
 * Create new tag
 * @param {object} tag - Tag object
 * @param {string} tag.name - Tag name
 * @param {string} tag.authorId - Author ID
 * @returns {Promise}
 */
exports.createTag = async ({ name, authorId } = {}) => {
    const tag = new Tag({ name, authorId });
    const { id, created } = await tag.save();
    logger.info(`created tag (${id})`);
    return { id, name, authorId, created };
};

/**
 * List tags matching the provided criteria
 * @param {object} filter - MongoDB filter to search tags
 * @returns {Promise}
 */
exports.listTags = async (filter) => {
    if (isNone(filter)) {
        logger.error('missing required parameter \'filter\' to get tags');
        throw new MissingParameterError('filter');
    }

    return Tag.find(filter).lean().exec();
};

/**
 * Get one tag matching the provided criteria
 * @param {object} filter - MongoDB filter to find tag
 * @returns {Promise}
 */
exports.getTag = async (filter) => {
    if (isNone(filter)) {
        logger.error('missing required parameter \'filter\' to get tag');
        throw new MissingParameterError('filter');
    }

    return Tag.findOne(filter).lean().exec();
};

/**
 * Delete one tag matching the provided criteria
 * @param {object} filter - MongoDB filter to find and delete one tag
 */
exports.deleteTag = async (filter) => {
    if (isNone(filter)) {
        logger.error('missing required parameter \'filter\' to delete tag');
        throw new MissingParameterError('filter');
    }

    return Tag.findOneAndDelete(filter).exec();
};
