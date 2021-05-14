/**
 * SDKConfig
 */
export type SDKConfig = {
    /**
     * ://localhost]  host сервера
     */
    host?: string;
    /**
     * нужно ли заменять константы в значениях фильтров
     */
    replaceFilterValues?: boolean;
    /**
     * auth token
     */
    authToken?: string;
    /**
     * admin mode
     */
    admin?: boolean;
};
/**
 * IQuerySchema
 */
export type IQuerySchema = {
    $from: any[];
    $fields: any;
    $metrics: any[];
    $dimensions: any[];
    $filters: any[];
    $sort: any[];
};
/**
 * DremioResult
 */
export type DremioResult = {
    /**
     * кол-во записей
     */
    rowCount: number;
    /**
     * схема данных
     */
    schema: any[];
    /**
     * данные
     */
    rows: any[];
};
/**
 * DremioRootEntity
 */
export type DremioRootEntity = {
    id: string;
    path: any[];
    type: string;
    containerType: string;
};
/**
 * DremioContainerInfo
 */
export type DremioContainerInfo = {
    id: string;
    path: any[];
    name: string;
    entityType: string;
    children: DremioContainerChildInfo[];
};
/**
 * DremioContainerChildInfo
 */
export type DremioContainerChildInfo = {
    id: string;
    path: any[];
    type: string;
    datasetType: string;
    containerType: string;
};
/**
 * DremioEntityInfo
 */
export type DremioEntityInfo = {
    id: string;
    path: any[];
    type: string;
    entityType: string;
    fields: any[];
};
export type DremioPermissions = {
    employeeId: string;
    permissions: Array<any>;
};
export type DremioPermissionInfo = {
    name: string;
};
export type PromiseCancelable = Promise<any>;
export type QueryOptions = {
    /**
     * query
     */
    query: IQuerySchema;
    /**
     * dimensionList
     */
    dimensionList: any;
};
export type MetricOptions = any;
export type DimensionOptions = any;
export type FilterOptions = any;
export type SortOptions = any;
/**
 * SDKConfig
 * @typedef {Object} SDKConfig
 * @property {String} [host=http://localhost]  host сервера
 * @property {Boolean} [replaceFilterValues=true]   нужно ли заменять константы в значениях фильтров
 * @property {String} [authToken=null]      auth token
 * @property {Boolean} [admin=false]        admin mode
 */
/**
 * IQuerySchema
 * @typedef {Object} IQuerySchema
 * @property {Array} $from
 * @property {Object} $fields
 * @property {Array} $metrics
 * @property {Array} $dimensions
 * @property {Array} $filters
 * @property {Array} $sort
 */
/**
 * DremioResult
 * @typedef {Object} DremioResult
 * @property {Number} rowCount    кол-во записей
 * @property {Array} schema       схема данных
 * @property {Array} rows         данные
 */
/**
 * DremioRootEntity
 * @typedef {Object} DremioRootEntity
 * @property {String} id
 * @property {Array} path
 * @property {String} type
 * @property {String} containerType
 */
/**
 * DremioContainerInfo
 * @typedef {Object} DremioContainerInfo
 * @property {String} id
 * @property {Array} path
 * @property {String} name
 * @property {String} entityType
 * @property {DremioContainerChildInfo[]} children
 */
/**
 * DremioContainerChildInfo
 * @typedef {Object} DremioContainerChildInfo
 * @property {String} id
 * @property {Array} path
 * @property {String} type
 * @property {String} datasetType
 * @property {String} containerType
 */
/**
 * DremioEntityInfo
 * @typedef {Object} DremioEntityInfo
 * @property {String} id
 * @property {Array} path
 * @property {String} type
 * @property {String} entityType
 * @property {Array} fields
 */
/**
 * @typedef {Object} DremioPermissions
 * @property {String} employeeId
 * @property {Array<Object>} permissions
 */
/**
 * @typedef {Object} DremioPermissionInfo
 * @property {String} name
 */
/**
 * @typedef {Promise} PromiseCancelable
 * @property {Function} cancel
 */
/**
 * @class
 */
