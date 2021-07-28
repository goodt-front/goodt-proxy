import { VueConstructor } from 'vue';
import { DremioResult, Query, SDK } from './sdk';

/**
 * Dremio sdk factory
 *
 * @param {import('goodt-dremio-sdk').SDKConfig} config
 * @return {SDK}  sdk instance
 */
interface Data {
    /**
     * Dremio query 'offset'
     *
     * @property {number}
     */
    offset: number;
    /**
     * @property {DremioResult}
     */
    result: DremioResult;
    /**
     * @property {Query}
     */
    queryHelper: Query;
    /**
     * @property {boolean}
     */
    watchStoreState: boolean,
    /**
     * loadData() method hooks
     *
     * @see loadData()
     * @property {Record<string, any>}
     */
    loadDataHooks: {
        before: () => void;
        then: (r: any) => any;
        catch: (e: any) => void;
        finally: () => void;
    };
    loading: boolean;
    error: any;
}

interface Computed {
    limit: number;
    rowCount: number;
    page: number;
    /**
     * @return {number}
     */
    pages: number;
    /**
     * @return {?string}
     */
    dremioStr: string;
}

interface Methods {
    loadData(): void;
    dremioHandler(): void;
    setDremioVars(): void;
    /**
     * Applies dremio filters
     *
     * @param {Record<string, any>} params   params to be injected
     */
    applyDremioFilters(params: Record<string, any>): boolean;

    /**
     * Creates a new dremio query filter
     *
     * @param {string} name         metric/dimension/field name
     * @param {string|Array} value  value
     * @return {Record<string, any>} filter
     */
    createDremioFilter(name: string, value: string | any[]): Record<string, any>;

    /**
     * Returns dremio query metric/dimension/field names
     *
     * @return {string[]}
     */
    getDremioQueryParamNames(): string[];
}

interface Injected {
    dremioSDK: SDK;
    dremioVars: string[];
}

export interface IDremioMixinInstance extends VueConstructor, Data, Methods, Computed, Injected {}
