<template>
    <ui-panel-container>
        <!-- your panel goes here -->
        <ui-input class="p" v-model="props.prop" @change="propChanged('prop')">
            Label
        </ui-input>
    </ui-panel-container>
</template>
<script>
import { Panel } from '@goodt-wcore/core';

export default {
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    }
};
</script>
