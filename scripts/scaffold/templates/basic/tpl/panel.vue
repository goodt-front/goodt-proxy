<template>
    <ui-panel-container>
        <!-- your panel goes here -->
        <ui-input class="p" v-model="props.apiBaseURL" @change="propChanged('apiBaseURL')">
            Service apiBaseURL
        </ui-input>
    </ui-panel-container>
</template>
<script>
/**
 * @typedef {import('./[[{panelName}]]').IComponentOptions} IComponentOptions
 * @typedef {import('./[[{panelName}]]').IInstance} IInstance
 */
import { Panel } from '[[{core}]]';

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Panel,
    data: () => ({
        $meta: { name: '[[{panelName}]]', icon: '' }
    })
});
</script>
