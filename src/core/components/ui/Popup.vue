<template>
    <ui-portal>
        <ui-popup :visible="visible" v-bind="$attrs" @close="onClose">
            <template #close="{ close }">
                <slot name="close" v-bind="{ close }" />
            </template>
            <template #body="{ close }">
                <slot name="body" v-bind="{ close }" />
            </template>
            <template v-if="$scopedSlots.footer" #footer="{ close }">
                <slot name="footer" v-bind="{ close }" />
            </template>
        </ui-popup>
    </ui-portal>
</template>
<script>
import { Popup as UiPopup } from 'goodteditor-ui';
import UiPortal from './Portal.vue';

export default {
    components: { UiPortal, UiPopup },
    inheritAttrs: false,
    props: {
        /** popup visibility state (.sync modifier supported) */
        visible: {
            type: Boolean,
            default: false
        }
        /** for more props @see https://goodt-ui.netlify.app/#!/Popup */
    },
    methods: {
        onClose() {
            this.$emit('close');
            this.$emit('update:visible', false);
        }
    }
};
</script>
