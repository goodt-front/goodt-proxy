<template>
    <div>
        <ui-switch v-model="settings.showArrows" @change="settingsChanged()">
            show navigation arrows
        </ui-switch>
    </div>
</template>
<script>
import { Panel } from '[[{core}]]/core';

export default {
    extends: Panel,
    computed: {
        settings() {
            return this.props.pagination;
        }
    },
    methods: {
        settingsChanged() {
            this.propChanged('pagination');
        }
    }
};
</script>
