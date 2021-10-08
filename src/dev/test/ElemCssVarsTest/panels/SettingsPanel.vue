<template>
    <ui-panel-container>
        <ui-input-cp class="p" v-model="props.bgColor" @change="propChanged('bgColor')">bgColor</ui-input-cp>
        <ui-input-cp v-model="props.font.color" @change="propChanged('font')">font.color</ui-input-cp>
    </ui-panel-container>
</template>
<script>
import { Panel } from '@goodt-wcore/core';
/**
 * @typedef {import('./SettingsPanel').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Panel,
    data: () => ({
        $meta: { name: 'SettingsPanel', icon: '' },
        ...ComponentInstanceTypeDescriptor
    })
};
</script>
