<template>
    <ui-panel-container>
        <!-- your panel goes here -->
        <ui-input class="p" v-model="props.prop" @change="propChanged('prop')">
            Label
        </ui-input>
    </ui-panel-container>
</template>
<script>
import { Panel } from '[[{core}]]';
import { PanelInstanceTypeDescriptor } from '../types';

export default {
    extends: Panel,
    data: () => ({
        $meta: { name: '[[{panelName}]]', icon: '' },
        ...PanelInstanceTypeDescriptor
    })
};
</script>
