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
                    @click="toggleCustomValueMode" />
            </template>
            <template #control>
                <ui-select
                    v-if="options.length && isCustomValueMode"
                    class="w-100"
                    :class="controlCl"
                    size="small"
                    v-bind="{ value, options }"
                    @change="onOptionChange" />
                <ui-input-units
                    ref="input"
                    class="w-12-12"
                    :class="controlCl"
                    v-bind="{ value, units, size: 'small' }"
                    v-else-if="!options.length || (options.length && !isCustomValueMode)"
                    @change="onInputUnitChange"></ui-input-units>
            </template>
        </control-layout>
    </div>
</template>
<script>
import { InputUnits as UiInputUnits, Select as UiSelect } from 'goodteditor-ui';
import { ControlMixin } from './utils';

export default {
    components: { UiInputUnits, UiSelect },
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
            isCustomValueMode: false
        };
    },
    watch: {
        value: {
            /**
             * @param {any} newValue
             */
            handler(newValue) {
                this.isCustomValueMode = !!this.options.find(({ value }) => value === newValue);
            },
            immediate: true
        }
    },
    methods: {
        toggleCustomValueMode() {
            this.isCustomValueMode = !this.isCustomValueMode;
        },
        /**
         * @param {any} value
         */
        emitInput(value) {
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', value);
        },
        /**
         * @param {any} value
         * @param {object} model
         * @param {any} model.value
         * @param {string} model.unit
         */
        emitChange(value, model) {
            /**
             * Change event
             * @property {any} value
             * @property {object} model
             */
            this.$emit('change', value, model);
        },
        /**
         * @param {any} value
         */
        onOptionChange(value) {
            const model = { value, unit: '' };
            this.emitInput(value);
            this.emitChange(value, model);
        },
        /**
         * @param {any} value
         */
        onInputUnitChange(value) {
            if (!value) {
                return;
            }
            const { model } = this.$refs.input;
            this.emitInput(value);
            this.emitChange(value, model);
        }
    }
};
</script>
