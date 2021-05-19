import Adapter from './Adapter';

class Simple extends Adapter {
    /**
     * Constructor
     * @param {Record<string, any>} [config={}]
     */
    constructor(config = {}) {
        super(config);
        this._authenticated = false;
    }

    /**
     * Login method
     *
     * @param {Record<string, any>} [credentials={}]  user credentials
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
     * @return {boolean}
     */
    get authenticated() {
        return this._authenticated;
    }
}

export default Simple;
