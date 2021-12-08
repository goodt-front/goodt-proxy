export type WatchStoreStrategyEnum = {
    ANY: 'any';
    ALL: 'all';
};

export type WatchStoreStrategy = WatchStoreStrategyEnum['ALL'] | WatchStoreStrategyEnum['ANY'];

export type WatchStoreHandler<TVarList> =
    | ((values?: any[], state?: { [key in TVarList]: number | string | boolean | null | undefined }) => void)
    | string;

export type WatchStoreHandlerConditionFunction = (values: any[]) => boolean;

export type WatchStoreHandlerCondition =
    | WatchStoreHandlerConditionFunction
    | WatchStoreHandlerConditionFunction[]
    | string
    | boolean;

export interface IWatchStoreDefinition<TVarList = string[]> {
    vars?: TVarList;
    all?: boolean;
    when?: WatchStoreHandlerCondition;
    handler: WatchStoreHandler;
}

declare global {
    interface WatchStoreDefinition extends IWatchStoreDefinition {}
}

declare module 'vue/types/options' {
    import Vue from 'vue';
    interface ComponentOptions<V extends Vue> {
        watchStore?: IWatchStoreDefinition[];
    }
}
