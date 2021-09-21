/**
 * @typedef {import('graphql').DocumentNode} TOperationDocument
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlServiceOperationOptions} IOperationOptions
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlService} IGraphqlService
 * @typedef {import('@goodt-widgets/common/graphql').TApolloOperation} TOperation
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlServiceOperationMeta} IOperationMeta
 */

/**
 * Creates Vue Mixin with specified service factory or identifier and service-related behaviour
 *
 * @param {function(): IGraphqlService} serviceFactory
 * @param [mixinOptions={}]
 * @return {{mixin: {destroyed(): void, created(): void}}}
 */
export const useGqlServiceConsumer = (serviceFactory, mixinOptions = {}) => {
    const { name: $gqlService = 'gqlService' } = mixinOptions;

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
