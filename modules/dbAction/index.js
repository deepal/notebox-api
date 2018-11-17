
class DBAction {
    constructor({ container, config }) {
        this.container = container;
        this.config = config;
        this.orchestrator = this.container.get('orchestrator');

        this.initialize = this.initialize.bind(this);
        this.helpers = this.helpers.bind(this);
        this.connection = this.container.get('database/connection');
        this.lib = this.container.get('lib');
    }

    setupHelpers(){

    }
}
