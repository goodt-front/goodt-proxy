import { useApiService } from '@goodt-common/mixins';
import { createApiService } from './ApiService';
import { createOrgStructureApiService } from './OrgStructureApiService';

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useApiServiceMixin = ({ apiBaseURL = 'apiBaseUrl' } = {}, { name = 'apiService' } = {}) => {
    const { mixin: ServiceMixin } = useApiService(createApiService, { apiBaseURL }, { name });

    return ServiceMixin;
};

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useOrgStructureApiServiceMixin = (
    { apiBaseURL = 'orgStructureApiUrl' } = {},
    { name = 'orgStructureApi' } = {}
) => {
    const { mixin: ServiceMixin } = useApiService(createOrgStructureApiService, { apiBaseURL }, { name });

    return ServiceMixin;
};

/**
 * Это "пустой" вспомогательный объект с JSDOc аннотацией
 * для примешивания информации о сервисе
 * в структуру инстанса компонента и типах
 * исключительно для Vetur
 *
 * @type {{ orgStructureApiUrl: string, orgStructureApi: OrgStructureApiService }}
 */
export const OrgStructureApiServiceTypeDescriptor = undefined;
/**
 * @type {{ apiBaseUrl: string, apiService: ApiService }}
 */
export const ApiServiceTypeDescriptor = undefined;
