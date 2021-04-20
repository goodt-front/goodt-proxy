import Http from './Http';
import AuthManager from './../managers/AuthManager';

export default class HttpAuth extends Http {
    constructor(options = {}) {
        super(options);
        this.axios.interceptors.request.use(config => {
            let adapter = AuthManager.instance.adapter;
            if (adapter) {
                return adapter
                    .updateToken()
                    .then(() => {
                        config.headers.Authorization = `Bearer ${adapter.token}`;
                        return config;
                    })
                    .catch(() => adapter.login());
            }
            return config;
        });
    }
}
