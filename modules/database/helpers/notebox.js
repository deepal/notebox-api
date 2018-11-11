const NoteBox = require('../models/notebox');
const { isNone, isNonEmptyObject, isPositiveNumber } = require('../../util/validation');
const { MissingParameterError } = require('../../error');
const logger = require('../../logger')(module);

/**
 * Create Notebox document in database
 * @param {object} notebox - Creating notebox object
 * @param {string} notebox.title - Title of the notebox
 * @param {string} notebox.description - Notebox description
 * @param {string[]} notebox.tags - Notebox tags
 * @param {string[]} notebox.authorId - Notebox author's id
 * @returns {Promise}
 */
exports.createNoteBox = async ({ title, description, tags, authorId } = {}) => {
    const now = new Date();
    const newNoteBox = new NoteBox({
        title,
        description,
        tags,
        authorId,
        created: now,
        lastModified: now
    });
    const createdNoteBox = await newNoteBox.save();
    const { id, created } = createdNoteBox;
    logger.info(`created notebox (${id})!`);
    return {
        id,
        title,
        description,
        tags,
        authorId,
        created
    };
};

/**
 * Update existing Notebox document
 * @param {object} notebox - Updated notebox object
 * @param {string} notebox.id - Notebox Id
 * @param {string} notebox.title - Title of the notebox
 * @param {string} notebox.description - Notebox description
 * @param {string[]} notebox.tags - Notebox tags
 * @param {string[]} notebox.authorId - Notebox author's id
 * @returns {Promise}
 */
exports.updateNoteBox = async ({ id, title, description, tags, authorId }) => {
    if (isNone(id)) {
        throw new MissingParameterError('id', 'update_notebox');
    }

    const updatedNoteBox = await NoteBox.findOneAndUpdate({ id, authorId }, {
        title,
        description,
        tags,
        authorId,
        lastModified: new Date()
    }).lean().exec();

    logger.info(`updated notebox (${id})!`);
    return updatedNoteBox;
};

/**
 * Get notebox from database
 * @param {object} filter - Search filter
 * @returns {Promise}
 */
exports.getNoteBox = async (filter) => {
    if (isNone(filter)) {
        throw new MissingParameterError('filter', 'get_notebox');
    }

    return NoteBox.findOne(filter).lean().exec();
};

/**
 * List noteboxes matching a provided criteria
 * @param {object} params - Additional parameters for list noteboxes
 * @param {object} params.filter - MongoDB search filter to search noteboxes
 * @param {number} params.limit - Results limit
 * @param {object} params.sort - MongoDB sort criteria for results
 * @param {boolean} params.lean - Whether to return results as a JSON or MongoDB model
 * @returns {Promise}
 */
exports.listNoteBoxes = async ({ filter, limit, sort, lean = true } = {}) => {
    let query = NoteBox.find(filter);

    if (isNonEmptyObject(sort)) query = query.sort(sort);
    if (isPositiveNumber(limit)) query = query.limit(limit);
    if (lean) query = query.lean();

    return query.exec();
};

/**
 * Delete notebox from database
 * @param {object} filter - Search Filter
 * @returns {Promise}
 */
exports.deleteNoteBox = async (filter) => {
    if (isNone(filter)) {
        throw new MissingParameterError('filter', 'delete_notebox');
    }

    await NoteBox.findOneAndDelete(filter).exec();
    logger.info(`deleted notebox matching filter: ${filter}`);
};
