<template>
    <ui-panel-container>
        <!-- {demo} your panel goes here -->
        [[#hasTransport]]
        <ui-input v-model="props.apiBaseUrl" class="p" @change="propChanged('apiBaseUrl')">Service apiBaseUrl</ui-input>
        <ui-input v-model="props.orgStructureApiUrl" class="p" @change="propChanged('orgStructureApiUrl')">
            Service orgStructureApiUrl
        </ui-input>
        [[/hasTransport]]
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
