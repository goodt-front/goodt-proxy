import { IApiServiceMixin, IApiServiceMixinInstance, IApiServiceMixinOptions } from '@goodt-common/mixins';
import { IApiServiceConstructorOptions, IApiServiceOptions } from '../types';
/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} [serviceOptions={ apiBaseURL: 'orgStructureApiUrl' }]
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions={ name: 'orgStructureApiService' }]
 * @param {import('@goodt-common/mixins').IApiServiceConstructorOptions} [serviceFactoryOptions={}]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export function useOrgStructureApiServiceMixin(
    { apiBaseURL = 'orgStructureApiUrl' }: IApiServiceOptions,
    { name = 'orgStructureApiService' }: IApiServiceMixinOptions,
    serviceFactoryOptions: IApiServiceConstructorOptions
): IApiServiceMixinInstance<{ name: 'orgStructureApiService' }>;
