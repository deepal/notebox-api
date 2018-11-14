const { isNone, isNonEmptyString } = require('./validation.util');

exports.renameProperty = (obj, oldPropertyName, newPropertyName) => {
    if (isNone(obj)) return false;
    if (!isNonEmptyString(oldPropertyName) || !isNonEmptyString(newPropertyName)) return obj;

    if (Object.hasOwnProperty.call(obj, oldPropertyName)) {
        const transformedObj = obj;
        transformedObj[newPropertyName] = transformedObj[oldPropertyName];
        delete transformedObj[oldPropertyName];
        return transformedObj;
    }
    return obj;
};
