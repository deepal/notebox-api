const { Types } = require('mongoose');

exports.stringToObjectId = str => Types.ObjectId(str);

exports.objectIdToString = (mongodbObjectId) => {
    return mongodbObjectId.toString();
};
