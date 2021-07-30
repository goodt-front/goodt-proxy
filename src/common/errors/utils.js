import { UncaughtTrackableError } from '@goodt-common/errors';

/**
 * Throws error that can not be caught
 * For top-level error tracking
 *
 * @param {Error} error
 * @param {any} context
 * @throws UncaughtTrackableError
 */
export const throwUncaughtError = (error, context) => {
    if (error instanceof Error) {
        /**
         * exclude service call stack from error stack trace
         */
        /**
         * async uncaught error throw for top level error tracking service
         */
        const throwAsyncError = () => {
            const trackError = new UncaughtTrackableError(error.message, error, context);
            trackError.captureStackTrace(throwAsyncError);
            throw trackError;
        };
        setTimeout(throwAsyncError);
    }
};
