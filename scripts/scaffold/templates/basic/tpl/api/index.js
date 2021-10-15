import { useApiService } from '@goodt-common/mixins';
import { createApiService } from './ApiService';

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
