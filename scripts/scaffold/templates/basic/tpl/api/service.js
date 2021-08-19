import { BaseApiService } from '@goodt-common/services/api';
import { useApiService } from '@goodt-common/mixins';
[[#http]]
import { createTransport, HttpTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]
[[^http]]
import { createTransport, HttpAuthTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]

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
     * @return {Promise<import('@goodt-common/utils').ISafeResult<*, Error>>} result
     */
    getUserById(id) {
        const request = buildRequest({ action: ServiceAction.GET_USER_BY_ID, pathParams: { id } });
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
export const useApiServiceMixin = (serviceOptions, mixinOptions) => {
    const { mixin: ServiceMixin } = useApiService(createApiService, serviceOptions, mixinOptions);

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
export const ServiceTypeDescriptor = undefined;
