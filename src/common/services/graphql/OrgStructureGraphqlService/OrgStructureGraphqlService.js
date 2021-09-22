/**
 * @module OrgStructureGraphQlService
 */
import { GraphqlBaseService, getAuthToken } from '@goodt-wcore/common/graphql';
import { cache } from './cache';

export class OrgStructureGraphqlService extends GraphqlBaseService {}

/**
 *
 * @param {import('@goodt-common/graphql').IGraphqlServiceOptions} options
 * @return {OrgStructureGraphqlService}
 */
export const create = (options = {}) => {
    const auth =
        options.auth === true
            ? {
                  getToken: getAuthToken
              }
            : options.auth;

    return new OrgStructureGraphqlService({
        uri: () => 'https://goodt-dev.goodt.me:8480/graphql',
        ...options,
        auth,
        cache: {
            ...cache,
            ...options.cache
        }
    });
};
