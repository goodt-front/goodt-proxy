import getByPath from 'lodash/get';

const PUBLIC_ACCESSOR_NAME = '$apiService';
/**
 * @typedef {import('@goodt/core/mixins').ITransportMixinInstance} ITransportMixinInstance
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 */
export const useApiService = (serviceFactory, useOptions = {}) => {
    const { name: $apiService = PUBLIC_ACCESSOR_NAME, apiBaseURL } = useOptions;

    const getApiBaseURLFunction = (vm) =>
        typeof apiBaseURL === 'function'
            ? apiBaseURL.bind(vm)
            : function apiBaseURLFunction() {
                  return getByPath(this, apiBaseURL.split('.'));
              }.bind(vm);

    /**
     * @return {IApiService}
     */
    const createServiceInstance = (vm) => {
        const options = {};
        if (apiBaseURL) {
            options.apiBaseURL = getApiBaseURLFunction(vm).call(vm);
        }
        return serviceFactory({ options });
    };

    /**
     */
    const VueMixinComponentOptions = {
        created() {
            this[$apiService] = createServiceInstance(this);
            if (apiBaseURL) {
                this.$watch(getApiBaseURLFunction(this), (baseURL) => {
                    this[$apiService].apiBaseURL = baseURL;
                });
            }
        },
        /**
         * @this {IApiServiceMixinInstance}
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
