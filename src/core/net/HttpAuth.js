import { Http } from './Http';
import AuthManager from '../managers/AuthManager';

class HttpAuth extends Http {
    /**
     * @type {AuthManager}
     * @private
     */
    _authManager = AuthManager.instance;

    /**
     *
     * @param {AuthManager} authManager
     */
    setAuthManager(authManager) {
        this._authManager = authManager;
    }

    /**
     * Constructor
     *
     * @param {import('./types').ITransportOptions} [options={}]  transport config
     */
    constructor(options = {}) {
        super(options);
        this.axios.interceptors.request.use((config) => {
            const { adapter } = this._authManager;
            if (adapter == null) {
                return config;
            }
            return adapter
                .init()
                .then(() => adapter.updateToken())
                .then(() => {
                    const configFinal = { ...config };
                    configFinal.headers.Authorization = `Bearer ${adapter.token}`;

                    return configFinal;
                })
                .catch(() => adapter.login());
        });
    }
}

export { HttpAuth, HttpAuth as default };
