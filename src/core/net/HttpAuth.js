import { Http } from './Http';
import AuthManager from '../managers/AuthManager';

class HttpAuth extends Http {
    /**
     * Constructor
     *
     * @param {import('./types').ITransportOptions} [options={}]  transport config
     */
    constructor(options = {}) {
        super(options);
        this.axios.interceptors.request.use((config) => {
            const { adapter } = AuthManager.instance;
            if (adapter == null) {
                return config;
            }
            return adapter
                .updateToken()
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
