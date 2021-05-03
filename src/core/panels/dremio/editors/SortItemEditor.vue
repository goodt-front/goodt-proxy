<template>
    <div>
        <div class="row row-collapse">
            <div v-if="draggable" class="col col-auto col-vmid">
                <div class="icon cursor-move">
                    <i class="mdi mdi-drag mdi-18px" />
                </div>
            </div>
            <div class="col">
                <div class="form-control w-100">
                    <select
                        v-model="itemEdit.name"
                        class="select select-small w-100"
                        :class="{ invalid: !nameValid }"
                        :title="itemEdit.name"
                        @change="onChange"
                    >
                        <option v-for="n in names" :key="n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                    <div class="form-label form-label-sticky form-label-xsmall">
                        поле
                    </div>
                </div>
            </div>
            <div class="col col-auto">
                <div class="form-control mar-left-3">
                    <select
                        v-model="itemEdit.type"
                        class="select select-small w-100"
                        :class="{ invalid: !typeValid }"
                        :title="itemEdit.type"
                        @change="onChange"
                    >
                        <option v-for="n in types" :key="n" :value="n">
                            {{ n }}
                        </option>
                    </select>
                    <div class="form-label form-label-sticky form-label-xsmall">
                        тип
                    </div>
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
<style lang="less" scoped>
.cursor-move {
    cursor: move;
}
</style>
<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
    components: {},
    props: {
        item: {
            type: Object,
            default() {
                return { name: '', type: '' };
            }
        },
        names: {
            type: Array,
            default() {
                return [];
            }
        },
        types: {
            type: Array,
            default() {
                return [];
            }
        },
        deletable: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            itemEdit: null
        };
    },
    computed: {
        nameValid() {
            return this.validateName();
        },
        typeValid() {
            return this.validateType();
        }
    },
    watch: {
        item: {
            handler(val) {
                this.itemEdit = cloneDeep(val);
            },
            immediate: true
        }
    },
    methods: {
        validateName() {
            return this.names.find((el) => el === this.itemEdit.name) != null;
        },
        validateType() {
            return this.types.find((el) => el === this.itemEdit.type) != null;
        },
        onChange() {
            if (this.validateName() && this.validateType()) {
                this.$emit('change', this.itemEdit);
            }
        },
        onDelete() {
            this.$emit('delete', this.itemEdit);
        }
    }
};
</script>
