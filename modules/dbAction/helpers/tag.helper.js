const Tag = require('../models/tag.model');
const { isNone } = require('../../../libraries/util/validation.util');
const { MissingParameterError } = require('../../../libraries/error');
const logger = require('../../../libraries/logger')(module);

/**
 * Create new tag
 * @param {object} tag - Tag object
 * @param {string} tag.name - Tag name
 * @param {string} tag.authorId - Author ID
 * @returns {Promise}
 */
exports.createTag = async ({ name, authorId } = {}) => {
    const now = new Date();
    const tag = new Tag({
        name,
        authorId,
        created: now,
        lastModified: now
    });
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
        throw new MissingParameterError('filter', 'list_tags');
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
        throw new MissingParameterError('filter', 'delete_tag');
    }

    return Tag.findOneAndDelete(filter).exec();
};
