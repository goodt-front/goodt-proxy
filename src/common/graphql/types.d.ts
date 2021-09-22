import { DocumentNode, TypePolicies } from '@apollo/client';
import { InvalidationPolicies } from 'apollo-invalidation-policies';
import { OptionsParameter as VueApolloQueryOptionsParameter } from '@vue/apollo-composable/dist/useQuery';

export interface IGraphqlService {
    query(
        document: DocumentNode,
        variables: Record<string, any>,
        options: IGraphqlServiceOperationOptions
    ): { result: OperationState; unsubscribe: () => void };
    queryOnce(document: DocumentNode, options: IGraphqlServiceOperationOptions): { result: OperationState };
    mutate(
        document: DocumentNode,
        variables: Record<string, any>,
        options: IGraphqlServiceOperationOptions
    ): { result: OperationState };
    setOptions(options: IGraphqlServiceOptions);
}

export interface IGraphqlLServiceAuthOptions extends Record<string, unknown> {
    getToken(): Promise<string>;
}

export interface IGraphqlServiceCacheOptions extends Record<string, unknown> {
    typePolicies: TypePolicies;
    invalidationPolicies: InvalidationPolicies;
}

export interface IGraphqlServiceOptions extends Record<string, unknown> {
    uri?: string;
    clientId?: string;
    cache?: IGraphqlServiceCacheOptions;
    auth?: boolean | IGraphqlServiceAuthOptions;
}

export interface IGraphqlServiceOperationOptions extends VueApolloQueryOptionsParameter {}
