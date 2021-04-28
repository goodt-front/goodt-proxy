<template>
    <div class="pad-l1">
        <div class="btn btn-primary w-100 p" @click="openNewEditor">
            Добавить фильтр
        </div>
        <div v-for="(filter, i) in filtersEdit" :key="i">
            <hr v-if="i" class="mar-v-l1" />
            <filter-item-editor
                v-bind="{
                    filter: {
                        name: getFilterName(filter),
                        type: getFilterType(filter),
                        value: getFilterValue(filter)
                    },
                    filterTypes,
                    filterNamesAvailable: [...filterNamesAvailable, getFilterName(filter)]
                }"
                @change="info => onFilterChange(i, info)"
                @delete="() => onFilterDelete(i)"
            />
        </div>

        <div v-if="showNewEditor" class="popup" style="z-index: 10; align-items: safe start;">
            <div class="popup-dialog w-11-12 mar-top-l1">
                <div class="popup-dialog-body">
                    <filter-item-editor
                        v-bind="{
                            filterTypes,
                            filterNamesAvailable,
                            deletable: false
                        }"
                        @change="info => onNewFilterChange(info)"
                    />
                </div>
                <div class="popup-dialog-footer pad-top-none text-right">
                    <span
                        class="btn btn-ghost btn-small mar-right-3"
                        @click="showNewEditor = false"
                    >
                        Отмена
                    </span>
                    <span
                        class="btn btn-primary btn-small"
                        :class="{ disabled: newFilter == null }"
                        @click="onNewFilterAdd"
                    >
                        Сохранить
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import FilterItemEditor from './FilterItemEditor.vue';
import { Query } from '../../../dremio';

export default {
    components: {
        FilterItemEditor
    },
    props: {
        metrics: {
            type: Array,
            default() {
                return [];
            }
        },
        dimensionList: {
            type: Object,
            default() {
                return {};
            }
        },
        fields: {
            type: Object,
            default() {
                return {};
            }
        },
        filters: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            showNewEditor: false,
            newFilter: null,
            filtersEdit: [],
            filterTypes: {
                [Query.FILTER_TYPE.EQ]: { name: '=', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.EQ_NOT]: { name: '!=', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.LESS]: { name: '<', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.LESS_EQ]: { name: '<=', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.GREATER]: { name: '>', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.GREATER_EQ]: { name: '>=', validator: arr => arr.length === 1 },
                [Query.FILTER_TYPE.IN]: { name: 'in', validator: arr => arr.length > 0 },
                [Query.FILTER_TYPE.IN_NOT]: { name: ' not in', validator: arr => arr.length > 0 },
                [Query.FILTER_TYPE.BETWEEN]: {
                    name: 'between',
                    validator: arr => arr.length === 2
                },
                [Query.FILTER_TYPE.BETWEEN_NOT]: {
                    name: 'not between',
                    validator: arr => arr.length === 2
                },
                [Query.FILTER_TYPE.LIKE]: { name: 'like', validator: arr => arr.length > 0 }
            }
        };
    },
    computed: {
        filterNames() {
            return this.filtersEdit.map(el => this.getFilterName(el));
        },
        filterNamesAvailable() {
            return [
                ...this.metricNames,
                ...Object.keys(this.dimensionList),
                ...Object.keys(this.fields)
            ].filter((el, i, a) => a.indexOf(el) === i && this.filterNames.indexOf(el) < 0);
        },
        metricNames() {
            return this.metrics.map(el => Query.getMetricName(el));
        }
    },
    watch: {
        filters: {
            handler(val) {
                this.filtersEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    methods: {
        openNewEditor() {
            this.newFilter = null;
            this.showNewEditor = true;
        },
        filtersChanged() {
            this.$emit('change', this.filtersEdit);
        },
        getFilterName(filter) {
            return Query.getFilterName(filter);
        },
        getFilterType(filter) {
            return Query.getFilterType(filter);
        },
        getFilterValue(filter) {
            return Query.getFilterValue(filter);
        },
        onNewFilterAdd() {
            const filter = Query.createFilter(this.newFilter);
            this.filtersEdit.push(filter);
            this.filtersChanged();
            this.showNewEditor = false;
        },
        onNewFilterChange({ name, type, value }) {
            this.newFilter = { name, type, value };
        },
        onFilterChange(i, { name, type, value }) {
            const filter = Query.createFilter({ name, type, value });
            this.filtersEdit.splice(i, 1, filter);
            this.filtersChanged();
        },
        onFilterDelete(i) {
            this.filtersEdit.splice(i, 1);
            this.filtersChanged();
        }
    }
};
</script>
