/**
 * Base apollo client httpLink to make api http requests.
 */
import { ApolloLink, createHttpLink as createApolloHttpLink, from as fromArray } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { buildApolloClientHeaders } from './utils';

/**
 *
 * @param {string|function(context: object): string} uri
 * @return {ApolloLink}
 */
const createHttpLink = ({ uri }) => createApolloHttpLink({ uri });

/**
 *
 * @param {Record<string, string>} auth
 * @return {ApolloLink}
 */
const createAuthLink = ({ auth }) =>
    setContext(async (context, { headers }) => {
        let finalHeaders = { ...headers };
        const { headers: authHeaders, getToken } = auth;

        if (authHeaders) {
            finalHeaders = {
                ...finalHeaders,
                ...authHeaders
            };
        }

        try {
            if (getToken) {
                const token = await getToken({ context });
                finalHeaders = {
                    ...finalHeaders,
                    ...buildApolloClientHeaders({ token })
                };
            }
            // eslint-disable-next-line no-empty
        } catch {}

        return {
            headers: finalHeaders
        };
    });

/**
 *
 * @param {string|function(context: object): string} uri
 * @param {boolean|Record<string, string>|function(): Record<string, string>} auth
 *
 * @return {ApolloLink}
 */
export const createLinks = ({ uri, auth }) => {
    const links = [createHttpLink({ uri })];

    if (auth != null && auth !== false) {
        const authLink = createAuthLink({ auth });
        links.unshift(authLink);
    }

    return fromArray(links);
};
