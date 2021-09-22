/**
 * @typedef {import('graphql').DocumentNode} TOperationDocument
 * @typedef {import('@goodt-common/graphql').IGraphqlServiceOperationOptions} IOperationOptions
 * @typedef {import('@goodt-common/graphql').IGraphqlService} IGraphqlService
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 *
 * @param {function(): IGraphqlService} serviceFactory
 * @param [mixinOptions={}]
 * @return {{mixin: {destroyed(): void, created(): void}}}
 */
export const useGqlServiceConsumerMixin = (serviceFactory, mixinOptions = {}) => {
    const { name: $gqlService = 'gqlApi' } = mixinOptions;

    /**
     */
    const VueMixinComponentOptions = {
        created() {
            this[$gqlService] = serviceFactory();
        },
        destroyed() {
            this[$gqlService].dispose();
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};
