<template>
    <div>
        <div class="p">
            <div class="row row-collapse">
                <div class="col">
                    <div class="form-label form-label-small">
                        Название
                    </div>
                    <input
                        v-model="nameEdit"
                        class="input w-100"
                        :class="[nameValid ? '' : 'invalid']"
                        type="text"
                        @change="changed()"
                    />
                </div>
                <div v-if="deletable" class="col col-auto col-vbot">
                    <div class="btn btn-icon" @click="onDelete">
                        <div class="icon">
                            <i class="mdi mdi-minus-circle-outline mdi-18px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-label form-label-small">
            Поля
        </div>
        <div class="pad-3 bg-grey-lighter radius cf">
            <draggable
                v-if="fieldsValid"
                v-model="fieldsEdit"
                v-bind="dragOptions"
                @change="onFieldsChanged"
            >
                <div v-for="(field, i) in fieldsEdit" :key="i" class="pad-v-2">
                    <div class="row row-collapse">
                        <div class="col col-auto col-vmid">
                            <i class="mdi mdi-drag cursor-move mdi-18px mar-right-2" />
                        </div>
                        <div class="col col-vmid text-truncate text-small">
                            {{ field }}
                        </div>
                        <div class="col col-auto col-vmid">
                            <div class="icon cursor-pointer mar-left-2" @click="onFieldDelete(i)">
                                <i class="mdi mdi-close mdi-18px" />
                            </div>
                        </div>
                    </div>
                </div>
            </draggable>
            <div v-else class="alert alert-error">
                <div class="alert-body text-small">
                    Необходимо выбрать поля
                </div>
            </div>
            <div class="pos-rel pull-right" @click.stop>
                <div class="icon cursor-pointer color-primary" @click="showDropdown = true">
                    <i class="mdi mdi-plus-circle-outline mdi-18px" />
                </div>
                <div
                    v-if="showDropdown"
                    class="dropdown text-small pos-abs pos-bot-left pos-offset-left"
                >
                    <ul>
                        <li
                            v-for="field in fieldsAvailable"
                            :key="field"
                            @click="onFieldAdd(field)"
                        >
                            {{ field }}
                        </li>
                    </ul>
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
import draggable from 'vuedraggable';

export default {
    components: {
        draggable
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        names: {
            type: Array,
            default() {
                return [];
            }
        },
        fields: {
            type: Array,
            default() {
                return [];
            }
        },
        fieldsAvailable: {
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
            nameEdit: '',
            fieldsEdit: [],
            dragOptions: {
                animation: 200,
                handle: '.cursor-move'
            },
            showDropdown: false
        };
    },
    computed: {
        nameValid() {
            return this.validateName();
        },
        fieldsValid() {
            return this.validateFields();
        }
    },
    watch: {
        name: {
            handler(val) {
                this.nameEdit = val;
            },
            immediate: true
        },
        fields: {
            handler(val) {
                this.fieldsEdit = cloneDeep(val);
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
            let val = this.nameEdit.trim();
            let i = this.names.indexOf(val);
            return val.length > 0 && i < 0;
        },
        validateFields() {
            return this.fieldsEdit.length > 0;
        },
        changed() {
            let valid = this.validateName() && this.validateFields();
            if (valid) {
                this.$emit('change', {
                    name: this.nameEdit.trim(),
                    fields: this.fieldsEdit
                });
            }
            this.$emit('validate', valid);
        },
        onFieldsChanged() {
            this.changed();
        },
        onFieldDelete(i) {
            this.fieldsEdit.splice(i, 1);
            this.changed();
        },
        onFieldAdd(field) {
            this.fieldsEdit.push(field);
            this.showDropdown = false;
            this.changed();
        },
        onDelete() {
            this.$emit('delete');
        },
        onDocClick() {
            this.showDropdown = false;
        }
    }
};
</script>
