import { InfrastructureError } from '@goodt-common/errors';
import { inject } from '@goodt-common/services';
import { gql } from '@goodt-common/graphql';

/**
 * @typedef {import('graphql').DocumentNode} TOperationDocument
 * @typedef {import('@goodt-widgets/common/graphql').IGraphqlService} IGraphqlService
 */

/**
 * Provides for end api service consumer to extends from
 */
export class GraphqlServiceConsumer {
    /**
     * @type {IGraphqlService}
     * @protected
     */
    _service;

    /**
     * @type {Map<TOperationDocument, function>}
     * @private
     */
    _disposers = new Map();

    /**
     * @param {IGraphqlService | Symbol} service
     */
    constructor(service) {
        this._initService(service);
    }

    /**
     *
     * @param {IGraphqlService | Symbol} service
     * @private
     */
    _initService(service) {
        if (typeof service === 'symbol') {
            this._service = inject(service);
            return;
        }

        throw new InfrastructureError(`Graphql service not defined`);
    }

    /**
     *
     */
    dispose() {
        this._disposers.forEach((dispose) => dispose());
    }

    /**
     * @param {TOperationDocument|string} document
     * @param {Record<string, any>} variables
     * @param {Record<string, any>} [options]
     * @return {OperationState}
     */
    query(document, variables, options) {
        if (typeof document === 'string') {
            // eslint-disable-next-line no-param-reassign
            document = gql(document);
        }
        const { result, unsubscribe } = this._service.query(document, variables, options);
        if (this._disposers.has(document)) {
            const dispose = this._disposers.get(document);
            // dispose();
        }
        this._disposers.set(document, unsubscribe);

        return result;
    }

    /**
     * @param {TOperationDocument|string} document
     * @param {Record<string, any>} variables
     * @param {Record<string, any>} [options]
     * @return {OperationState}
     */
    mutate(document, variables, options) {
        const { result } = this._service.mutate(document, variables, options);
        return result;
    }

    /**
     * @param {IArguments} args
     * @return {OperationState}
     */
    queryOnce(...args) {
        const { result } = this._service.queryOnce(...args);
        return result;
    }
}
