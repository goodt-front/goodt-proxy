<template>
    <div>
        <control-layout :col-size="colSize">
            <template #label>
                <!--
                @slot label slot
                -->
                <slot />
            </template>
            <template #control>
                <input-date-picker
                    class="w-12-12"
                    :class="controlCl"
                    size="small"
                    v-bind="attrs"
                    v-on="listenersDp"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { InputDatePicker } from 'goodteditor-ui';
import { ControlMixin } from './utils';

/**
 * For more <b>props</b> @see https://goodt-ui.netlify.app/#!/InputDatePicker
 */
export default {
    components: { InputDatePicker },
    mixins: [ControlMixin],
    computed: {
        listenersDp() {
            const { clear, ...rest } = this.listeners;
            return { ...rest, clear: this.onClear };
        }
    },
    methods: {
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
        },
        onClear(value) {
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', '');
        }
    }
};
</script>
