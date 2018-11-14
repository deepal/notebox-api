const GenericError = require('./generic.error');

class DatabaseOperationFailed extends GenericError {
    constructor(message) {
        super(message);

        this.code = 'ERR_DATABASE_OPERATION_FAILED';
        this.message = message;
    }
}

module.exports = DatabaseOperationFailed;
