import { BaseApiService } from '@goodt-common/services/api';
import { buildRequest } from './utils';

/**
 * Service actions
 */
const ServiceAction = {
    GET_USER_BY_ID: { url: 'users/:id', options: { method: 'get' } }
};

/**
 * Service class
 */
export class Service extends BaseApiService {
    /**
     * Get user info by id
     * @param {string|number} id    user id
     * @return {Promise.<import('@goodt-common/utils').ISafeResult>}
     */
    getUserById(id) {
        const request = buildRequest({ action: ServiceAction.GET_USER_BY_ID, urlBinds: { id } });
        return this.request(request);
    }
}

/**
 * @param {import('@goodt-wcore/net').ITransport} transport
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} options
 * @return {Service}
 */
export const ServiceFactory = (transport, options) => new Service({ transport, options });
