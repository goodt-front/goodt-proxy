/**
 * Apollo client create and initialize.
 */
import { ApolloClient } from '@apollo/client';

import { createCache } from './cache';
import { createLinks } from './links';

/**
 * Simply builds new Apollo Client instance with defined options
 *
 * @param {string|function(context: object): string} uri
 * @param {function({ context: Record<string, any> }): { headers: Record<string, string> }} getOptions
 * @param {boolean|Record<string, string>|function(): Record<string, string>} auth   auth options or auth options thunk
 * @param {boolean|Record} auth
 * @param {boolean|Record} cache    cache options or cache options thunk
 *
 * @return {ApolloClient}
 */
export const createClient = ({ uri, auth, cache }) =>
    new ApolloClient({
        link: createLinks({ uri, auth }),
        cache: createCache({ cache }),
        // eslint-disable-next-line unicorn/prevent-abbreviations
        connectToDevTools: true
    });
