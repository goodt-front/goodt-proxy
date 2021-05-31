const PUBLIC_ACCESSOR_NAME = '$apiService';
/**
 * @typedef {import('@goodt/core/mixins').ITransportMixinInstance} ITransportMixinInstance
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 */
export const useApiService = (serviceFactory, useOptions = {}) => {
    const { name: $apiService = PUBLIC_ACCESSOR_NAME, apiBaseURL } = useOptions;

    /**
     * @return {IService}
     */
    const createServiceInstance = (vm) => {
        return serviceFactory({
            options: { apiBaseURL: apiBaseURL.call(vm) }
        });
    };

    /**
     */
    const VueMixinComponentOptions = {
        created() {
            this[$apiService] = createServiceInstance(this);
            this.$watch(apiBaseURL.bind(this), (baseURL) => {
                this[$apiService].apiBaseURL = baseURL;
            });
        },
        /**
         * @this {IServiceMixinInstance}
         */
        destroyed() {
            this[$apiService].dispose();
        },
        methods: {
            [`${$apiService}SetOptions`](options) {
                this[$apiService].setOptions(options);
            }
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};

export default useApiService;
