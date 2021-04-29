import { SDK, Query, Dremio, Errors } from 'goodt-dremio-sdk';
import cloneDeep from 'lodash/cloneDeep';
import AuthManager from '../managers/AuthManager';
import Const from '../Const';

/**
 * Dremio sdk factory
 * @param {import('goodt-dremio-sdk').SDKConfig} config
 * @return {SDK}  sdk instance
 */
const SDKFactory = (config = {}) => {
    const configDefault = {
        host: Const.DREMIO_API_URL
    };
    const instance = new SDK({ ...configDefault, ...config });
    instance.beforeRequest = () =>
        new Promise(resolve => {
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
             * loadData() method hooks
             * @see loadData()
             * @property {Record<string, any>}
             */
            loadDataHooks: {
                before: () => {
                    this.loading = true;
                },
                then: r => r,
                catch: e => {
                    if (!e.isCancel) {
                        this.error = e;
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
         * @return {number}
         */
        limit() {
            const { dremio } = this.props;
            return dremio && dremio.limit != null ? dremio.limit : 0;
        },
        /**
         * alias ~ result.rowCount
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
        dremioStr() {
            try {
                return JSON.stringify(this.props.dremio);
            } catch (e) {
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
         * @property {Array.<String>}
         */
        this.dremioVars = [];

        this.dremioHandler();

        if (this.isEditorMode) {
            this.$watch('dremioStr', this.dremioHandler);
        }
    },
    destroyed() {
        this.dremioSdk.cancelActiveRequests();
    },
    methods: {
        /**
         * subscribe() lc override
         */
        subscribe() {
            this.eventBusWrapper.listenStateChange((e, state) => {
                if (this.applyDremioFilters(state)) {
                    this.offset = 0;
                }
                this.loadData();
            });
        },
        /**
         * Loads data via dremio sdk
         */
        loadData() {
            this.dremioSdk.cancelActiveRequests();
            this.loadDataHooks.before();

            const query = this.queryHelper.buildQuery();

            this.dremioSdk
                .getData(query, this.offset, this.limit)
                .then(result => {
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

            this.dremioVars = this.dremioVars.reduce((arr, name) => {
                if (dremioParams.includes(name)) {
                    arr.push(name);
                    return arr;
                }
                this.$delete(this.descriptor.vars, name);
                return arr;
            }, []);

            dremioParams.forEach(name => {
                const variable = { description: name };
                this.$set(this.descriptor.vars, name, variable);
                this.dremioVars.push(name);
            });
        },
        /**
         * Applies dremio filters
         * @param {Record<string, any>} params   params to be injected
         */
        applyDremioFilters(params) {
            const { query } = this.queryHelper;
            const dremioParams = this.getDremioQueryParamNames();
            let anyFilterApplied = false;

            Object.entries(params).forEach(([name, paramVal]) => {
                if (dremioParams.includes(name)) {
                    anyFilterApplied = true;
                    if (paramVal !== null) {
                        const filter = this.createDremioFilter(name, paramVal);
                        this.queryHelper.query = Query.queryInsertUpdateFilter(query, filter);
                    } else {
                        this.queryHelper.query = Query.queryRemoveFilter(query, name);
                    }
                }
            });

            return anyFilterApplied;
        },
        /**
         * Creates a new dremio query filter
         * @param {string} name         metric/dimension/field name
         * @param {string|Array} value  value
         * @return {Record<string, any>} filter
         */
        createDremioFilter(name, value) {
            const isArray = Array.isArray(value);
            return Query.createFilter({
                name,
                type: isArray ? Query.FILTER_TYPE.IN : Query.FILTER_TYPE.EQ,
                value: isArray ? value : [value]
            });
        },
        /**
         * Returns dremio query metric/dimension/field names
         * @return {string[]}
         */
        getDremioQueryParamNames() {
            const { query, dimensionList } = this.queryHelper;
            const metrics = Query.queryMetricNames(query);
            const dimensions = Object.keys(dimensionList);
            const fields = Query.queryFieldNames(query);
            return [...metrics, ...dimensions, ...fields];
        }
    }
};

export { SDKFactory, SDK, Query, Dremio, Errors, mixin };
