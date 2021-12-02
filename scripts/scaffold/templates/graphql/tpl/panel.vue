<template>
    <ui-panel-container>
        <!-- {demo} your panel goes here -->
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
