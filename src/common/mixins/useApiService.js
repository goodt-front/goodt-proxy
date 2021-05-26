const PUBLIC_ACCESSOR_NAME = '$apiService';
const PRIVATE_ACCESSOR_NAME = Symbol('$apiService');
/**
 * @typedef {import('@goodt/core/mixins').ITransportMixinInstance} ITransportMixinInstance
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 */
export const useApiService = (service, useOptions = {}) => {
    const { name: $apiService = PUBLIC_ACCESSOR_NAME } = useOptions;

    /**
     * @return {IService}
     */
    const createServiceInstance = (vm) => service({ transport: vm.$transport });

    /**
     */
    const VueMixinComponentOptions = {
        computed: {
            /**
             * @this {IServiceMixinInstance}
             */
            [$apiService]() {
                if (!this[PRIVATE_ACCESSOR_NAME]) {
                    this[PRIVATE_ACCESSOR_NAME] = createServiceInstance(this);
                }
                return this[PRIVATE_ACCESSOR_NAME];
            }
        },
        /**
         * @this {IServiceMixinInstance}
         */
        destroyed() {
            if (this[PRIVATE_ACCESSOR_NAME]) {
                this[PRIVATE_ACCESSOR_NAME].dispose();
            }
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};

export default useApiService;
