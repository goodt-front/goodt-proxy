import { SDKFactory } from '@goodt/core/dremio';
import Keycloak from './Keycloak';

class KeycloakDremio extends Keycloak {
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
     *
     * @return {Promise}
     */
    logout() {
        this._clearCache();
        return super.logout();
    }

    /**
     * Returns session permissions list
     *
     * @return {Promise.<object[]>}
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
     *
     * @return {Promise.<object[]>}
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

    /**
     * @private
     */
    _clearCache() {
        this._cache = {
            permissions: null,
            userPermissions: null
        };
    }
}

export default KeycloakDremio;
