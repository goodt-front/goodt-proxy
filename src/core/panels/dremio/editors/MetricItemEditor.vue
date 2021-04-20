<template>
    <div>
        <div class="p">
            <div class="row row-collapse">
                <div class="col">
                    <div class="form-label form-label-small">
                        Название
                    </div>
                    <div class="form-control w-100">
                        <input
                            v-model="nameEdit"
                            class="input input-small w-100"
                            :class="{ invalid: !nameValid }"
                            type="text"
                            @change="changed()"
                        />
                    </div>
                </div>
                <div v-if="deletable" class="col col-auto col-vbot">
                    <div class="btn btn-icon btn-small" @click="onDelete">
                        <div class="icon">
                            <i class="mdi mdi-minus-circle-outline mdi-18px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-label form-label-small">
                    Поле
                </div>
                <textarea
                    v-if="typeEdit == typeExpression"
                    v-model="fieldEdit"
                    class="textarea textarea-small w-100"
                    @change="changed()"
                />
                <select
                    v-else
                    v-model="fieldEdit"
                    class="select select-small w-100"
                    @change="changed()"
                >
                    <option v-for="name in fieldNames" :key="name" :value="name">
                        {{ name }}
                    </option>
                </select>
            </div>
            <div class="col col-6-12">
                <div class="form-label form-label-small">
                    Агрегация
                </div>
                <select v-model="typeEdit" class="select select-small w-100" @change="changed()">
                    <option v-for="type in metricTypes" :key="type.type" :value="type.type">
                        {{ type.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import { Query } from 'goodt-dremio-sdk';

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        field: {
            type: String,
            default: ''
        },
        fieldNames: {
            type: Array,
            default() {
                return [];
            }
        },
        metricNames: {
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
        deletable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            nameEdit: this.name,
            typeEdit: this.type,
            fieldEdit: this.field,
            typeExpression: Query.METRIC_TYPE.EXPRESSION
        };
    },
    computed: {
        nameValid() {
            return this.validateName();
        }
    },
    methods: {
        validateName() {
            let val = this.nameEdit.trim();
            let i = this.metricNames.indexOf(val);
            return val.length > 0 && i < 0;
        },
        validateType() {
            return this.metricTypes.find(el => el.type == this.typeEdit) != null;
        },
        changed() {
            if (this.validateName() && this.validateType()) {
                let { nameEdit: name, typeEdit: type, fieldEdit: field } = this;
                this.$emit('change', { name: name.trim(), type, field });
            } else {
                this.$emit('invalid');
            }
        },
        onDelete() {
            this.$emit('delete');
        }
    }
};
</script>
