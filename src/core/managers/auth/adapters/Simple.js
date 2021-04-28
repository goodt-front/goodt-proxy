import Adapter from './Adapter';

export default class extends Adapter {
    /**
     * Constructor
     * @param {Object} [config={}]
     */
    constructor(config = {}) {
        super(config);
        this._authenticated = false;
    }

    /**
     * Login method
     * @param {Object} [credentials={}]  user credentials
     * @return {Promise}
     */
    login(credentials = {}) {
        this._authenticated = true;
        return super.login(credentials);
    }

    /**
     * Logout method
     * @return {Promise}
     */
    logout() {
        this._authenticated = false;
        return super.logout();
    }

    /**
     * Return auth status
     * @return {Boolean}
     */
    get authenticated() {
        return this._authenticated;
    }
}
