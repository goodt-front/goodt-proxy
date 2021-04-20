<template>
    <div>
        <control-layout col-size="auto" label-size="small">
            <template #label>
                <label class="text-truncate u-select-none" :for="id">
                    <!-- 
                    @slot label slot
                    -->
                    <slot />
                </label>
            </template>
            <template #control>
                <input
                    :id="id"
                    class="switch switch-small pull-left"
                    :class="controlCl"
                    type="checkbox"
                    v-bind="attrsCb"
                    v-on="listeners"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { ControlMixin } from './utils/index';

let ID = 0;

export default {
    mixins: [ControlMixin],
    props: {
        /** @model */
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        id() {
            return `ui-switch-${ID++}`;
        },
        attrsCb() {
            let { value, ...attrs } = this.attrs;
            return { ...attrs, checked: value };
        }
    },
    methods: {
        onInput(e) {
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', e.target.checked);
        },
        onChange(e) {
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', e.target.checked);
        }
    }
};
</script>
