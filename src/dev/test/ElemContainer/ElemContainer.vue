<template>
    <div :class="cssClass" :style="cssStyle">
        <code class="text-xsmall">{{ type }} | #{{ id }} | slotData</code>
        <pre class="text-xsmall">{{ slotData }}</pre>
        <slot v-bind="{ message: 'hello world' }"></slot>
    </div>
</template>
<script>
import { Elem } from '../../../core/index';

const descriptor = () => ({
    props: {},
    vars: {}
});

export default {
    extends: Elem,
    data() {
        return {
            routeCurrent: {},
            descriptor: descriptor()
        };
    },
    methods: {
        isChildAllowed(type) {
            return true;
        },
        getSlotNames() {
            return ['default'];
        }
    }
};
</script>
