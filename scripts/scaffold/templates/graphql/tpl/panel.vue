<template>
    <ui-panel-container>
        <!-- {demo} your panel goes here -->
    </ui-panel-container>
</template>
<script>
import { Panel } from '[[{core}]]';
/**
 * @typedef {import('./[[{panelName}]]').TInstance} TInstance
 * @type {TInstance}
 */
const ComponentInstanceTypeDescriptor = undefined;

export default {
    extends: Panel,
    data: () => ({
        $meta: { name: '[[{panelName}]]', icon: '' },
        ...ComponentInstanceTypeDescriptor
    })
};
</script>
