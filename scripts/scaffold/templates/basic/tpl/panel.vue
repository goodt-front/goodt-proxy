<template>
    <ui-panel-container>
        <!-- {demo} your panel goes here -->
        <ui-input
            v-model="props.apiBaseURL"
            class="p"
            @change="propChanged('apiBaseURL')">
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
