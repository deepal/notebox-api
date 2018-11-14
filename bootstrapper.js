const Logger = require('./libraries/logger');
const Error = require('./libraries/error');
const Security = require('./libraries/security');
const Util = require('./libraries/util');

class Bootstrapper {
    constructor(config) {
        this.logger     = new Logger(config.logger);
        this.errors     = new Error();
        this.security   = new Security();
        this.util       = new Util();
    }
}

module.exports = Bootstrapper;
