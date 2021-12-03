export enum WatchStoreStratEnum {
    ANY = 'any',
    ALL = 'all'
}
export type WatchStoreStrat = WatchStoreStratEnum.ANY | WatchStoreStratEnum.ALL;

export interface IWatchStoreDefinition<TVarList = string[]> {
    vars?: TVarList;
    all?: boolean;
    when?: string | boolean | ((values: any[]) => boolean) | ((values: any[]) => boolean)[];
    handler:
        | ((
              values?: any[],
              state?: { [key in ValuesOf<typeof TVarList>]: number | string | boolean | null | undefined }
          ) => void)
        | string;
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
