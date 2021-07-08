<template>
    <editor-popup>
        <template #header-left>
            <template v-if="datasetName">
                <div class="d-flex flex-v-center">
                    <button
                        class="btn btn-ghost btn-icon mar-right-3"
                        @click="backToDatasetSelection"
                    >
                        <span class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px" />
                        </span>
                    </button>
                    <div class="text-h3">
                        {{ datasetName }}
                    </div>
                    <a
                        class="btn btn-ghost btn-icon mar-left-3"
                        :href="datasetLink"
                        target="_blank"
                        rel="noopener"
                    >
                        <span class="icon">
                            <i class="mdi mdi-database mdi-18px" />
                        </span>
                    </a>
                </div>
            </template>
            <div v-else class="text-h3">
                Выбор источника
            </div>
        </template>

        <template #header-right>
            <div class="btn btn-ghost shadow mar-right-l1" @click="$emit('close')">
                Отмена
            </div>
            <div
                v-if="from.length"
                class="btn btn-primary"
                @click="$emit('save', { query, dimensionList, limit })"
            >
                Сохранить
            </div>
        </template>

        <template #sidebar>
            <sidebar-tile
                v-for="(tile, i) in sidebarTilesDisplayed"
                :key="tile.name"
                :open="sidebarTileActive === tile.name"
                :toggle-enabled="from.length > 0"
                :class="{ 'mar-top-3': i > 0 }"
                @toggle="onSidebarTileToggle(tile)"
            >
                <template #icon>
                    <div class="icon">
                        <i class="mdi mdi-18px" :class="tile.icon" />
                    </div>
                </template>
                <template #title>
                    {{ tile.title }}
                </template>
                <template v-if="tile.component" #content>
                    <component
                        :is="tile.component"
                        v-bind="tile.componentBinds()"
                        v-on="tile.componentEvents()"
                    />
                </template>
            </sidebar-tile>
        </template>

        <template #content>
            <dataset-preview
                v-show="showDemoPreview"
                v-bind="{ query: queryDemo, fields, fieldTypesMeta }"
                @column-summary-select="onColumnSummarySelect"
                @column-select="onColumnSelect"
                @column-click="onColumnClick"
            />
            <dataset-preview
                v-show="!showDemoPreview"
                ref="queryPreview"
                v-bind="{
                    demo: false,
                    query,
                    dimensionList,
                    fields,
                    fieldTypesMeta,
                    selectionEnabled: false,
                    queryLimit: limit
                }"
            />
        </template>
    </editor-popup>
</template>
<script>
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import DatasetTree from './Tree.vue';
import EditorPopup from './EditorPopup.vue';
import SidebarTile from './SidebarTile.vue';
import DatasetPreview from './DatasetPreview.vue';
// editors
import FieldsEditor from './editors/FieldsEditor.vue';
import MetricsEditor from './editors/MetricsEditor.vue';
import DimensionListEditor from './editors/DimensionListEditor.vue';
import FiltersEditor from './editors/FiltersEditor.vue';
import SortEditor from './editors/SortEditor.vue';
import PaginationEditor from './editors/PaginationEditor.vue';
// utils
import { Query, SDKFactory } from '../../dremio';
import Const from '../../Const';

