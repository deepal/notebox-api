const GenericError = require('./genericError');

class DatabaseOperationFailed extends GenericError {
    constructor(message) {
        super(message);

        this.code = 'ERR_DATABASE_OPERATION_FAILED';
        this.message = message;
    }
}

module.exports = DatabaseOperationFailed;
