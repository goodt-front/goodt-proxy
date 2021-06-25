<template>
    <ui-panel-container>
        <ui-input-browse class="p" v-model="props.url" @change="propChanged('url')">
            image url
        </ui-input-browse>
        <ui-switch class="p" v-model="descriptor.responsive" @change="propChanged('responsive')">
            responsive
        </ui-switch>
    </ui-panel-container>
</template>
<script>
import { Panel } from '@goodt/core';

/**
 * @typedef {import('./OptionsPanel').IComponentOptions} IComponentOptions
 * @typedef {import('./OptionsPanel').IInstance} IInstance
 */

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    }
});
</script>