const { KEY } = Query;
const FIELD_TYPES_META = {
    BOOLEAN: { icon: 'mdi-ab-testing' },
    VARBINARY: { icon: 'mdi-numeric-10' },
    DATE: { icon: 'mdi-calendar' },
    FLOAT: { icon: 'mdi-numeric' },
    DECIMAL: { icon: 'mdi-numeric' },
    DOUBLE: { icon: 'mdi-numeric' },
    INTERVAL: { icon: 'mdi-clock-outline' },
    INT: { icon: 'mdi-numeric' },
    INTEGER: { icon: 'mdi-numeric' },
    BIGINT: { icon: 'mdi-numeric' },
    TIME: { icon: 'mdi-clock-outline' },
    TIMESTAMP: { icon: 'mdi-calendar-clock' },
    VARCHAR: { icon: 'mdi-alphabetical-variant' },
    STRUCT: { icon: 'mdi-sitemap' },
    LIST: { icon: 'mdi-view-list' },
    UNKNOWN: { icon: 'mdi-help-circle-outline' }
};
export default {
    components: {
        DatasetPreview,
        SidebarTile,
        EditorPopup
    },
    props: {
        initQuery: {
            type: Object,
            default: null
        },
        initDimensionList: {
            type: Object,
            default: null
        },
        initLimit: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            fieldsSchema: [],
            fieldTypesMeta: FIELD_TYPES_META,
            queryDemo: null,
            query: null,
            dimensionList: {},
            limit: 0,
            catalog: [],
            loading: {
                catalog: false
            },
            activeColumn: null,
            sidebarTileActive: null,
            sidebarTiles: [
                {
                    name: 'from',
                    icon: 'mdi-database',
                    title: 'Источник',
                    component: DatasetTree,
                    componentBinds: function() {
                        return {
                            entities: this.catalog,
                            getEntity: this.getCatalogEntity,
                            selectDataset: this.selectDataset,
                            loading: this.loading.catalog
                        };
                    }.bind(this),
                    componentEvents() {
                        return {};
                    }
                },
                {
                    name: 'fields',
                    icon: 'mdi mdi-table',
                    title: 'Настройка полей',
                    component: FieldsEditor,
                    componentBinds: function() {
                        return {
                            fields: this.fields,
                            schema: this.fieldsSchemaExt,
                            column: this.activeColumn
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.fields = val),
                            generate: (val) => {
                                val.forEach((metric) => {
                                    const metricNames = Query.queryMetricNames(this.query);
                                    if (!metricNames.includes(Query.getMetricName(metric))) {
                                        this.query[KEY.METRICS].push(metric);
                                    }
                                });
                            }
                        };
                    }.bind(this)
                },
                {
                    name: 'metrics',
                    icon: 'mdi mdi-gauge',
                    title: 'Метрики',
                    component: MetricsEditor,
                    componentBinds: function() {
                        return {
                            metrics: this.metrics,
                            metricTypes: this.metricTypes,
                            dimensionList: this.dimensionList,
                            fields: this.fields
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.metrics = val)
                        };
                    }.bind(this)
                },
                {
                    name: 'dimensionList',
                    icon: 'mdi mdi-group',
                    title: 'Измерения',
                    component: DimensionListEditor,
                    componentBinds: function() {
                        return {
                            metrics: this.metrics,
                            dimensionList: this.dimensionList,
                            fields: this.fields
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.dimensionList = val)
                        };
                    }.bind(this)
                },
                {
                    name: 'filters',
                    icon: 'mdi-filter',
                    title: 'Фильтры',
                    component: FiltersEditor,
                    componentBinds: function() {
                        return {
                            metrics: this.metrics,
                            dimensionList: this.dimensionList,
                            fields: this.fields,
                            filters: this.filters
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.filters = val)
                        };
                    }.bind(this)
                },
                {
                    name: 'sort',
                    icon: 'mdi-sort',
                    title: 'Сортировка',
                    component: SortEditor,
                    componentBinds: function() {
                        return {
                            metrics: this.metrics,
                            dimensionList: this.dimensionList,
                            sort: this.sort
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.sort = val)
                        };
                    }.bind(this)
                },
                {
                    name: 'limit',
                    icon: 'mdi-content-copy',
                    title: 'Пагинация',
                    component: PaginationEditor,
                    componentBinds: function() {
                        return {
                            limit: this.limit
                        };
                    }.bind(this),
                    componentEvents: function() {
                        return {
                            change: (val) => (this.limit = val)
                        };
                    }.bind(this)
                }
            ]
        };
    },
    computed: {
        showDemoPreview() {
            return ['from', 'fields'].indexOf(this.sidebarTileActive) >= 0;
        },
        sidebarTilesDisplayed() {
            const handler = ({ name }) => (!this.from.length ? name === 'from' : name !== 'from');
            return this.sidebarTiles.filter(handler);
        },
        metricTypes() {
            return Object.keys(Query.METRIC_TYPE).map((k) => ({
                name: k,
                type: Query.METRIC_TYPE[k]
            }));
        },
        fieldsSchemaExt() {
            return this.fieldsSchema.map(({ name, type }) => {
                const t = type.name;
                const column = name;
                let field = name;
                let selected = false;
                let meta = this.fieldTypesMeta[t];
                meta = meta || this.fieldTypesMeta.UNKNOWN;

                for (const f in this.fields) {
                    if (this.fields[f] === column) {
                        field = f;
                        selected = true;
                        break;
                    }
                }
                return { column, field, selected, type: t, meta };
            });
        },
        datasetName() {
            return this.from.join(' / ');
        },
        datasetLink() {
            return `${Const.DREMIO_UI_URL}/space/${this.datasetName}`.replace(/\s/g, '');
        },
        fields: {
            get() {
                return this.query ? this.query[KEY.FIELDS] : {};
            },
            set(val) {
                this.query[KEY.FIELDS] = val;
            }
        },
        from: {
            get() {
                return this.query ? this.query[KEY.FROM] : [];
            },
            set(val) {
                this.query[KEY.FROM] = val;
            }
        },
        metrics: {
            get() {
                return this.query ? this.query[KEY.METRICS] : [];
            },
            set(val) {
                this.query[KEY.METRICS] = val;
            }
        },
        dimensions: {
            get() {
                return this.query ? this.query[KEY.DIMENSIONS] : [];
            },
            set(val) {
                this.query[KEY.DIMENSIONS] = val;
            }
        },
        filters: {
            get() {
                return this.query ? this.query[KEY.FILTERS] : [];
            },
            set(val) {
                this.query[KEY.FILTERS] = val;
            }
        },
        sort: {
            get() {
                return this.query ? this.query[KEY.SORT] : [];
            },
            set(val) {
                this.query[KEY.SORT] = val;
            }
        }
    },
    watch: {
        initQuery: {
            handler(val) {
                this.query = cloneDeep(val);
            },
            immediate: true
        },
        initDimensionList: {
            handler(val) {
                this.dimensionList = cloneDeep(val);
            },
            immediate: true
        },
        initLimit: {
            handler(val) {
                this.limit = val;
            },
            immediate: true
        },
        from: {
            handler(val, valOld) {
                if (val.length && !isEqual(val, valOld)) {
                    this.onDatasetChange();
                }
            },
            immediate: true
        }
    },
    beforeCreate() {
        this.dremioSdk = SDKFactory({ admin: true });
    },
    mounted() {
        this.loadCatalog();
    },
    beforeDestroy() {
        this.dremioSdk.cancelActiveRequests();
    },
    methods: {
        getCatalogRootEntities() {
            return this.dremioSdk.getRootEntities();
        },
        getCatalogEntity(path) {
            return this.dremioSdk.getEntityByPath(path);
        },
        selectDataset(path) {
            const query = Query.createQuery();
            query[KEY.FROM] = path;
            this.query = query;
        },
        onSidebarTileToggle(tile) {
            this.sidebarTileActive = tile.name;
        },
        onColumnClick({ column }) {
            this.activeColumn = column;
        },
        onColumnSummarySelect(selected) {
            if (selected.length) {
                this.fields = selected.reduce((acc, el) => {
                    acc[el] = el;
                    return acc;
                }, {});
            } else {
                this.fields = {};
            }
        },
        onColumnSelect({ column, field, selected }) {
            if (selected) {
                this.$delete(this.fields, field);
            } else {
                this.$set(this.fields, column, column);
            }
        },
        onDatasetChange() {
            const query = Query.createQuery();
            query[KEY.FROM] = this.from;
            this.queryDemo = query;
            this.sidebarTileActive = 'fields';
            this.getCatalogEntity(this.from).then(({ fields }) => {
                this.fieldsSchema = fields;
                // нет fields
                if (!Object.keys(this.fields).length) {
                    this.$set(
                        this,
                        'fields',
                        fields.reduce((acc, val) => {
                            acc[val.name] = val.name;
                            return acc;
                        }, {})
                    );
                }
            });
        },
        loadCatalog() {
            if (!this.from.length) {
                this.loading.catalog = true;
                this.getCatalogRootEntities()
                    .then((res) => (this.catalog = res))
                    .catch(() => {})
                    .finally(() => (this.loading.catalog = false));
            }
            this.sidebarTileActive = this.sidebarTilesDisplayed[0].name;
        },
        backToDatasetSelection() {
            this.query = null;
            this.queryDemo = null;
            this.fieldsSchema = [];
            this.loadCatalog();
        }
    }
};
</script>
