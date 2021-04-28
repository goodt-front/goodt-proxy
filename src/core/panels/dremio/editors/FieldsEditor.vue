<template>
    <div class="pad-l1">
        <div class="p">
            <div class="form-label form-label-small">
                Столбец:
            </div>
            <select v-model="activeColumnName" class="select w-100">
                <option v-for="name in columnNames" :key="name" :value="name">
                    {{ name }}
                </option>
            </select>
        </div>
        <button class="btn btn-primary btn-small text-truncate w-100" @click="generateMetrics">
            Сгенерировать метрики из полей
        </button>
        <div v-if="activeColumnNameExists" class="p">
            <div class="form-label form-label-small">
                Название поля:
            </div>
            <input
                class="input w-100"
                type="text"
                :value="activeFieldName"
                @change="changeActiveFieldName(activeFieldName, $event.target.value)"
            />
        </div>
        <div v-if="activeColumnSchema">
            <div>
                <i
                    v-if="activeColumnSchema.meta"
                    class="mdi mar-right-2"
                    :class="activeColumnSchema.meta.icon"
                />
                <code>{{ activeColumnSchema.type }}</code>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import { Query } from '../../../dremio';

export default {
    props: {
        fields: {
            type: Object,
            default() {
                return {};
            }
        },
        schema: {
            type: Array,
            default() {
                return [];
            }
        },
        column: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            fieldsEdit: {},
            activeColumnName: null,
            activeFieldName: ''
        };
    },
    computed: {
        fieldNames() {
            return Object.keys(this.fieldsEdit);
        },
        columnNames() {
            const arr = Object.values(this.fieldsEdit);
            arr.sort((a, b) => {
                const ai = this.schema.findIndex(el => el.column === a);
                const bi = this.schema.findIndex(el => el.column === b);
                return ai - bi;
            });
            return arr;
        },
        activeColumnSchema() {
            return this.schema.find(el => el.column === this.activeColumnName);
        },
        activeColumnNameExists() {
            return this.columnNames.indexOf(this.activeColumnName) >= 0;
        }
    },
    watch: {
        fields: {
            handler(val) {
                this.fieldsEdit = cloneDeep(val);
            },
            immediate: true
        },
        column: {
            handler(val) {
                this.activeColumnName = val;
            },
            immediate: true
        },
        activeColumnName: {
            handler(val) {
                for (const n in this.fieldsEdit) {
                    if (this.fieldsEdit[n] === this.activeColumnName) {
                        this.activeFieldName = n;
                        return;
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        generateMetrics() {
            const metrics = this.fieldNames.map(name =>
                Query.createMetric({ name, type: Query.METRIC_TYPE.VALUE, field: name })
            );
            this.$emit('generate', metrics);
        },
        changeActiveFieldName(nameOld, nameNew) {
            if (!nameNew.trim().length) {
                return;
            }
            if (nameOld !== nameNew) {
                this.$delete(this.fieldsEdit, nameOld);
            }
            this.$set(this.fieldsEdit, nameNew, this.activeColumnName);
            this.activeFieldName = nameNew;
            this.$emit('change', this.fieldsEdit);
        }
    }
};
</script>
