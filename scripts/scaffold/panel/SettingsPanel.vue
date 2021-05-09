<template>
    <div>
        <ui-input class="p" v-model="props.prop" @change="propChanged('prop')">
            Label
        </ui-input>
    </div>
</template>
<script>
import { Panel } from '@goodt/core';

export default {
    extends: Panel,
    data() {
        return {
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    }
};
</script>
