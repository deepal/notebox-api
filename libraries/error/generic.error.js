class GenericError extends Error {
    constructor(...params) {
        super();
        this.code = 'ERR_GENERIC_ERROR';
        this.params = params;
    }

    getErrorCode() {
        return this.code;
    }

    getParams() {
        return this.params;
    }
}

module.exports = GenericError;
