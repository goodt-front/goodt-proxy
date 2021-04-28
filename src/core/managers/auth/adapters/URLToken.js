import merge from 'lodash/merge';
import Adapter from './Adapter';
import Http from '../../../net/Http';

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

export default class extends Adapter {
    /**
     * Constructor
     * @param {Object} [config={}]
     */
    constructor(config = {}) {
        config = merge({}, configDefault, config);
        super(config);
        this._http = new Http();
        this._token = null;
        this._authenticated = false;
    }

    /**
     * Init adapter
     * @return {Promise}
     */
    init() {
        return new Promise(resolve => {
            let p = new URLSearchParams(location.search);
            this._token = p.get(this.config.tokenParam);
            if (!this._token) {
                p = new URLSearchParams(location.hash.replace(/^.*#.*\?/, ''));
                this._token = p.get(this.config.tokenParam);
            }
            resolve(this._authenticated);
        });
    }

    /**
     * Login method
     * @param {Object} [credentials={}]  user credentials
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
        return new Promise(resolve => {
            const { url, method } = this.config.logout;
            this._http.request({ url, method }).then(() => {
                this._authenticated = false;
                resolve();
            });
        });
    }

    /**
     * Return auth status
     * @return {Boolean}
     */
    get authenticated() {
        return this._authenticated;
    }

    /**
     * Return token
     * @return {String}
     */
    get token() {
        return this._token;
    }

    /**
     * Returns default config
     * @return {Object}
     */
    get configDefault() {
        return { ...configDefault };
    }
}
