import { useApiService } from '@goodt-common/mixins';
import { createTransport, HttpAuthTransportSymbol } from '@goodt-wcore/net';
import { create as createLearningCourseApiService } from './LearningCourseApiService';

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions]
 * @param {import('@goodt-common/services').IApiServiceConstructorOptions} [serviceFactoryOptions={}]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useLearningApiServiceMixin = (
    { apiBaseURL = 'learningApiUrl', methods = {} } = {},
    { name = 'learningApiService' } = {},
    serviceFactoryOptions = {}
) => {
    const { transport = createTransport(HttpAuthTransportSymbol), client } = serviceFactoryOptions;
    const create = (options) => createLearningCourseApiService({ transport, client, options }, methods);
    const { mixin } = useApiService(create, { apiBaseURL }, { name });

    return mixin;
};
