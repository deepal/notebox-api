const mongoose = require('mongoose');

class Connector {
    constructor({ container, config }) {
        this.container = container;
        this.config = config;
    }

    createConnection() {
        return mongoose.connect(this.config.connectionString);
    }
}

module.exports = Connector;
