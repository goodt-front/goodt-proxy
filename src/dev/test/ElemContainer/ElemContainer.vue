<template>
    <div class="widget" :class="cssClass" :style="cssStyle">
        <code class="text-xsmall">{{ type }} | #{{ id }} | slotData</code>
        <pre class="text-xsmall">{{ slotData }}</pre>
        <div class="row">
            <div class="col">
                <slot v-bind="{ message: 'hello world' }"></slot>
            </div>
            <div class="col">
                <slot name="right" v-bind="{ foo: 'lorem ipsum' }"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { Elem } from '@goodt-wcore/core';

const descriptor = () => ({
    props: {},
    vars: {}
});

export default {
    extends: Elem,
    data() {
        return {
            descriptor: descriptor(),
            sec: 0
        };
    },
    methods: {
        isChildAllowed(type) {
            return true;
        },
        getSlotNames() {
            return ['default', 'right'];
        }
    }
};
</script>
