import { IService } from '@goodt/common/services';
import { VueConstructor } from 'vue';

interface IServiceFactory {
    (options: any): IService;
}

interface ServiceMixinComputed<T> {
    $apiService: IService & T;
}

export interface IServiceMixinInstance<T> extends ServiceMixinComputed<T> {}
export interface IServiceMixin<T> extends VueConstructor<Vue & IServiceMixinInstance<T>> {}

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useApiService(
    serviceFactory: IServiceFactory
): {
    mixin: IServiceMixin;
};
