import merge from 'lodash/merge';
import Http from '@goodt/core/net/Http';
import Adapter from './Adapter';

const configDefault = {
    tokenParam: 'token',
    login: {
        url: '',
        method: 'post'
    },
    logout: {
        url: '',
        method: 'post'
    }
};

class URLToken extends Adapter {
    /**
     * Constructor
     * @param {Record<string, any>} [config={}]
     */
    constructor(config = {}) {
        const mergedConfig = merge({}, configDefault, config);
        super(mergedConfig);
        this._http = new Http();
        this._token = null;
        this._authenticated = false;
    }

    /**
     * Init adapter
     * @return {Promise}
     */
    init() {
        return new Promise((resolve) => {
            let p = new URLSearchParams(window.location.search);
            this._token = p.get(this.config.tokenParam);
            if (!this._token) {
                p = new URLSearchParams(window.location.hash.replace(/^.*#.*\?/, ''));
                this._token = p.get(this.config.tokenParam);
            }
            resolve(this._authenticated);
        });
    }

    /**
     * Login method
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise}
     */
    login(credentials = {}) {
        return new Promise((resolve, reject) => {
            const { url, method } = this.config.login;
            this._http
                .request({
                    url,
                    method,
                    params: `token=${this._token}`,
                    options: { withCredentials: true }
                })
                .then(({ data }) => {
                    this._authenticated = data === 1;
                    if (this._authenticated) {
                        resolve();
                    } else {
                        reject();
                    }
                });
        });
    }

    /**
     * Logout method
     * @return {Promise}
     */
    logout() {
        return new Promise((resolve) => {
            const { url, method } = this.config.logout;
            this._http.request({ url, method }).then(() => {
                this._authenticated = false;
                resolve();
            });
        });
    }

    /**
     * Return auth status
     * @return {boolean}
     */
    get authenticated() {
        return this._authenticated;
    }

    /**
     * Return token
     *
     * @return {string}
     */
    get token() {
        return this._token;
    }

    /**
     * Returns default config
     * @return {Record<string, any>}
     */
    // eslint-disable-next-line class-methods-use-this
    get configDefault() {
        return { ...configDefault };
    }
}

export default URLToken;
