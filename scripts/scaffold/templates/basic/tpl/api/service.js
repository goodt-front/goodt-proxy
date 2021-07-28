import { BaseApiService } from '@goodt-common/services/api';
import { buildRequest } from './utils';

/**
 * Service actions
 */
const ServiceAction = {
    GET_USER_BY_ID: { url: 'users/:id', options: { method: 'get' } }
};

/**
 * ApiService class
 */
export class ApiService extends BaseApiService {
    /**
     * Get user info by id
     *
     * @param {string|number} id    user id
     * @return {Promise<import('@goodt-common/utils').ISafeResult<any, Error>>} result
     */
    getUserById(id) {
        const request = buildRequest({ action: ServiceAction.GET_USER_BY_ID, pathParams: { id } });
        return this.request(request);
    }
}

/**
 * Service factory
 *
 * @param {import('@goodt-wcore/net').ITransport} transport     transport
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} options   service options
 * @return {ApiService} service instance
 */
export const createApiService = (transport, options) => new ApiService({ transport, options });
