const Note = require('../models/note');
const { isNone, isNonEmptyObject, isPositiveNumber } = require('../../util/validation');
const { stringToObjectId } = require('../../util/convert');
const { MissingParameterError } = require('../../error');
const logger = require('../../logger')(module);

/**
 * Create Note document in database
 * @param {object} note - Creating note object
 * @param {string} note.title - Title of the note
 * @param {string} note.noteContent - Note Content
 * @param {string[]} note.tags - Note tags
 * @param {string[]} note.authorId - Note author's id
 * @returns {Promise}
 */
exports.createNote = async ({ title, noteContent, tags, authorId }) => {
    const now = new Date();
    const newNote = new Note({
        title,
        noteContent,
        tags,
        authorId,
        created: now,
        lastModified: now
    });
    const createdNote = await newNote.save();
    const { id, created } = createdNote;
    logger.info(`created note (${id})!`);
    return {
        id,
        title,
        noteContent,
        tags,
        authorId,
        created
    };
};

/**
 * Update existing Note document
 * @param {object} note - Updated note object
 * @param {string} note.id - Note Id
 * @param {string} note.title - Title of the note
 * @param {string} note.noteContent - Note Content
 * @param {string[]} note.tags - Note tags
 * @param {string[]} note.authorId - Note author's id
 * @returns {Promise}
 */
exports.updateNote = async ({ id, title, noteContent, tags, authorId }) => {
    if (isNone(id)) {
        logger.error('update note requires \'id\' property to be present in the updating note');
        throw new MissingParameterError('id');
    }

    const updatedNote = await Note.findOneAndUpdate({
        id: stringToObjectId(id),
        authorId: stringToObjectId(authorId)
    }, {
        title,
        noteContent,
        tags,
        authorId,
        lastModified: new Date()
    }).lean().exec();

    logger.info(`created note (${id})!`);
    return updatedNote;
};

/**
 * Get note from database
 * @param {object} filter - Note search filter
 * @returns {Promise}
 */
exports.getNote = async (filter) => {
    if (isNone(filter)) {
        logger.error('missing required parameter \'filter\' to get note');
        throw new MissingParameterError('filter');
    }

    return Note.findOne(filter).lean().exec();
};

/**
 * List notes matching a provided criteria
 * @param {object} params - Additional parameters for list notes
 * @param {object} params.filter - MongoDB search filter to search notes
 * @param {number} params.limit - Results limit
 * @param {object} params.sort - MongoDB sort criteria for results
 * @param {boolean} params.lean - Whether to return results as a JSON or MongoDB model
 * @returns {Promise}
 */
exports.listNotes = async ({ filter, limit, sort, lean = true } = {}) => {
    let query = Note.find(filter);

    if (isNonEmptyObject(sort)) query = query.sort(sort);
    if (isPositiveNumber(limit)) query = query.limit(limit);
    if (lean) query = query.lean();

    return query.exec();
};

/**
 * Delete note from database
 * @param {object} filter - Search filter
 * @returns {Promise}
 */
exports.deleteNote = async (filter) => {
    if (isNone(filter)) {
        logger.error('missing required parameter \'filter\' to delete note');
        throw new MissingParameterError('filter');
    }

    return Note.findOneAndDelete(filter);
};
