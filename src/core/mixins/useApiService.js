const PUBLIC_ACCESSOR_NAME = '$apiService';
const PRIVATE_ACCESSOR_NAME = Symbol('$apiService');
/**
 * @typedef {import('@goodt/core/mixins').ITransportMixinInstance} ITransportMixinInstance
 */

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 */
export const useApiService = (serviceFactory, useOptions = {}) => {
    const { name: $apiService = PUBLIC_ACCESSOR_NAME } = useOptions;

    /**
     * @return {IService}
     */
    const createServiceInstance = (vm) => serviceFactory({ transport: vm.$transport });

    /**
     */
    const VueMixinComponentOptions = {
        computed: {
            /**
             * @this {ITransportMixinInstance}
             */
            [$apiService]() {
                if (!this[PRIVATE_ACCESSOR_NAME]) {
                    this[PRIVATE_ACCESSOR_NAME] = createServiceInstance(this);
                }
                return this[PRIVATE_ACCESSOR_NAME];
            }
        },
        /**
         * @this {ITransportMixinInstance}
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
