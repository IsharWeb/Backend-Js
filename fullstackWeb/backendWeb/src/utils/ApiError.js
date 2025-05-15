class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = "",
        // path = "",
        // originalError = null
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.stack = stack || new Error().stack;
        this.success = false;
        // this.timestamp = new Date().toISOString();
        // this.path = path;
        // this.originalError = originalError;
        this.data = null;

        // Capture stack trace properly if stack is not provided
        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
