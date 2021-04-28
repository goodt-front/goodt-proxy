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
                <input-autocomplete
                    class="w-12-12"
                    :class="controlCl"
                    size="small"
                    v-bind="inputOptions"
                    v-on="listeners"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { InputAutocomplete } from 'goodteditor-ui';
import { ControlMixin, getConstants } from './utils';

export default {
    components: { InputAutocomplete },
    mixins: [ControlMixin],
    props: {
        /**
         * Suggested options Array[String]
         */
        options: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        inputOptions() {
            const { options, ...rest } = this.attrs;
            return { ...rest, options: [...this.options, ...getConstants()] };
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
        }
    }
};
</script>
