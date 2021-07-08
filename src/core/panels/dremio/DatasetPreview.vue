<template>
    <div class="d-flex flex-col w-100 h-100">
        <div class="flex-grow scroll-x scroll-y">
            <excel-table v-bind="{ header, body: rows }">
                <template v-if="selectionEnabled" #header-cell-summary>
                    <th>
                        <label class="checkbox">
                            <input
                                type="checkbox"
                                :checked="headerAllSelected"
                                @change="onColumnSummarySelect"
                            /><i />
                        </label>
                    </th>
                </template>
                <template #header-cell="{ item, colIndex, numCols, letter }">
                    <th
                        :key="`header-${item ? item.field : colIndex}`"
                        :style="{
                            'min-width': '100px',
                            width: `${100 / numCols}%`
                        }"
                    >
                        <div class="text-center">
                            <div v-if="selectionEnabled && item" class="mar-bot-2">
                                <label class="checkbox">
                                    <input
                                        type="checkbox"
                                        :checked="item.selected"
                                        @change="onColumnSelect(item)"
                                    /><i />
                                </label>
                            </div>
                            <div>{{ letter }}</div>
                            <div v-if="item" class="nobr text-normal">
                                <i
                                    v-if="item.meta"
                                    class="mdi mdi-18px mar-right-2"
                                    :class="[item.meta.icon]"
                                    :title="item.type"
                                />
                                <span class="d-inline-block text-small">
                                    <div
                                        v-if="selectionEnabled && item.selected"
                                        class="cursor-pointer"
                                        :title="item.column"
                                        @click="onColumnClick(item)"
                                    >
                                        {{ item.field }}
                                    </div>
                                    <div v-else>{{ item.field }}</div>
                                </span>
                            </div>
                        </div>
                        <div
                            v-if="selectionEnabled && item && !item.selected"
                            class="shim events-none"
                        >
                            <div class="shim-overlay" />
                        </div>
                    </th>
                </template>

                <template #data-cell="{ row, col }">
                    <div v-if="row && col">
                        <template v-if="row[col.column]">
                            <div
                                class="text-right text-small"
                                :class="{ 'text-muted': selectionEnabled && !col.selected }"
                            >
                                {{ row[col.column] }}
                            </div>
                        </template>
                    </div>
                    <div v-else />
                </template>
            </excel-table>
            <div v-if="error || loading" class="shim">
                <div class="shim-overlay" />
                <div class="shim-content h-100 scroll-y">
                    <div v-if="loading" class="preloader pos-abs pos-center pad-l1 color-primary" />
                    <div v-if="error" class="alert alert-error mar-l5 pull-center">
                        <div class="close" @click="error = null">
                            <i class="mdi mdi-close" />
                        </div>
                        <div class="alert-body text-small">
                            <div><b>Ошибка синтаксиса!</b></div>
                            <div>Возможные причины:</div>
                            <ul>
                                <li>отсутствие агрегаций у метрик;</li>
                                <li>неправильные названия полей;</li>
                                <li>опечатки.</li>
                            </ul>
                            <div class="p">
                                Проверьте настройки запроса.
                            </div>
                            <div>
                                <div
                                    class="btn btn-error btn-small"
                                    @click.prevent="errorCollapsed = !errorCollapsed"
                                >
                                    <template v-if="errorCollapsed">
                                        Показать
                                    </template>
                                    <template v-else>
                                        Скрыть
                                    </template>
                                    подробное описание
                                </div>
                            </div>
                            <div
                                v-if="!errorCollapsed"
                                class="text-xsmall mar-top-l1"
                                style="white-space: pre-wrap"
                            >
                                {{ error }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="pad-l1 text-xsmall">
            <div v-show="datasetName" class="row row-collapse">
                <div class="col">
                    <div>
                        <span
                            class="color-primary cursor-pointer"
                            title="Обновить"
                            @click="load(page)"
                            >{{ datasetName }}</span
                        >
                    </div>
                    <div>
                        Всего записей: {{ rowCount.toLocaleString() }} / страниц:
                        {{ pages.toLocaleString() }}
                        <code class="cursor-pointer" @click="showDebug = true">debug</code>
                    </div>
                </div>
                <div class="col col-auto col-vmid">
                    <pagination
                        v-if="pages > 1"
                        v-bind="{ page, pages }"
                        @select="page => load(page)"
                    />
                </div>
            </div>
        </div>

        <div v-if="showDebug" class="popup" style="z-index: 10" @click="showDebug = false">
            <div class="popup-dialog w-11-12" style="max-width: 800px" @click.stop>
                <div class="icon close" @click="showDebug = false">
                    <i class="mdi mdi-close" />
                </div>
                <div class="popup-dialog-body">
                    <code>sql</code>
                    <div class="pos-rel">
                        <pre class="text-xsmall p" style="white-space: pre-line">{{ sql }}</pre>
                        <div
                            class="btn btn-ghost btn-icon btn-small pos-abs pos-bot-right"
                            @click="writeToClipboard(sql)"
                        >
                            <i class="mdi mdi-content-copy"></i>
                        </div>
                    </div>
                    <code>dremio</code>
                    <div class="pos-rel">
                        <pre class="text-xsmall" style="max-height: 35vh">{{ dremio }}</pre>
                        <div
                            class="btn btn-ghost btn-icon btn-small pos-abs pos-bot-right"
                            @click="writeToClipboard(dremio)"
                        >
                            <i class="mdi mdi-content-copy"></i>
                        </div>
                    </div>
                </div>
                <div class="popup-dialog-footer text-right">
                    <span class="btn btn-ghost" @click="showDebug = false">Закрыть</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Pagination } from 'goodteditor-ui';
