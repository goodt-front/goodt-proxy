import { useGqlServiceConsumerMixin } from '@goodt-common/graphql';
import { create as createOrgStructureGqlConsumer } from './OrgStructureConsumer';

/**
 *
 * @param [mixinOptions]
 * @return {{destroyed(): void, created(): void}}
 */
export const useOrgStructureConsumerMixin = ({ name = 'orgStructureGql' } = {}) => {
    const { mixin } = useGqlServiceConsumerMixin(createOrgStructureGqlConsumer, { name });

    return mixin;
};

/**
 * @type {{ orgStructureGql: import('./OrgStructureConsumer').OrgStructureConsumer }}
 */
export const OrgStructureConsumerMixinTypes = undefined;
