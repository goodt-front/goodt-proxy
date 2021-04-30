import Keycloak from './Keycloak';
// eslint-disable-next-line import/no-cycle
import { SDKFactory } from '../../../dremio';

export default class extends Keycloak {
    /**
     * Constructor
     * @param {Record<string, any>} [config={}]
     */
    constructor(config = {}) {
        super(config);
        this.dremio = SDKFactory();
        this._cache = {
            permissions: null,
            userPermissions: null
        };
    }

    /**
     * Login method
     * @param {Record<string, any>} [credentials={}]  user credentials
     * @return {Promise}
     */
    login(credentials = {}) {
        this._clearCache();
        return super.login(credentials);
    }

    /**
     * Logout method
     * @return {Promise}
     */
    logout() {
        this._clearCache();
        return super.logout();
    }

    /**
     * Returns session permissions list
     * @return {Promise.<Object[]>}
     */
    getPermissions() {
        return new Promise((resolve) => {
            if (this._cache.permissions) {
                resolve(this._cache.permissions);
            } else {
                this.dremio.getPermissionsInfo().then((permissions) => {
                    this._cache.permissions = permissions;
                    resolve(permissions);
                });
            }
        });
    }

    /**
     * Returns session permissions
     * @return {Promise.<Object[]>}
     */
    getUserPermissions() {
        return new Promise((resolve) => {
            if (this._cache.userPermissions) {
                resolve(this._cache.userPermissions);
            } else {
                this.dremio.getPermissions().then(({ permissions }) => {
                    this._cache.userPermissions = permissions;
                    resolve(permissions);
                });
            }
        });
    }

    _clearCache() {
        this._cache = {
            permissions: null,
            userPermissions: null
        };
    }
}
