const User = require('../models/user');
const {
    isNone,
    isNonEmptyObject,
    isPositiveNumber,
    isNonEmptyString
} = require('../../util/validation');
const { MissingParameterError } = require('../../error');
const logger = require('../../logger')(module);

/**
 * Create user object
 * @param {object} userObj - User object
 * @returns {Promise}
 */
exports.createUser = async (userObj = {}) => {
    const {
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl
    } = userObj;
    const now = new Date();
    const newUser = new User({
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl,
        created: now,
        lastModified: now
    });
    const createdUser = await newUser.save();
    const { id } = createdUser;
    logger.info(`created user (${id})!`);
    return createdUser;
};

exports.findOrCreateUser = async (userObj = {}) => {
    const {
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl
    } = userObj;

    if (!isNonEmptyString(email)) {
        throw new MissingParameterError('userObj.email', 'find_or_create_user');
    }

    const { getUser, createUser } = exports;

    const user = await getUser({ email });

    if (isNonEmptyObject(user)) return user;

    // create user
    logger.info(`no existing user found matching email ${email}. creating new user account`);
    const created = await createUser({
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl
    });
    return created;
};

/**
 * Update existing user object
 * @param {object} userObj - Updated user object
 * @returns {Promise}
 */
exports.updateUser = async (userObj = {}) => {
    const {
        id,
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl
    } = userObj;

    if (isNone(id)) {
        throw new MissingParameterError('id', 'update_user');
    }

    const updatedUser = await User.findOneAndUpdate({ id }, {
        firstName,
        lastName,
        email,
        googleProfile,
        homepageUrl,
        lastModified: new Date()
    }).lean().exec();

    logger.info(`updated user (${id})!`);
    return updatedUser;
};

/**
 * Get user from database
 * @param {object} filter - Search filter
 * @returns {Promise}
 */
exports.getUser = async (filter) => {
    if (isNone(filter)) {
        throw new MissingParameterError('filter', 'get_user');
    }

    return User.findOne(filter).lean().exec();
};

/**
 * List useres matching a provided criteria
 * @param {object} params - Additional parameters for list useres
 * @param {object} params.filter - MongoDB search filter to search useres
 * @param {number} params.limit - Results limit
 * @param {object} params.sort - MongoDB sort criteria for results
 * @param {boolean} params.lean - Whether to return results as a JSON or MongoDB model
 * @returns {Promise}
 */
exports.listUseres = async ({ filter, limit, sort, lean = true } = {}) => {
    let query = User.find(filter);

    if (isNonEmptyObject(sort)) query = query.sort(sort);
    if (isPositiveNumber(limit)) query = query.limit(limit);
    if (lean) query = query.lean();

    return query.exec();
};

/**
 * Delete user from database
 * @param {object} filter - Search Filter
 * @returns {Promise}
 */
exports.deleteUser = async (filter) => {
    if (isNone(filter)) {
        throw new MissingParameterError('filter', 'delete_user');
    }

    await User.findOneAndDelete(filter).exec();
    logger.info(`deleted user matching filter: ${filter}`);
};
