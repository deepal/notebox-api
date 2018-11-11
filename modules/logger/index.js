const bunyan = require('bunyan');

/**
 *
 */
module.exports = (module) => {
    return bunyan.createLogger({ name: process.env.APP_NAME });
};
