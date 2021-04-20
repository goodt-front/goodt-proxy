<template>
    <div class="pad-l1">
        <div class="btn btn-primary w-100 p" @click="openNewMetricEditor">
            Добавить метрику
        </div>
        <div v-for="(metric, i) in metricsEdit" :key="getMetricName(metric)">
            <hr v-if="i" class="mar-v-l1" />
            <metric-item-editor
                :name="getMetricName(metric)"
                :type="getMetricType(metric)"
                :field="getMetricField(metric)"
                :field-names="fieldNames"
                :metric-names="metricNames.filter(v => v != getMetricName(metric))"
                :metric-types="metricTypes"
                @change="info => onMetricChange(i, info)"
                @delete="onMetricDelete(i)"
            />
        </div>

        <div v-if="showNewMetricEditor" class="popup" style="z-index: 10; align-items: safe start">
            <div class="popup-dialog w-11-12 mar-top-l1">
                <div class="popup-dialog-body">
                    <metric-item-editor
                        :field-names="fieldNames"
                        :metric-names="metricNames"
                        :metric-types="metricTypes"
                        :deletable="false"
                        @change="info => (newMetricInfo = info)"
                        @invalid="newMetricInfo = null"
                    />
                </div>
                <div class="popup-dialog-footer pad-top-none text-right">
                    <span
                        class="btn btn-ghost btn-small mar-right-3"
                        @click="showNewMetricEditor = false"
                    >
                        Отмена
                    </span>
                    <span
                        class="btn btn-primary btn-small"
                        :class="[newMetricInfo ? '' : 'disabled']"
                        @click="addNewMetric()"
                        >Сохранить</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MetricItemEditor from './MetricItemEditor.vue';
import cloneDeep from 'lodash/cloneDeep';
import { Query } from './../../../dremio/index';

export default {
    components: {
        MetricItemEditor
    },
    props: {
        metrics: {
            type: Array,
            default() {
                return [];
            }
        },
        metricTypes: {
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
            newMetricInfo: null,
            metricsEdit: [],
            showNewMetricEditor: false
        };
    },
    computed: {
        fieldNames() {
            return Object.keys(this.fields);
        },
        metricNames() {
            let arr = this.metrics.map(el => this.getMetricName(el));
            arr = arr.concat(Object.keys(this.dimensionList));
            return arr.filter((el, i, a) => a.indexOf(el) == i && el != '');
        }
    },
    watch: {
        metrics: {
            handler(val) {
                this.metricsEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    methods: {
        openNewMetricEditor() {
            this.showNewMetricEditor = true;
            this.newMetricInfo = null;
        },
        getMetricName(metric) {
            return Query.getMetricName(metric);
        },
        getMetricType(metric) {
            return Query.getMetricType(metric);
        },
        getMetricField(metric) {
            return Query.getMetricField(metric);
        },
        addNewMetric() {
            this.metricsEdit.push(Query.createMetric(this.newMetricInfo));
            this.showNewMetricEditor = false;
            this.metricsChanged();
        },
        onMetricChange(i, info) {
            this.metricsEdit.splice(i, 1, Query.createMetric(info));
            this.metricsChanged();
        },
        onMetricDelete(i) {
            this.metricsEdit.splice(i, 1);
            this.metricsChanged();
        },
        metricsChanged() {
            this.$emit('change', this.metricsEdit);
        }
    }
};
</script>
