import { BaseError } from '@goodt-common/errors';

export class UncaughtTrackableError extends BaseError {
    context;

    reason;

    constructor(message, reason, context) {
        super(message);
        this.reason = reason;
        this.context = context;
    }

    toValue() {
        return this.reason;
    }

    toString() {
        return this.reason.toString();
    }
}
