const GenericError = require('./genericError');

class MissingParameterError extends GenericError {
    constructor(params) {
        super(params);
        let missingParams = '';
        if (typeof params === 'string') missingParams = `: ${params}`;
        if (Array.isArray(params)) missingParams = `: ${params.join(',')}`;

        this.code = 'ERR_MISSING_PARAMETER';
        this.message = `Missing required parameter(s)${missingParams}`;
    }
}

module.exports = MissingParameterError;