export class SDK {
    /**
     * Constructor
     * @param {SDKConfig} [config=null]   config
     */
    constructor(config?: SDKConfig);
    /**
     * @property {Function}
     */
    beforeRequest: any;
    /**
     * @property {SDKConfig}
     */
    config: {
        host: string;
        replaceFilterValues: boolean;
        authToken: any;
        admin: boolean;
    } & SDKConfig;
    axios: import("axios").AxiosInstance;
    _axiosResolveHandler: ({ data }: {
        data: any;
    }) => any;
    _axiosRejectHandler: (e: any) => never;
    _requests: any[];
    /**
     * Возвращает список прав текущего пользователя (если задан authToken {@link SDK#config} и он валиден)
     * @return {PromiseCancelable.<DremioPermissions, Error>}
     */
    getPermissions(): any;
    /**
     * Возвращает информацию о правах
     * @return {PromiseCancelable.<DremioPermissionInfo[], Error>}
     */
    getPermissionsInfo(): any;
    /**
     * Возрвщает root сущности dremio
     * @return {PromiseCancelable.<DremioRootEntity[], Error>}
     */
    getRootEntities(): any;
    /**
     * Возвращает сущность dremio.CatalogEntity по path
     * @param {Array} [path=null]    путь
     * @return {PromiseCancelable.<DremioContainerInfo | DremioEntityInfo, Error>}
     */
    getEntityByPath(path?: any[]): any;
    /**
     * Выполняет запрос
     * @param {IQuerySchema} query      query
     * @param {Number} [offset=0]       offset
     * @param {Number} [limit=10]       limit
     * @param {Boolean} [debug=false]   debug
     * @return {PromiseCancelable.<DremioResult, Error>}
     */
    getData(query: IQuerySchema, offset?: number, limit?: number, debug?: boolean): any;
    /**
     * Отменяет все активные запросы
     */
    cancelActiveRequests(): void;
    /**
     * @private
     * @param {Object} config
     * @return {Object}
     */
    private _getRequestConfig;
    /**
     * @private
     * @return {Object}
     */
    private _getRequestHeaders;
    /**
     * @private
     * @param {Function} func
     * @return {Promise}
     */
    private _hook;
    /**
     * @private
     * @param {Promise} promise
     * @param {CancelTokenSource} source
     * @return {PromiseCancelable}
     */
    private _cancelable;
    /**
     * @private
     * @return {CancelTokenSource}
     */
    private _cancelSource;
    /**
     * @private
     * @param {PromiseCancelable} promise
     */
    private _addRequest;
    /**
     * @private
     * @param {PromiseCancelable} promise
     */
    private _removeRequest;
}
/**
 * @class
 */
