/* eslint prefer-destructuring:off */
const mongoose = require('mongoose');
require('../connection');

const {
    isNonEmptyString,
    isValidDate,
    isNone
} = require('../../util/validation');

const Schema = mongoose.Schema;

const Tag = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    name: {
        type: String,
        validate: {
            validator: name => isNonEmptyString(name),
            message: () => 'tag name cannot be empty'
        }
    },
    authorId: {
        type: ObjectId,
        validate: {
            validator: authorId => !isNone(authorId),
            message: () => 'authorId is required'
        }
    },
    created: {
        type: Date,
        validate: {
            validator: created => isValidDate(created),
            message: () => 'created date should be a valid date'
        }
    }
});

module.exports = mongoose.model('Tag', Tag);
