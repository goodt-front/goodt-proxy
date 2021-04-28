import Http from './Http';
import AuthManager from "../managers/AuthManager";

export default class HttpAuth extends Http {
    constructor(options = {}) {
        super(options);
        this.axios.interceptors.request.use(config => {
            const {adapter} = AuthManager.instance;
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
