import getByPath from 'lodash/get';

const PUBLIC_ACCESSOR_NAME = '$apiService';
const API_URL_ACCESSOR_NAME = 'apiBaseURL';
/**
 * @typedef {import('@goodt-wcore/mixins').ITransportMixinInstance} ITransportMixinInstance
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 */
export const useApiService = (serviceFactory, serviceOptions, mixinOptions = {}) => {
    const { name: $apiService = PUBLIC_ACCESSOR_NAME } = mixinOptions;
    const { apiBaseURL = API_URL_ACCESSOR_NAME } = serviceOptions;

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
        const options = {
            ...serviceOptions,
            apiBaseURL: getApiBaseURLFunction(vm).call(vm)
        };

        return serviceFactory({ options });
    };

    /**
     */
    const VueMixinComponentOptions = {
        created() {
            this[$apiService] = createServiceInstance(this);
            if (this.isEditorMode) {
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
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};

export default useApiService;
