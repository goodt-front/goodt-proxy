<template>
    <ui-panel-container>
        <ui-input-cp class="p" v-model="props.boxBorder.color" @change="propChanged('boxBorder')">
            boxBorder.color
        </ui-input-cp>
        <ui-input-units
            class="p"
            v-model="props.boxBorder.width"
            :units="descriptor.props.boxBorder.units"
            @change="propChanged('width')">
            boxBorder.width
        </ui-input-units>
        <ui-input-cp class="p" v-model="props.color.even" @change="propChanged('color')">color.even</ui-input-cp>
        <ui-input-cp v-model="props.color.odd" @change="propChanged('color')">color.odd</ui-input-cp>
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
