import { SDK as DremioSdk } from 'goodt-dremio-sdk';
import AuthManager from '@goodt/core/managers/AuthManager';
import Const from '../Const';

class DremioSdkAuth extends DremioSdk {
    constructor(options) {
        super(options);
        this.beforeRequest = () =>
            new Promise((resolve) => {
                const { adapter } = AuthManager.instance;
                if (adapter) {
                    adapter
                        .updateToken()
                        .then(() => {
                            this.config.authToken = adapter.token;
                        })
                        .finally(() => resolve());
                } else {
                    resolve();
                }
            });
    }
    dispose() {
        this.cancelActiveRequests();
    }
}

/**
 * Dremio sdk factory
 *
 * @param {import('goodt-dremio-sdk').SDKConfig} config
 * @return {SDK}  sdk instance
 */
const SDKFactory = (config = {}) => {
    const configDefault = {
        host: Const.DREMIO_API_URL
    };

    const instance = new DremioSdkAuth({ ...configDefault, ...config });

    return instance;
};

export { SDKFactory };

export default DremioSdkAuth;
