import { createClient } from './apollo';
import { OperationState } from './OperationState';

/**
 * @typedef {import('graphql').DocumentNode} TOperationDocument
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlServiceOperationOptions} IOperationOptions
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlService} IGraphqlService
 * @typedef {import('@goodt-widgets/common/graphql').TApolloOperation} TOperation
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlServiceOperationMeta} IOperationMeta
 */

/**
 *
 */
export class GraphqlBaseService {
    /**
     * @type {import("@apollo/client").ApolloClient}
     * @private
     */
    _client;

    /**
     * @param {import('./types').IGraphqlServiceOptions} options
     */
    constructor(options) {
        this._createClient(options);
    }

    /**
     * @param {import('./types').IGraphqlServiceOptions} options
     */
    setOptions(options) {
        this._createClient(options);
    }

    /**
     /**
     * @param {import('./types').IGraphqlServiceOptions} options
     * @protected
     */
    _createClient(options) {
        this._client = createClient(options);
    }

    /**
     * @param {TOperationDocument} query
     * @param {Record<string, any>|null|undefined} variables
     * @param {import("@apollo/client/core").QueryOptions} options
     * @return {{ result: OperationState }}
     */
    queryOnce(query, variables, options) {
        const queryState = new OperationState();
        this._client
            .query({
                query,
                variables
            })
            .then((result) => queryState.setResult(result))
            .catch((error) => queryState.setError(error));

        return { result: queryState };
    }

    /**
     * @param {TOperationDocument} query
     * @param {Record<string, any>|null|undefined} variables
     * @param {import("@apollo/client/core").QueryOptions} options
     * @return {{ result: OperationState, unsubscribe: function }}
     */
    query(query, variables, options) {
        const observer = this._client.watchQuery({
            query,
            variables,
            ...options
        });

        const queryState = new OperationState({ isLoading: true });
        const { unsubscribe } = observer.subscribe(
            ({ data }) => queryState.setResult(data),
            (error) => queryState.setError(error)
        );

        return { result: queryState, observer, unsubscribe };
    }

    /**
     * @param {TOperationDocument} mutation
     * @param {Record<string, any>|null|undefined} variables
     * @param {import("@apollo/client/core").QueryOptions} options
     * @return {{ result: OperationState }}
     */
    mutate(mutation, variables, options) {
        const mutationState = new OperationState();
        this._client
            .mutate({
                mutation,
                variables,
                ...options
            })
            .then(({ data }) => mutationState.setResult(data))
            .catch((error) => mutationState.setError(error));

        return { result: mutationState };
    }
}
