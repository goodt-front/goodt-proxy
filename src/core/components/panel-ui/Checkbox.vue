<template>
    <div>
        <control-layout
            col-size="auto"
            label-size="small"
            :style="{ 'flex-direction': 'row-reverse' }"
        >
            <template #label>
                <label class="text-truncate u-select-none" :for="id">
                    <!--
                    @slot label slot
                    -->
                    <slot />
                </label>
            </template>
            <template #helper>
                <!--
                @slot helper slot
                -->
                <slot name="helper" />
            </template>
            <template #control>
                <input
                    :id="id"
                    class="checkbox checkbox-small pull-left"
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
            return `ui-checkbox-${ID++}`;
        },
        attrsCb() {
            let { value, ...attrs } = this.attrs;
            return { ...attrs, checked: value };
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.checked);
        },
        onChange(e) {
            this.$emit('change', e.target.checked);
        }
    }
};
</script>
