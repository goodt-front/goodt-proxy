<template>
    <div>
        <div class="row row-collapse">
            <div class="col">
                <div class="form-control w-100">
                    <select
                        v-model="filterEdit.name"
                        class="select select-small w-100"
                        :class="{ invalid: !nameValid }"
                        :title="filterEdit.name"
                        @change="onChange"
                    >
                        <option v-for="name in namesAvailable" :key="name" :value="name">
                            {{ name }}
                        </option>
                    </select>
                    <div class="form-label form-label-sticky form-label-xsmall">
                        поле
                    </div>
                </div>
            </div>
            <div class="col col-vbot col-3-12">
                <select
                    v-model="filterEdit.type"
                    class="select select-small w-100"
                    :class="{ invalid: !typeValid }"
                    :title="filterTypes[filterEdit.type] ? filterTypes[filterEdit.type].name : ''"
                    @change="onChange"
                >
                    <option v-for="(typeInfo, type) in filterTypes" :key="type" :value="type">
                        {{ typeInfo.name }}
                    </option>
                </select>
            </div>
            <div class="col">
                <div class="form-control form-control-icon-right">
                    <input
                        v-model="value"
                        class="input input-small w-100"
                        :class="{ invalid: !valueValid }"
                        :title="value"
                        @change="onChange"
                    />
                    <div
                        class="icon cursor-pointer"
                        @click.stop="showValueOptions = !showValueOptions"
                    >
                        <i class="mdi mdi-variable" />
                    </div>
                    <div
                        v-if="showValueOptions"
                        class="dropdown pos-abs pos-bot-right pos-offset-bot text-xsmall"
                        @click.stop
                    >
                        <ul style="max-height: 8.5rem">
                            <li
                                v-for="opt in valueOptions"
                                :key="opt"
                                :title="opt"
                                class="text-truncate"
                                @click="selectValueOption(opt)"
                            >
                                {{ opt }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-label form-label-sticky form-label-xsmall">
                    значения
                </div>
            </div>
            <div v-if="deletable" class="col col-auto">
                <div class="btn btn-icon btn-small" @click="onDelete">
                    <div class="icon">
                        <i class="mdi mdi-minus-circle-outline mdi-18px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import { Query } from 'goodt-dremio-sdk';

export default {
    props: {
        filterNamesAvailable: {
            type: Array,
            default() {
                return [];
            }
        },
        filterTypes: {
            type: Object,
            default() {
                return {};
            }
        },
        filter: {
            type: Object,
            default() {
                return { name: '', type: '', value: [''] };
            }
        },
        deletable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            filterEdit: null,
            valueOptions: Object.values(Query.FILTER_VALUE),
            showValueOptions: false
        };
    },
    computed: {
        value: {
            set(val) {
                this.filterEdit.value = val.split(',');
            },
            get() {
                return this.filterEdit.value.join(',');
            }
        },
        namesAvailable() {
            let arr = this.filterNamesAvailable.slice(0);
            arr.sort((a, b) => a.localeCompare(b));
            return arr;
        },
        nameValid() {
            return this.validateName();
        },
        typeValid() {
            return this.validateType();
        },
        valueValid() {
            return this.validateValues();
        }
    },
    watch: {
        filter: {
            handler(val) {
                this.filterEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    created() {
        document.addEventListener('click', this.onDocClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.onDocClick);
    },
    methods: {
        validateName() {
            return this.filterEdit.name.length > 0;
        },
        validateType() {
            return this.filterEdit.type.length > 0;
        },
        validateValues() {
            let t = this.filterTypes[this.filterEdit.type];
            return t ? t.validator(this.filterEdit.value) : false;
        },
        selectValueOption(opt) {
            this.value += opt;
            this.showValueOptions = false;
            this.onChange();
        },
        onChange() {
            if (!this.validateName() || !this.validateType() || !this.validateValues()) {
                return;
            }
            this.$emit('change', this.filterEdit);
        },
        onDelete() {
            this.$emit('delete', this.filterEdit);
        },
        onDocClick() {
            this.showValueOptions = false;
        }
    }
};
</script>
