<template>
    <div class="pad-l1">
        <div class="btn btn-primary w-100 p" @click="openNewEditor">
            Добавить сортировку
        </div>
        <draggable v-model="sortEdit" v-bind="dragOptions" @change="sortChanged">
            <div v-for="(sort, i) in sortEdit" :key="i">
                <hr v-if="i" class="mar-v-l1" />
                <sort-item-editor
                    v-bind="{
                        item: { name: getSortName(sort), type: getSortType(sort) },
                        names: namesAvailable,
                        types: sortTypes
                    }"
                    @change="info => onItemChange(i, info)"
                    @delete="() => onItemDelete(i)"
                />
            </div>
        </draggable>

        <div v-if="showNewEditor" class="popup" style="z-index: 10;align-items: safe start;">
            <div class="popup-dialog w-11-12 mar-top-l1">
                <div class="popup-dialog-body">
                    <sort-item-editor
                        v-bind="{
                            names: namesAvailable,
                            types: sortTypes,
                            deletable: false,
                            draggable: false
                        }"
                        @change="info => onNewItemChange(info)"
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
                        :class="{ disabled: newSortItem == null }"
                        @click="onNewItemAdd"
                    >
                        Сохранить
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SortItemEditor from './SortItemEditor.vue';
import cloneDeep from 'lodash/cloneDeep';
import draggable from 'vuedraggable';
import { Query } from './../../../dremio/index';

export default {
    components: {
        SortItemEditor,
        draggable
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
        sort: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            sortEdit: [],
            newSortItem: null,
            showNewEditor: false,
            sortTypes: Object.values(Query.SORT_TYPE),
            dragOptions: {
                animation: 200,
                handle: '.cursor-move'
            }
        };
    },
    computed: {
        namesAvailable() {
            let arr = this.metrics.map(el => Query.getMetricName(el));
            arr = arr.concat(Object.keys(this.dimensionList));
            arr.sort((a, b) => a.localeCompare(b));
            return arr;
        }
    },
    watch: {
        sort: {
            handler(val) {
                this.sortEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    methods: {
        openNewEditor() {
            this.newSortItem = null;
            this.showNewEditor = true;
        },
        getSortName(sort) {
            return Query.getSortName(sort);
        },
        getSortType(sort) {
            return Query.getSortType(sort);
        },
        sortChanged() {
            this.$emit('change', this.sortEdit);
        },
        onNewItemAdd() {
            let sort = Query.createSort(this.newSortItem);
            this.sortEdit.push(sort);
            this.showNewEditor = false;
            this.sortChanged();
        },
        onNewItemChange(info) {
            this.newSortItem = info;
        },
        onItemChange(i, { name, type }) {
            let sort = Query.createSort({ name, type });
            this.sortEdit.splice(i, 1, sort);
            this.sortChanged();
        },
        onItemDelete(i) {
            this.sortEdit.splice(i, 1);
            this.sortChanged();
        }
    }
};
</script>
