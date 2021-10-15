import { createTransport, HttpAuthTransportSymbol } from '@goodt-wcore/net';
import { useApiService } from '@goodt-common/mixins';
import { OrgStructureApiService } from './OrgStructureApiService';

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions={}]
 * @param {import('@goodt-common/mixins').IApiServiceConstructorOptions} [serviceFactoryOptions={}]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useOrgStructureApiServiceMixin = (
    { apiBaseURL = 'orgStructureApiUrl' } = {},
    { name = 'orgStructureApiService' } = {},
    serviceFactoryOptions = {}
) => {
    const { transport = createTransport(HttpAuthTransportSymbol), client } = serviceFactoryOptions;
    const create = (options) => new OrgStructureApiService({ client, transport, options });
    const { mixin } = useApiService(create, { apiBaseURL }, { name });

    return mixin;
};
