/* eslint prefer-destructuring:off */
const mongoose = require('mongoose');

const {
    isNonEmptyString,
    isRegexMatch,
    isValidDate,
    isValidEmail,
} = require('../../../libraries/util/validation.util');

const Schema = mongoose.Schema;

const User = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    firstName: {
        type: String,
        validate: {
            validator: firstName => isNonEmptyString(firstName),
            message: () => 'firstName is required'
        }
    },
    lastName: {
        type: String,
        validate: {
            validator: lastName => isNonEmptyString(lastName),
            message: () => 'lastName is required'
        }
    },
    email: {
        type: String,
        validate: {
            validator: email => isValidEmail(email),
            message: props => `'${props.value}' is not a valid email address`
        }
    },
    googleProfile: {
        type: Object,
        default: null
    },
    homepageUrl: {
        type: String,
        validate: {
            validator: url => isRegexMatch(url, /\/(.+\/)*/)
        },
        default: '/'
    },
    created: {
        type: Date,
        validate: created => isValidDate(created),
        message: () => 'created date should be a valid date',
    },
    lastModified: {
        type: Date,
        validate: lastModified => isValidDate(lastModified),
        message: () => 'lastModified date should be a valid date',
    }
});

module.exports = mongoose.model('User', User);
