import { Http } from './Http';
import AuthManager from '../managers/AuthManager';

export class HttpAuth extends Http {
    /**
     * @type {AuthManager}
     * @private
     */
    private _authManager: AuthManager;

    /**
     *
     * @param {AuthManager} authManager
     */
    setAuthManager(authManager: AuthManager);
}

export { HttpAuth as default };
