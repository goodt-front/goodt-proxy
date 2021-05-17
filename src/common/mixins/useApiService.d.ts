import { IService } from '@goodt/common/services';
import { VueConstructor } from 'vue';

interface IServiceFactory {
    (options: any): IService;
}

interface ServiceMixinComputed {
    $apiService: IService;
}

export interface IServiceMixinInstance extends ServiceMixinComputed {}
export interface IServiceMixin extends VueConstructor<Vue & IServiceMixinInstance> {}

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useApiService(
    serviceFactory: IServiceFactory
): {
    mixin: IServiceMixin;
};
