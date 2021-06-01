/**
 * @typedef {object} AdapterInfo
 * @property {string} name      name
 * @property {Record<string, any>} config default config
 */
import Adapter from './auth/adapters/Adapter';

export default class AuthManager {
    /**
     * @return {AuthManager}
     */
    static instance: AuthManager;

    /**
     * Constructor
     *
     * @param {symbol} enforcer  singleton enforcer
     */
    constructor(enforcer: symbol);

    /**
     * @property {Adapter}
     */
    private _adapter: any;

    /**
     * Initializes manager with the specified adapter
     *
     * @param {string} adapterName  adapter name
     * @param {Record<string, any>} config       adapter config
     * @return {Promise}
     */
    init(adapterName: string, config?: Record<string, any>): Promise<any>;

    /**
     * Destroys adapter
     */
    destroy(): Promise<any>;

    /**
     * Current used adapter
     *
     * @return {Adapter} adapter
     */
    readonly adapter: any;

    /**
     * Available adapters list
     *
     * @return {object.<string, Adapter>}
     */
    readonly adaptersList: Record<string, Adapter>;

    /**
     * Available adapters info
     *
     * @return {AdapterInfo[]}
     */
    readonly adaptersInfo: AdapterInfo[];

    /**
     * @private
     * @param {string} adapterName
     * @param {Record<string, any>} config
     * @return
     */
    private _createAdapter;
}
export type AdapterInfo = {
    /**
     * name
     */
    name: string;
    /**
     * default config
     */
    config: Record<string, any>;
};
