import { ApiClientMethod, BaseApiService, buildRequest } from '@goodt-common/services/api';
import { useApiService } from '@goodt-common/mixins';
[[#http]]
import { createTransport, HttpTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]
[[^http]]
import { createTransport, HttpAuthTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]

/**
 * Service actions metadata
 */
const ServiceAction = {
    GET_USER_BY_ID: {
        url: 'users/:id',
        // options is optional and could be omitted
        // default HTTP Request Method is ApiClientMethod.GET === 'GET' and also could be omitted
        options: { method: ApiClientMethod.GET } }
};

/**
 * ApiService class
 */
export class ApiService extends BaseApiService {
    /**
     * Get user info by id
     *
     * @param {string|number} id user id
     * @return {Promise<import('@goodt-common/utils').ISafeResult<*, Error>>} result
     */
    getUserById(id) {
        // HTTP GET Method query string params
        const queryParams = {
            order: 'asc',
            sort: 'name'
        };

        const request = buildRequest({
            action: ServiceAction.GET_USER_BY_ID,
            pathParams: { id },
            params: queryParams,
        });

        /**
         * @example
         * for `id = 1`
         * final request `url` path with query string would be
         * `users/1?sort=name&order=asc`
         */

        return this.request(request);
    }
}

/**
 * Service factory
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} options service options
 * @param {import('@goodt-wcore/net').ITransport} [transport] transport
 * @return {ApiService} service instance
 */
export const createApiService = (options, transport) => {
    if (transport == null) {
        // eslint-disable-next-line no-param-reassign
        [[#http]]
        transport = createTransport(HttpTransportSymbol);
        [[/http]]
        [[^http]]
        transport = createTransport(HttpAuthTransportSymbol);
        [[/http]]
    }

    return new ApiService({ transport, options });
};

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useApiServiceMixin = (
    { apiBaseURL = 'apiBaseUrl' } = {},
    { name = 'apiService' } = {}
) => {
    const { mixin: ServiceMixin } = useApiService(createApiService, { apiBaseURL }, { name });

    return ServiceMixin;
};

/**
 * Это "пустой" вспомогательный объект с JSDOc аннотацией
 * для примешивания информации о сервисе
 * в структуру инстанса компонента и типах
 * исключительно для Vetur
 *
 * @type {{ apiBaseURL: string }}
 */
export const ApiServiceTypeDescriptor = undefined;