import cloneDeep from 'lodash/cloneDeep';
import ExcelTable from './ExcelTable.vue';
import { Query, SDKFactory } from '../../dremio';

const { KEY } = Query;

export default {
    components: {
        ExcelTable,
        Pagination
    },
    props: {
        demo: {
            type: Boolean,
            default: true
        },
        query: {
            type: Object,
            default() {
                return null;
            }
        },
        dimensionList: {
            type: Object,
            default() {
                return {};
            }
        },
        limit: {
            type: Number,
            default: 10
        },
        fields: {
            type: Object,
            default() {
                return {};
            }
        },
        fieldTypesMeta: {
            type: Object,
            default() {
                return {};
            }
        },
        selectionEnabled: {
            type: Boolean,
            default: true
        },
        queryLimit: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            showDebug: false,
            result: null,
            offset: 0,
            error: null,
            errorCollapsed: true,
            loading: false
        };
    },
    computed: {
        dremio() {
            const { query, dimensionList, queryLimit: limit } = this;
            return limit !== 0 ? { query, dimensionList, limit } : { query, dimensionList };
        },
        sql() {
            return this.result ? this.result.sql : '';
        },
        rows() {
            return this.result ? this.result.rows : [];
        },
        rowCount() {
            return this.result ? this.result.rowCount : 0;
        },
        schema() {
            if (!this.result) {
                return [];
            }
            return this.result.schema;
        },
        metrics() {
            return this.query ? this.query[KEY.METRICS] : [];
        },
        datasetName() {
            return this.query ? this.query[KEY.FROM].join(' / ') : '';
        },
        page() {
            return Math.ceil((this.offset + 1) / this.limit);
        },
        pages() {
            return Math.ceil(this.rowCount / this.limit);
        },
        header() {
            return this.schema.map(({ name, type }) => {
                const column = name;
                let field = name;
                let selected = false;
                let meta = this.fieldTypesMeta[type];
                meta = meta || this.fieldTypesMeta.UNKNOWN;

                for (const f in this.fields) {
                    if (this.fields[f] === column) {
                        field = f;
                        selected = true;
                        break;
                    }
                }
                return { column, field, selected, type, meta };
            });
        },
        headerAllSelected() {
            return (
                this.header.reduce((acc, { selected }) => (selected ? acc + 1 : acc), 0) ===
                this.header.length
            );
        },
        queryStr() {
            if (!this.query) {
                return null;
            }
            // нет метрик && нет измерений
            if (!this.demo && !this.metrics.length && !Object.keys(this.dimensionList).length) {
                return null;
            }
            const q = { ...this.query, [KEY.FIELDS]: {} };
            return JSON.stringify(q);
        }
    },
    watch: {
        queryStr: {
            handler(val, valOld) {
                if (!val) {
                    this.result = null;
                    return;
                }
                if (val !== valOld) {
                    this.load();
                }
            }
        },
        dimensionList: {
            handler(val, valOld) {
                if (val) {
                    this.load();
                }
            },
            deep: true
        }
    },
    created() {
        Object.defineProperty(this, 'dremioSdk', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: SDKFactory({ admin: true })
        });
        this.load();
    },
    methods: {
        load(page = 1) {
            if (!this.query) {
                return;
            }

            this.dremioSdk.cancelActiveRequests();
            this.offset = (page - 1) * this.limit;
            this.loading = true;
            this.error = null;
            this.dremioSdk
                .getData(this.buildQuery(), this.offset, this.limit, true)
                .then((result) => {
                    this.result = result;
                })
                .catch((e) => {
                    if (!e.isCancel) {
                        this.error = e;
                        this.errorCollapsed = true;
                    }
                })
                .finally(() => (this.loading = false));
        },
        buildQuery() {
            const query = cloneDeep(this.query);
            const dl = this.dimensionList || {};
            for (const name in dl) {
                const field = dl[name][0];
                const d = Query.createDimension({ name, field });
                Query.queryInsertUpdateDimension(query, d);
            }
            return query;
        },
        async writeToClipboard(any) {
            try {
                const str = typeof any !== 'string' ? JSON.stringify(any) : any;
                await navigator.clipboard.writeText(str);
            } catch (e) {
                this.error = e;
            }
        },
        onColumnSummarySelect() {
            const selected = this.headerAllSelected ? [] : this.header.map(({ column }) => column);
            this.$emit('column-summary-select', selected);
        },
        onColumnSelect(item) {
            this.$emit('column-select', item);
        },
        onColumnClick(item) {
            this.$emit('column-click', item);
        }
    }
};
</script>
