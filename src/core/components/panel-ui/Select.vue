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
                <ui-select
                    class="w-12-12"
                    :class="controlCl"
                    type="text"
                    size="small"
                    v-bind="selectAttrs"
                    v-on="listeners"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { ControlMixin } from './utils/index';
import { Select as UiSelect } from 'goodteditor-ui';

/**
 * For more <b>props</b> @see https://goodt-ui.netlify.app/#!/Select
 */
export default {
    components: { UiSelect },
    mixins: [ControlMixin],
    props: {
        /** @model */
        value: {
            type: [Number, String, Array, Object],
            default: null
        },
        /**
         * Options Array[Object] ~ [ { value:'', label: '' } ]
         */
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        /**
         * Allow multiple selection
         */
        multiple: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        selectAttrs() {
            let { options, multiple, ...rest } = this.attrs;
            return {
                ...rest,
                options: this.options,
                multiple: this.multiple
            };
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
