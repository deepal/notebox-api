const Connector = require('./connector');

class Database {
    constructor({ container, config }) {
        this.container = container;
        this.config = config;
        this.connection = null;

        this.initialize = this.initialize.bind(this);
        this.connect = this.connect.bind(this);
        this.export = this.export.bind(this);
    }

    initialize() {
        this.connect();
    }

    connect() {
        const connector = new Connector({ container: this.container, config: this.config });
        this.connection = connector.createConnection();
    }

    /**
     * This gets called once the module is injected into the container
     */
    getModule() {
        return {
            database: {
                connection: this.connection
            }
        };
    }
}

module.exports = Database;
