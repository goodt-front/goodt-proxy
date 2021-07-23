import { IApiService } from '@goodt-common/api';
import { VueConstructor } from 'vue';

interface IApiServiceFactory {
    (options: any): IApiService;
}

interface ServiceMixinComputed<T> {
    $apiService: IApiService & T;
}

export interface IApiServiceMixinOptions {
    name?: string;
    apiBaseURL?: string | (() => string);
}

export interface IApiServiceMixinInstance<T> extends ServiceMixinComputed<T> {}
export interface IApiServiceMixin extends VueConstructor<Vue & IApiServiceMixinInstance> {}

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useApiService(
    serviceFactory: IApiServiceFactory,
    options: IApiServiceMixinOptions
): {
    mixin: IApiServiceMixin;
};
