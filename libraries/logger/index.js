const bunyan = require('bunyan');

class Logger {
    constructor(options) {
        this.instances = new Map();
        this.logger = bunyan.createLogger(options);
    }

    static createInstance(module = {}) {
        const instanceExist = this.instances.has(module.id);
        if (instanceExist) {
            return this.instances.get(module.id);
        }
        const createdInstance = this.logger.child({ module: module.id });
        this.instances.set(module.id, createdInstance);
        return createdInstance;
    }
}

module.exports = Logger;
