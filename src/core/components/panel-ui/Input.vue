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
                <input
                    class="input input-small w-12-12"
                    :class="controlCl"
                    v-bind="attrs"
                    v-on="listeners"
                />
            </template>
        </control-layout>
    </div>
</template>
<script>
import { ControlMixin } from './utils/index';

export default {
    mixins: [ControlMixin],
    props: {
        /**
         * @model
         */
        value: {
            type: [Number, String]
        }
    }
};
</script>
