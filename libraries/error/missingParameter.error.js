const GenericError = require('./generic.error');

class MissingParameterError extends GenericError {
    constructor(params, action) {
        super(params, action);
        let missingParams = '';
        if (typeof params === 'string') missingParams = `: ${params}`;
        if (Array.isArray(params)) missingParams = `: ${params.join(',')}`;
        let message = `Missing required parameter(s)${missingParams}`;
        if (action) {
            message += ` to perform action '${action}'`;
        }

        this.code = 'ERR_MISSING_PARAMETER';
        this.message = message;
    }
}

module.exports = MissingParameterError;
