const { EventEmitter } = require('events');

class Orchestrator {
    constructor() {
        this.emitter = new EventEmitter();
        this.getModule = this.getModule.bind(this);
    }

    getModule() {
        return {
            orchestrator: this.emitter
        };
    }
}

module.exports = Orchestrator;
