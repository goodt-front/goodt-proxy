import { IApiService, IApiServiceOptions } from '@goodt-common/api';
import { VueConstructor } from 'vue';

interface IApiServiceFactory {
    (options: any): IApiService;
}

type ServiceMixinComputed<T extends IApiService> = {
    apiService: T;
};

export interface IApiServiceMixinOptions {
    name?: string;
}

export type IApiServiceMixinInstance<T extends IApiService = IApiService> = ServiceMixinComputed<T>;
export interface IApiServiceMixin extends VueConstructor<Vue & IApiServiceMixinInstance> {}

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useApiService(
    serviceFactory: IApiServiceFactory,
    serviceOptions: IApiServiceOptions,
    mixinOptions: IApiServiceMixinOptions
): {
    mixin: IApiServiceMixinInstance;
};
