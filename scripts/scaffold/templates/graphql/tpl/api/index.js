import { useGqlServiceConsumerMixin } from '@goodt-common/graphql';

[[#services]]
import { create as create[[prefixCapital]]Consumer } from './[[prefixCapital]]Consumer';
[[/services]]

/**
 *
 * @return {{destroyed(): void, created(): void}[]}
 */
export const useConsumersMixins = () => {
    const mixins = [
[[#services]]
        useGqlServiceConsumerMixin(create[[prefixCapital]]Consumer, { name: '[[prefixCamel]]Gql' }).mixin
[[/services]]
    ];

    return mixins;
};

/**
 [[#services]]
 * @type {{ [[prefixCamel]]Gql: import('./[[prefixCapital]]Consumer').[[prefixCapital]]Consumer }}
 [[/services]]
 */
export const ConsumersMixinsTypes = undefined;
