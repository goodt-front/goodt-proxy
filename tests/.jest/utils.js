/**
 *
 */
export class ArrangeError extends Error {
    /**
     *
     * @private
     * @type {Error}
     */
    _reason;

    /**
     *
     * @param {Error} reason
     */
    constructor(reason) {
        super('Test: Arrange Error');
        this._reason = reason;
    }
}

/**
 *
 */
export class ActError extends Error {
    /**
     *
     * @private
     * @type {Error}
     */
    _reason;

    /**
     *
     * @param {Error} reason
     */
    constructor(reason) {
        super('Test: Act Error');
        this._reason = reason;
    }
}

/**
 *
 * @param done
 * @return {{act: act, arrange: arrange, assert: ((function(*): Promise<void>)|*)}}
 */
export const useAAA = ({ done }) => {
    let arrangeFn = null;
    let actFn = null;
    let triggerFn = () => {};

    /**
     * @param callback
     */
    const arrange = (callback) => {
        arrangeFn = async () => {
            try {
                const result = await callback();
                arrangeFn = null;
                return result;
            } catch (error) {
                throw new ArrangeError(error);
            }
        };
    };

    /**
     *
     * @param callback
     */
    const act = (callback) => {
        actFn = async () => {
            const context = arrangeFn ? await arrangeFn() : null;
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await callback(context, resolve);
                    if (result !== undefined) {
                        resolve(result);
                    }
                } catch (error) {
                    reject(new ActError(error));
                } finally {
                    actFn = null;
                }
            });
        };
    };

    /**
     *
     * @param callback
     * @return {Promise<void>}
     */
    const assert = (callback) => {
        triggerFn = async () => {
            const context = actFn ? await actFn() : null;
            await callback(context);
            done();
            triggerFn = null;
        };
    };

    return {
        arrange,
        act,
        assert,
        trigger: () => triggerFn()
    };
};

/**
 *
 * @param jestTest
 * @return {(function(*=, *): void)|*}
 */
export const wrapTestWithAaa = (jestTest) => (description, fn) => {
    jestTest(description, (done) => {
        const { arrange, act, assert, trigger } = useAAA({ done });
        fn(done, { arrange, act, assert });
        trigger();
    });
};
