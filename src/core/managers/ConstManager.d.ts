export default class ConstManager {
    /**
     * @return {ConstManager}
     */
    static instance: ConstManager;

    /**
     * Constructor
     *
     * @param {symbol} enforcer  singleton enforcer
     */
    constructor(enforcer: symbol);

    private _constants: {};

    /**
     * Return key value or key if no value found
     *
     * @param {string} key  key
     * @return {any} value
     */
    getConstValue(key: string): any;

    /**
     * Set the constants hash
     *
     * @param {Record<string, any>} constants
     */
    setConstantsHash(constants?: Record<string, any>): void;

    /**
     * Return the constants hash
     *
     * @return {Record<string, any>}
     */
    getConstantsHash(): Record<string, any>;
}
