/**
 * Validate whether a provided object IS null/undefined/false or other empty value
 * @param {*} obj
 */
exports.isNone = obj => !obj;

/**
 * Validate whether a provided object IS NOT null/undefined/false or other empty value
 * @param {*} obj
 */
exports.notNone = obj => !exports.isNone(obj);

/**
 * Validate whether a provided object is exactly null
 * @param {*} obj
 */
exports.isNull = obj => (obj === null);

/**
 * Validate whether a proivided object is exactly undefined
 * @param {*} obj
 */
exports.isUndefined = obj => (obj === undefined);

/**
 * Validate whether a provided argument is a non-empty string
 * @param {*} obj
 */
exports.isNonEmptyString = str => !!str && (typeof str === 'string') && (str.length > 0);

/**
 * Validate whether the provided string argument matches the given regex
 * @param {String} str - Target String
 * @param {RegExp|String} regex - Regular Expression
 */
exports.isRegexMatch = (str, regex) => {
    if (typeof str !== 'string') return false;
    if (!regex) return false;
    if (typeof regex === 'string') {
        return new RegExp(regex).test(str);
    }
    if (regex instanceof RegExp) {
        return regex.test(str);
    }
    return false;
};

/**
 * Validate whether the given array is a string array
 * @param {*} arr - Target array
 */
exports.isStringOnlyArray = (arr) => {
    if (!Array.isArray(arr)) return false;
    return arr.every(el => typeof el === 'string');
};

/**
 * Validate whether the given argument is an empty array
 * @param {*} arr - Target array
 */
exports.isEmptyArray = arr => (Array.isArray(arr) && arr.length === 0);

/**
 * Validate whether the given parameter is a positive number
 * @param {*} num
 */
exports.isPositiveNumber = num => ((typeof num === 'number') && num > 0);

/**
 * Validate whether the given parameter is a valid date
 * @param {*} dateObj
 */
exports.isValidDate = date => (date instanceof Date);

/**
 * Validate whether the given parameter is a valid email address
 * @param {*} str
 */
exports.isValidEmail = str => exports.isRegexMatch(str, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/**
 * Validate whether the given parameter is a non-empty object
 * @param {*} obj
 */
exports.isNonEmptyObject = (obj) => {
    try {
        return !!Object.keys(obj).length;
    } catch (err) {
        return false;
    }
};
