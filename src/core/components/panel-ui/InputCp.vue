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
                    class="mdi mdi-variable cursor-pointer pull-right"
                    :class="[isConstantMode ? '' : 'color-grey']"
                    style="line-height: 1"
                    @click="toggleConstantMode"
                />
            </template>
            <template #control>
                <ui-select
                    v-if="isConstantMode"
                    class="w-100"
                    :class="controlCl"
                    size="small"
                    v-bind="selectOptions"
                    v-on="listeners"
                />
                <input-color-picker
                    v-else
                    class="w-100"
                    :class="controlCl"
                    size="small"
                    v-bind="attrs"
                    v-on="listeners"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { Select as UiSelect , InputColorPicker } from 'goodteditor-ui';

import { ControlMixin, getConstants, isConstant } from './utils/index';

export default {
    components: { InputColorPicker, UiSelect },
    mixins: [ControlMixin],
    data() {
        return { isConstantMode: false };
    },
    computed: {
        selectOptions() {
            const opt = {
                options: getConstants(),
                labelField: null,
                valueField: null
            };
            return { ...this.attrs, ...opt };
        }
    },
    watch: {
        value: {
            handler(v) {
                this.isConstantMode = isConstant(v);
            },
            immediate: true
        }
    },
    methods: {
        toggleConstantMode() {
            this.isConstantMode = !this.isConstantMode;
        },
        onInput(value) {
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', value);
        },
        onChange(value) {
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', value);
        }
    }
};
</script>
