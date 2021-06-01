export class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.captureStackTrace(this.constructor);
    }

    captureStackTrace(context) {
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, context);
        } else {
            this.stack = new Error().stack;
        }
    }
}
