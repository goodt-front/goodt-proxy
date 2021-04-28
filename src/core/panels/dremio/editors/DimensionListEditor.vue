<template>
    <div class="pad-l1">
        <div class="btn btn-primary w-100 p" @click="openNewEditor">
            Добавить измерение
        </div>
        <div v-for="(name, i) in names" :key="name">
            <hr v-if="i" class="mar-v-l1" />
            <dimension-list-item-editor
                :class="{ 'mar-top-3': i > 0 }"
                v-bind="{
                    name,
                    names: namesUsed.filter(v => v != name),
                    fields: dimensionList[name],
                    fieldsAvailable
                }"
                @change="info => onItemChange(name, info)"
                @delete="onItemDelete(name)"
            />
        </div>
        <div v-if="showNewEditor" class="popup" style="z-index: 10; align-items: safe start;">
            <div class="popup-dialog w-11-12 mar-top-l1">
                <div class="popup-dialog-body">
                    <dimension-list-item-editor
                        v-bind="{
                            name: newDimension.name,
                            names: namesUsed,
                            fields: newDimension.fields,
                            fieldsAvailable,
                            deletable: false
                        }"
                        @change="info => onNewItemChange(info)"
                        @validate="valid => (newDimension.valid = valid)"
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
                        :class="{ disabled: !newDimension.valid }"
                        @click="addNewDimension"
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
import DimensionListItemEditor from './DimensionListItemEditor.vue';
import { Query } from "../../../dremio/index";

export default {
    components: {
        DimensionListItemEditor
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
        }
    },
    data() {
        return {
            dimensionListEdit: null,
            showNewEditor: false,
            newDimension: { name: '', fields: [], valid: false }
        };
    },
    computed: {
        names() {
            return Object.keys(this.dimensionList);
        },
        namesUsed() {
            let arr = this.metrics.map(el => this.getMetricName(el));
            arr = arr.concat(this.names);
            return arr.filter((el, i, a) => a.indexOf(el) == i && el != '');
        },
        fieldsAvailable() {
            return Object.keys(this.fields);
        }
    },
    watch: {
        dimensionList: {
            handler(val) {
                this.dimensionListEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    methods: {
        getMetricName(metric) {
            return Query.getMetricName(name);
        },
        openNewEditor() {
            this.showNewEditor = true;
            this.newDimension.name = '';
            this.newDimension.fields = [];
        },
        addNewDimension() {
            const { name, fields } = this.newDimension;
            this.$set(this.dimensionListEdit, name, fields);
            this.showNewEditor = false;
            this.dimensionListChanged();
        },
        onNewItemChange({ name, fields }) {
            this.newDimension.name = name;
            this.newDimension.fields = fields;
        },
        onItemChange(nameOld, { name, fields }) {
            this.$set(this.dimensionListEdit, name, fields);
            if (name != nameOld) {
                this.$delete(this.dimensionListEdit, nameOld);
            }
            this.dimensionListChanged();
        },
        onItemDelete(name) {
            this.$delete(this.dimensionListEdit, name);
            this.dimensionListChanged();
        },
        dimensionListChanged() {
            this.$emit('change', this.dimensionListEdit);
        }
    }
};
</script>
