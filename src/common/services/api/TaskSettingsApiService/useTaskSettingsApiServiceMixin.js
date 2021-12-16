import { createTransport, HttpAuthTransportSymbol } from '@goodt-wcore/net';
import { useApiService } from '@goodt-common/mixins';
import { TaskSettingsApiService } from './TaskSettingsApiService';

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions={}]
 * @param {import('@goodt-common/mixins').IApiServiceConstructorOptions} [serviceFactoryOptions={}]
 * @return {import('@goodt-common/mixins').IApiServiceMixinInstance}
 */
export const useTaskSettingsApiServiceMixin = (
    { apiBaseURL = 'taskSettingsApiUrl' } = {},
    { name = 'taskSettingsApiService' } = {},
    serviceFactoryOptions = {}
) => {
    const { transport = createTransport(HttpAuthTransportSymbol), client } = serviceFactoryOptions;
    const create = (options) => new TaskSettingsApiService({ client, transport, options });
    const { mixin } = useApiService(create, { apiBaseURL }, { name });

    return mixin;
};
