import { SDK, Query, Dremio, Errors } from 'goodt-dremio-sdk';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
// eslint-disable-next-line import/no-cycle
import AuthManager from '../managers/AuthManager';
import Const from '../Const';

/**
 * Dremio sdk factory
 *
 * @param {import('goodt-dremio-sdk').SDKConfig} config
 * @return {SDK}  sdk instance
 */
const SDKFactory = (config = {}) => {
    const configDefault = {
        host: Const.DREMIO_API_URL
    };
    const instance = new SDK({ ...configDefault, ...config });
    instance.beforeRequest = () =>
        new Promise((resolve) => {
            const { adapter } = AuthManager.instance;
            if (adapter) {
                adapter
                    .updateToken()
                    .then(() => {
                        instance.config.authToken = adapter.token;
                    })
                    .finally(() => resolve());
            } else {
                resolve();
            }
        });
    return instance;
};
/**
 * (dremio) Widget component mixin
 */
const mixin = {
    data() {
        return {
            /**
             * Dremio query 'offset'
             *
             * @property {number}
             */
            offset: 0,
            /**
             * @property {DremioResult}
             */
            result: null,
            /**
             * @property {Query}
             */
            queryHelper: null,
            /**
             * @property {boolean}
             */
            watchStoreState: true,
            /**
             * loadData() method hooks
             *
             * @see loadData()
             * @property {Record<string, any>}
             */
            loadDataHooks: {
                before: () => {
                    this.loading = true;
                },
                then: (x) => x,
                catch: (error) => {
                    if (!error.isCancel) {
                        this.error = error;
                    }
                },
                finally: () => {
                    this.loading = false;
                }
            },
            loading: false,
            error: null
        };
    },
    computed: {
        /**
         * alias ~ props.dremio.limit
         *
         * @return {number}
         */
        limit() {
            const { dremio } = this.props;
            return dremio && dremio.limit != null ? dremio.limit : 0;
        },
        /**
         * alias ~ result.rowCount
         *
         * @return {number}
         */
        rowCount() {
            return this.result ? this.result.rowCount : 0;
        },
        page: {
            /**
             * @param {number} val
             */
            set(val) {
                this.offset = (val - 1) * this.limit;
            },
            /**
             * @return {number}
             */
            get() {
                return this.limit ? this.offset / this.limit + 1 : 1;
            }
        },
        /**
         * @return {number}
         */
        pages() {
            // @ts-ignore
            return this.limit ? Math.ceil(this.rowCount / this.limit) : 1;
        },
        /**
         * @return {?string}
         */
        // eslint-disable-next-line unicorn/prevent-abbreviations
        dremioStr() {
            try {
                return JSON.stringify(this.props.dremio);
            } catch {
                return null;
            }
        }
    },
    created() {
        /**
         * @property {SDK}
         */
        this.dremioSdk = SDKFactory();
        /**
         * @property {string[]}
         */
        this.dremioVars = [];

        this.dremioHandler();

        // watch store state if enabled
        if (this.watchStoreState) {
            this.$watchStore({ handler: (_, state) => this.storeStateWatcher(state) });
        }
        if (this.isEditorMode) {
            this.$watch('dremioStr', this.dremioHandler);
        }
    },
    destroyed() {
        this.dremioSdk.cancelActiveRequests();
    },
    methods: {
        /**
         * Loads data via dremio sdk
         */
        loadData() {
            this.dremioSdk.cancelActiveRequests();
            this.loadDataHooks.before();

            const query = this.queryHelper.buildQuery();

            this.dremioSdk
                .getData(query, this.offset, this.limit)
                .then((result) => {
                    this.result = result;
                    this.loadDataHooks.then(result);
                })
                .catch(this.loadDataHooks.catch)
                .finally(this.loadDataHooks.finally);
        },
        /**
         * Inits queryHelpher, injects dremio vars, reloads data
         */
        dremioHandler() {
            const { dremio } = this.props;
            if (!dremio) {
                this.result = null;
                return;
            }
            this.queryHelper = new Query(cloneDeep(dremio));
            this.setDremioVars();
            this.loadData();
        },
        /**
         * Injects dremio.query metrics/dimensions/fields in descriptor.vars
         */
        setDremioVars() {
            const dremioParams = this.getDremioQueryParamNames();

            this.dremioVars = this.dremioVars.reduce((varsAcc, name) => {
                if (dremioParams.includes(name)) {
                    varsAcc.push(name);
                    return varsAcc;
                }
                this.$delete(this.descriptor.vars, name);
                return varsAcc;
            }, []);

            dremioParams.forEach((name) => {
                const variable = { description: name };
                this.$set(this.descriptor.vars, name, variable);
                this.dremioVars.push(name);
            });
        },
        /**
         * Applies dremio filters
         *
         * @param {Record<string, any>} params   params to be injected
         * @return {boolean}
         */
        applyDremioFilters(params) {
            let { query } = this.queryHelper;
            const originalQuery = cloneDeep(query);
            const dremioParams = this.getDremioQueryParamNames();
            let anyFilterApplied = false;
    
            Object.entries(params).forEach(([name, paramVal]) => {
                if (dremioParams.includes(name)) {
                    if (paramVal !== null) {
                        const filter = this.createDremioFilter(name, paramVal);
                        query = Query.queryInsertUpdateFilter(query, filter);
                    } else {
                        query = Query.queryRemoveFilter(query, name);
                    }
                    anyFilterApplied = !isEqual(query, originalQuery);
                }
            });
    
            return anyFilterApplied;
        },
        /**
         * Creates a new dremio query filter
         *
         * @param {string} name         metric/dimension/field name
         * @param {string|string[]} value  value
         * @return {Record<string, any>} filter
         */
        createDremioFilter(name, value) {
            const isArray = Array.isArray(value);
            return Query.createFilter({
                name,
                type: isArray ? Query.FILTER_TYPE.IN : Query.FILTER_TYPE.EQ,
                value: [].concat(value)
            });
        },
        /**
         * Returns dremio query metric/dimension/field names
         *
         * @return {string[]}
         */
        getDremioQueryParamNames() {
            const { query, dimensionList } = this.queryHelper;
            const metrics = Query.queryMetricNames(query);
            const dimensions = Object.keys(dimensionList);
            const fields = Query.queryFieldNames(query);
            return [...metrics, ...dimensions, ...fields];
        },
        /**
         * Store state watcher handler
         * @param {object} state
         * @returns {void|undefined}
         */
        storeStateWatcher(state) {
            if (!Object.keys(state).length) {
                return;
            }
            this.$nextTick(() => {
                if (this.applyDremioFilters(state)) {
                    this.offset = 0;
                    this.loadData();
                }
            });
        }
    }
};

export { SDKFactory, SDK, Query, Dremio, Errors, mixin };
