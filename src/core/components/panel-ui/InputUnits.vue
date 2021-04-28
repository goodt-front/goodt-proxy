<template>
    <div>
        <control-layout :col-size="colSize">
            <template #label>
                <!--
                @slot label slot
                -->
                <slot />
            </template>
            <template #helper>
                <i
                    v-if="options.length"
                    class="mdi mdi-variable cursor-pointer pull-right"
                    :class="[isCustomValueMode ? '' : 'color-grey']"
                    style="line-height: 1"
                    @click="toggleCustomValueMode"
                />
            </template>
            <template #control>
                <ui-select
                    v-if="options.length && isCustomValueMode"
                    class="w-100"
                    :class="controlCl"
                    size="small"
                    v-bind="{ value, options }"
                    @change="onOptionChange"
                />
                <div
                    v-else-if="!options.length || (options.length && !isCustomValueMode)"
                    ref="form-elem"
                    class="form-elem form-elem-small w-12-12"
                    :class="formElemCl"
                    tabindex="0"
                    @focus="onFormElemFocus"
                >
                    <div class="row row-collapse">
                        <div class="col">
                            <input
                                ref="input"
                                v-model.number="num"
                                class="input-num text-small text-right w-12-12"
                                v-bind="{
                                    type: 'number',
                                    step: 'any',
                                    ...attrs
                                }"
                                v-on="inputListeners"
                            />
                        </div>
                        <div class="col col-auto col-vmid">
                            <span
                                class="link text-small mar-h-1"
                                :class="{ 'color-inherit': invalid }"
                                @click.stop="togglePopover"
                            >
                                {{ unit }}
                            </span>
                        </div>
                        <ui-popover
                            :show.sync="showPopover"
                            v-bind="{
                                target: popoverTarget,
                                position: 'br'
                            }"
                        >
                            <ui-datalist
                                class="pull-left"
                                v-bind="{ options: units, size: 'small' }"
                                @select-option="onUnitChange"
                            />
                        </ui-popover>
                    </div>
                </div>
            </template>
        </control-layout>
    </div>
</template>
<style lang="less" scoped>
.input-num {
    color: inherit;
    line-height: 1;
    border: none;
    outline: none;
    appearance: none;
    -moz-appearance: textfield;
    &:invalid {
        box-shadow: none;
    }
}
</style>
<script>
import { ControlMixin } from './utils';
import { Select as UiSelect, Popover as UiPopover, Datalist as UiDatalist } from 'goodteditor-ui';

export default {
    components: { UiSelect, UiPopover, UiDatalist },
    mixins: [ControlMixin],
    props: {
        /**
         * @model
         */
        value: {
            type: String,
            default: ''
        },
        /**
         * Suggested options Array.[Object] ~ [ { label:'', value:'' } ]
         */
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        /**
         * Unit options Array.[String]
         */
        units: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            num: '',
            unit: '',
            showPopover: false,
            popoverTarget: null,
            isCustomValueMode: false,
            formElemHasFocus: false
        };
    },
    computed: {
        valuePrivate() {
            const { num, unit } = this;
            return `${num}${unit}`;
        },
        formElemCl() {
            const o = {
                focus: this.formElemHasFocus
            };
            return { ...this.controlCl, ...o };
        },
        inputListeners() {
            const { input, change, ...listeners } = { ...this.listeners };
            return {
                focusin: this.toggleFormElemFocus,
                focusout: this.toggleFormElemFocus,
                change: this.onInputChange,
                ...listeners
            };
        }
    },
    watch: {
        isCustomValueMode: {
            handler(v, vo) {
                // wait for next dom render
                v != vo && setTimeout(() => (this.popoverTarget = this.$refs['form-elem']));
            },
            immediate: true
        },
        value: {
            handler(v) {
                this.isCustomValueMode = !!this.options.find(({ value }) => value === v);
                if (this.isCustomValueMode) {
                    this.num = v;
                    this.unit = '';
                    return;
                }

                const a = String(v).match(/^([\d.-]*)([a-z%]+)$/i);
                this.unit = this.units.length ? this.units[0] : '';

                if (!a) {
                    this.num = v;
                } else {
                    const [_, num, unit] = a;
                    if (this.units.includes(unit)) {
                        this.num = num;
                        this.unit = unit;
                    } else {
                        this.num = '';
                    }
                }
            },
            immediate: true
        },
        valuePrivate() {
            if (this.num === '' && this.unit !== '') {
                return;
            }
            this.emitInput();
        }
    },
    mounted() {
        this.popoverTarget = this.$refs['form-elem'];
    },
    methods: {
        toggleFormElemFocus() {
            this.formElemHasFocus = !this.formElemHasFocus;
        },
        toggleCustomValueMode() {
            this.isCustomValueMode = !this.isCustomValueMode;
            if (!this.isCustomValueMode) {
                this.num = '';
                this.unit = this.units.length ? this.units[0] : '';
            }
        },
        togglePopover() {
            this.showPopover = !this.showPopover;
        },
        emitInput() {
            const { valuePrivate } = this;
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', valuePrivate);
        },
        emitChange() {
            const { valuePrivate, num: value, unit } = this;
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', valuePrivate, { unit, value });
        },
        onInputChange(e) {
            this.$nextTick(this.emitChange);
        },
        onOptionChange(value) {
            this.num = value;
            this.unit = '';
            this.$nextTick(this.emitChange);
        },
        onUnitChange({ option }) {
            this.showPopover = false;
            this.unit = option;
            if (this.num !== '') {
                this.$nextTick(this.emitChange);
            }
        },
        onFormElemFocus() {
            const el = this.$refs.input;
            el && el.focus();
        }
    }
};
</script>
