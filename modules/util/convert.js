const { Types } = require('mongoose');
const logger = require('../logger')(module);

exports.stringToObjectId = str => Types.ObjectId(str);

exports.objectIdToString = (mongodbObjectId) => {
    try {
        return mongodbObjectId.toString();
    } catch (err) {
        logger.error('an error occurred while converting ObjectId to String. returning an empty string', err);
        return '';
    }
};