export class Query {
    /**
     * Клонирует json-like obj
     * @param {Object} obj
     * @return {Object}
     */
    static clone(obj: any): any;
    /**
     * Создает/валидирует query
     * @param {IQuerySchema} [query=null]    query для валидации
     */
    static createQuery(query?: IQuerySchema): IQuerySchema;
    /**
     * @typedef {Object} MetricOptions
     * @param {String} name?        название metric
     * @param {String} type?        тип metric {@link Query#METRIC_TYPE}
     * @param {String} field?       название field
     */
    /**
     * Создает/мутирует metric
     * @param {MetricOptions} options   опции
     * @param {Object} [metric=null]           metric для мутации
     */
    static createMetric({ name, type, field }: MetricOptions, metric?: any): any;
    /**
     * @typedef {Object} DimensionOptions
     * @param {String} name?        название metric
     * @param {String} field?       название field
     */
    /**
     * Создает/мутирует dimension
     * @param {DimensionOptions} options    опции
     * @param {Object} [dimension=null]            dimension для мутации
     */
    static createDimension({ name, field }: DimensionOptions, dimension?: any): any;
    /**
     * @typedef {Object} FilterOptions
     * @param {String} name?        название metric/dimension/field
     * @param {String} type?        тип filter {@link Query#FILTER_TYPE}
     * @param {Array} value?       массив значений
     */
    /**
     * Создает/мутирует filter
     * @param {FilterOptions} options    опции
     * @param {Object} [filter=null]            filter для мутации
     */
    static createFilter({ name, type, value }: FilterOptions, filter?: any): any;
    /**
     * @typedef {Object} SortOptions
     * @param {String} name?       название metric/dimension
     * @param {String} type?       тип sort {@link Query#SORT_TYPE}
     */
    /**
     * Создает/мутирует sort
     * @param {SortOptions} options     опции
     * @param {Object} [sort=null]             sort для мутации
     */
    static createSort({ name, type }: SortOptions, sort?: any): any;
    /**
     * Возвращает имя metric
     * @param {Object} metric
     * @return {String}
     */
    static getMetricName(metric: any): string;
    /**
     * Возвращает тип metric
     * @param {Object} metric
     * @return {String}
     */
    static getMetricType(metric: any): string;
    /**
     * Возвращает field metric
     * @param {Object} metric
     * @return {String}
     */
    static getMetricField(metric: any): string;
    /**
     * Возвращает имя dimension
     * @param {Object} dimension
     * @return {String}
     */
    static getDimensionName(dimension: any): string;
    /**
     * Возвращает field dimension
     * @param {Object} dimension
     * @return {String}
     */
    static getDimensionField(dimension: any): string;
    /**
     * Возвращает имя filter
     * @param {Object} filter
     * @return {String}
     */
    static getFilterName(filter: any): string;
    /**
     * Возвращает тип filter
     * @param {Object} filter
     * @return {String}
     */
    static getFilterType(filter: any): string;
    /**
     * Возвращает value filter
     * @param {Object} filter
     * @return {String}
     */
    static getFilterValue(filter: any): string;
    /**
     * Возвращает имя sort
     * @param {Object} sort
     * @return {String}
     */
    static getSortName(sort: any): string;
    /**
     * Возвращает тип sort
     * @param {Object} sort
     * @return {String}
     */
    static getSortType(sort: any): string;
    /**
     * Добавляет/заменяет filter в query
     * @param {IQuerySchema} query      query
     * @param {Object} filter           filter
     * @return {IQuerySchema}
     */
    static queryInsertUpdateFilter(query: IQuerySchema, filter: any): IQuerySchema;
    /**
     * Удаляет filter из query
     * @param {IQuerySchema} query      query
     * @param {String} name             название metric/dimension
     * @return {IQuerySchema}
     */
    static queryRemoveFilter(query: IQuerySchema, name: string): IQuerySchema;
    /**
     * Удаляет все filter из query
     * @param {IQuerySchema} query    query
     * @return {IQuerySchema}
     */
    static queryRemoveAllFilters(query: IQuerySchema): IQuerySchema;
    /**
     * Заменяет Query.FILTER_VALUE value всех фильтров
     * @param {IQuerySchema} query
     * @return {IQuerySchema}
     */
    static queryReplaceAllFilterValues(query: IQuerySchema): IQuerySchema;
    /**
     * Возвращает field name dimension
     * @param {IQuerySchema} query      query
     * @param {String} name             dimension name
     * @return {String}                 field name или null если dimension нет
     */
    static queryGetDimensionField(query: IQuerySchema, name: string): string;
    /**
     * Добавляет/заменяет dimension в query
     * @param {IQuerySchema} query      query
     * @param {Object} dimension        dimension
     * @return {IQuerySchema}
     */
    static queryInsertUpdateDimension(query: IQuerySchema, dimension: any): IQuerySchema;
    /**
     * Возвращает массив имен field
     * @param {IQuerySchema} query      query
     * @return {Array}                  массив имен field
     */
    static queryFieldNames(query: IQuerySchema): any[];
    /**
     * Возвращает массив имен metric в query
     * @param {IQuerySchema} query      query
     * @return {Array}                  массив имен metric
     */
    static queryMetricNames(query: IQuerySchema): any[];
    /**
     * Возвращает массив имен dimension в query
     * @param {IQuerySchema} query      query
     * @return {Array}                  массив имен dimension
     */
    static queryDimensionNames(query: IQuerySchema): any[];
    /**
     * Валидирует query
     * @param {IQuerySchema} query
     * @return {Boolean}
     */
    static validateQuery(query: IQuerySchema): boolean;
    /**
     * Валидирует from
     * @param {IQuerySchema} query
     * @return {Boolean}
     */
    static validateFrom(query: IQuerySchema): boolean;
    /**
     * Валидирует metric
     * @param {Object} metric
     * @return {Boolean}
     */
    static validateMetric(metric: any): boolean;
    /**
     * Валидирует dimension
     * @param {Object} dimension
     * @return {Boolean}
     */
    static validateDimension(dimension: any): boolean;
    /**
     * Валидирует filter
     * @param {Object} filter
     * @return {Boolean}
     */
    static validateFilter(filter: any): boolean;
    /**
     * Валидирует sort
     * @param {Object} sort
     * @return {Boolean}
     */
    static validateSort(sort: any): boolean;
    /**
     * @private Валидирует metric/dimension/filter/sort like obj
     * @param {Object} obj
     * @return {Boolean}
     */
    private static _validateObj;
    /**
     * @typedef {Object} QueryOptions
     * @property {IQuerySchema} query       query
     * @property {Object} dimensionList     dimensionList
     */
    /**
     * Constructor
     * @param {QueryOptions} options
     */
    constructor({ query, dimensionList }: QueryOptions);
    query: IQuerySchema;
    dimensionList: any;
    states: any[];
    /**
     * Активирует dimension из списка dimensionList
     * @param {Array} names     массив названий dimension
     */
    enableDimensions(names: any[]): void;
    /**
     * Формирует query с текущим state всех активных dimension
     * @return {IQuerySchema}     query
     */
    buildQuery(): IQuerySchema;
    /**
     * Проверяет, сущ. ли state для dimensionName
     * @param {String} dimensionName    название dimension
     * @return {Boolean}
     */
    dimensionStateExists(dimensionName: string): boolean;
    /**
     * Возвращает true, если dimension state первый
     * @param {String} dimensionName    название dimension
     * @return {Boolean}
     */
    dimensionStateIsFirst(dimensionName: string): boolean;
    /**
     * Возвращает true, если dimension state последний
     * @param {String} dimensionName    название dimension
     * @return {Boolean}
     */
    dimensionStateIsLast(dimensionName: string): boolean;
    /**
     * Сдвигает тек. dimension state на шаг вперед
     * @param {String} dimensionName    название dimension
     * @param {Array} filterValue      значения filter
     * @param {String} filterType       тип filter {@link Query#FILTER_TYPE}
     * @return {Boolean}                true если удалось; false нет
     */
    dimensionStateGoNext(dimensionName: string, filterValue: any[], filterType: string): boolean;
    /**
     * Сдвигает тек. dimension state на шаг назад
     * @param {String} dimensionName    название dimension
     * @return {Boolean}                true если удалось; false нет
     */
    dimensionStateGoPrev(dimensionName: string): boolean;
}
export namespace Query {
    namespace FORMAT {
        const DATE: string;
        const TIME: string;
        const TIMESTAMP: string;
    }
    namespace KEY {
        const FIELDS: string;
        const FROM: string;
        const METRICS: string;
        const DIMENSIONS: string;
        const FILTERS: string;
        const SORT: string;
    }
    type KEY = string;
    namespace SORT_TYPE {
        const ASC: string;
        const DESC: string;
    }
    type SORT_TYPE = string;
    namespace METRIC_TYPE {
        const VALUE: string;
        const EXPRESSION: string;
        const AVG: string;
        const COUNT: string;
        const MAX: string;
        const MIN: string;
        const SUM: string;
        const GROUP_CONCAT: string;
        const GROUP_CONCAT_UNIQ: string;
    }
    type METRIC_TYPE = string;
    namespace FILTER_TYPE {
        export const EQ: string;
        export const EQ_NOT: string;
        export const LESS: string;
        export const LESS_EQ: string;
        export const GREATER: string;
        export const GREATER_EQ: string;
        export const IN: string;
        export const IN_NOT: string;
        export const BETWEEN: string;
        export const BETWEEN_NOT: string;
        export const LIKE: string;
        const MAX_1: string;
        export { MAX_1 as MAX };
        const MIN_1: string;
        export { MIN_1 as MIN };
    }
    type FILTER_TYPE = string;
    namespace FILTER_VALUE {
        const YEAR_ROLLING: string;
        const YEAR_START: string;
        const YEAR_END: string;
        const YEAR_PREV_START: string;
        const YEAR_PREV_END: string;
        const QUARTER_START: string;
        const QUARTER_END: string;
        const QUARTER_PY_START: string;
        const QUARTER_PY_END: string;
        const QUARTER_PREV_START: string;
        const QUARTER_PREV_END: string;
        const MONTH_ROLLING: string;
        const MONTH_START: string;
        const MONTH_END: string;
        const MONTH_PY_START: string;
        const MONTH_PY_END: string;
        const MONTH_PREV_START: string;
        const MONTH_PREV_END: string;
        const WEEK_ROLLING: string;
        const WEEK_START: string;
        const WEEK_END: string;
        const WEEK_PY_START: string;
        const WEEK_PY_END: string;
        const WEEK_PREV_START: string;
        const WEEK_PREV_END: string;
        const TODAY: string;
        const YESTERDAY: string;
    }
    type FILTER_VALUE = string;
    namespace FILTER_VALUE_HANDLER {
        export function YEAR_ROLLING_1(): any;
        export { YEAR_ROLLING_1 as YEAR_ROLLING };
        export function YEAR_START_1(): any;
        export { YEAR_START_1 as YEAR_START };
        export function YEAR_END_1(): any;
        export { YEAR_END_1 as YEAR_END };
        export function YEAR_PREV_START_1(): any;
        export { YEAR_PREV_START_1 as YEAR_PREV_START };
        export function YEAR_PREV_END_1(): any;
        export { YEAR_PREV_END_1 as YEAR_PREV_END };
        export function QUARTER_START_1(): any;
        export { QUARTER_START_1 as QUARTER_START };
        export function QUARTER_END_1(): any;
        export { QUARTER_END_1 as QUARTER_END };
        export function QUARTER_PY_START_1(): any;
        export { QUARTER_PY_START_1 as QUARTER_PY_START };
        export function QUARTER_PY_END_1(): any;
        export { QUARTER_PY_END_1 as QUARTER_PY_END };
        export function QUARTER_PREV_START_1(): any;
        export { QUARTER_PREV_START_1 as QUARTER_PREV_START };
        export function QUARTER_PREV_END_1(): any;
        export { QUARTER_PREV_END_1 as QUARTER_PREV_END };
        export function MONTH_ROLLING_1(): any;
        export { MONTH_ROLLING_1 as MONTH_ROLLING };
        export function MONTH_START_1(): any;
        export { MONTH_START_1 as MONTH_START };
        export function MONTH_END_1(): any;
        export { MONTH_END_1 as MONTH_END };
        export function MONTH_PY_START_1(): any;
        export { MONTH_PY_START_1 as MONTH_PY_START };
        export function MONTH_PY_END_1(): any;
        export { MONTH_PY_END_1 as MONTH_PY_END };
        export function MONTH_PREV_START_1(): any;
        export { MONTH_PREV_START_1 as MONTH_PREV_START };
        export function MONTH_PREV_END_1(): any;
        export { MONTH_PREV_END_1 as MONTH_PREV_END };
        export function WEEK_ROLLING_1(): any;
        export { WEEK_ROLLING_1 as WEEK_ROLLING };
        export function WEEK_START_1(): any;
        export { WEEK_START_1 as WEEK_START };
        export function WEEK_END_1(): any;
        export { WEEK_END_1 as WEEK_END };
        export function WEEK_PY_START_1(): any;
        export { WEEK_PY_START_1 as WEEK_PY_START };
        export function WEEK_PY_END_1(): any;
        export { WEEK_PY_END_1 as WEEK_PY_END };
        export function WEEK_PREV_START_1(): any;
        export { WEEK_PREV_START_1 as WEEK_PREV_START };
        export function WEEK_PREV_END_1(): any;
        export { WEEK_PREV_END_1 as WEEK_PREV_END };
        export function TODAY_1(): any;
        export { TODAY_1 as TODAY };
        export function YESTERDAY_1(): any;
        export { YESTERDAY_1 as YESTERDAY };
    }
    type FILTER_VALUE_HANDLER = string;
    const FILTER_TYPE_VALUE_VALIDATION: {
        [x: string]: (v: any) => boolean;
    };
}
export namespace Dremio {
    namespace DATASET_TYPE {
        const VIRTUAL: string;
        const PROMOTED: string;
        const DIRECT: string;
    }
    namespace CONTAINER_TYPE {
        const SPACE: string;
        const SOURCE: string;
        const FOLDER: string;
        const HOME: string;
    }
    namespace JOB_STATUS {
        const NOT_SUBMITTED: string;
        const STARTING: string;
        const RUNNING: string;
        const COMPLETED: string;
        const CANCELED: string;
        const FAILED: string;
        const CANCELLATION_REQUESTED: string;
        const ENQUEUED: string;
    }
    namespace SOURCE_TYPE {
        const AMAZONELASTIC: string;
        const REDSHIFT: string;
        const S3: string;
        const ADLS: string;
        const AZURE_STORAGE: string;
        const ELASTIC: string;
        const HDFS: string;
        const HIVE: string;
        const MAPRFS: string;
        const MSSQL: string;
        const MONGO: string;
        const MYSQL: string;
        const NAS: string;
        const ORACLE: string;
        const POSTGRES: string;
    }
}
export namespace Errors {
    export { SDKError };
    export { SDKValidationError };
}
/**
 * @class
 * @extends Error
 */
declare class SDKError extends Error {
    constructor(message: any);
}
/**
 * @class
 * @extends Error
 */
declare class SDKValidationError extends Error {
    constructor(message: any);
}
export {};
