/* eslint prefer-destructuring:off */
const mongoose = require('mongoose');
require('../connection');

const {
    isNonEmptyString,
    isStringOnlyArray,
    isValidDate,
    isNone
} = require('../../../libraries/util/validation.util');

const Schema = mongoose.Schema;

const Note = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    title: {
        type: String,
        validate: {
            validator: title => isNonEmptyString(title),
            message: props => `${props.value} is not a valid title. should be a non-empty string`
        }
    },
    noteContent: {
        type: String,
        default: ''
    },
    tags: {
        type: Array,
        validate: {
            validator: tags => isStringOnlyArray(tags),
            message: props => `${props.value} is not a valid value for tags. should be a string array`
        },
        default: []
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: authorId => !isNone(authorId),
            message: () => 'authorId is required'
        }
    },
    created: {
        type: Date,
        validate: {
            validator: created => isValidDate(created),
            message: () => 'created date should be a valid date',
        }
    },
    lastModified: {
        type: Date,
        validate: {
            validator: lastModified => isValidDate(lastModified),
            message: () => 'lastModified date should be a valid date',
        }
    }
});

module.exports = mongoose.model('Note', Note);
