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
                <textarea
                    class="textarea textarea-small w-12-12"
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
    mixins: [ControlMixin]
};
</script>
