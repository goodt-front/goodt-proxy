<template>
    <div>
        <control-layout col-size="12-12">
            <template #label>
                <!-- 
                @slot label slot
                -->
                <slot />
            </template>
            <template #control>
                <ui-input-tags
                    ref="tags"
                    class="w-12-12"
                    :class="controlCl"
                    size="small"
                    v-bind="attrs"
                    v-on="listeners"
                >
                    <template #tag="{ tag, remove }">
                        <!-- 
                        @slot tag slot
                        @binding {string} tag           tag
                        @binding {Function} remove      remove tag function(tag:String)
                        @binding {Function} setNewTag   set new tag function(tag:String)
                        -->
                        <slot name="tag" v-bind="{ tag, remove, setNewTag }" />
                    </template>
                </ui-input-tags>
            </template>
        </control-layout>
    </div>
</template>
<script>
import { ControlMixin } from './utils';
import { InputTags as UiInputTags } from 'goodteditor-ui';

export default {
    components: { UiInputTags },
    mixins: [ControlMixin],
    props: {
        /** @model */
        value: {
            type: Array,
            default() {
                return [];
            }
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
        /**
         * Sest the new tag for the input
         * @param {string} val
         * @public
         */
        setNewTag(val) {
            const el = this.$refs.tags;
            el && el.setNewTag(val);
        }
    }
};
</script>
