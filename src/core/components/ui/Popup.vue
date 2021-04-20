<template>
    <portal :to="target">
        <popup :visible="visible" v-bind="$attrs" @close="onClose">
            <template #close="{ close }">
                <slot name="close" v-bind="{ close }" />
            </template>
            <template #body="{ close }">
                <slot name="body" v-bind="{ close }" />
            </template>
            <template v-if="$scopedSlots.footer" #footer="{ close }">
                <slot name="footer" v-bind="{ close }" />
            </template>
        </popup>
    </portal>
</template>
<script>
import { Popup } from 'goodteditor-ui';
import { Portal } from 'portal-vue';
import Const from '../../Const';

export default {
    inheritAttrs: false,
    components: { Portal, Popup },
    props: {
        /** popup visibility state (.sync modifier supported) */
        visible: {
            type: Boolean,
            default: false
        }
        /** for more props @see https://goodt-ui.netlify.app/#!/Popup */
    },
    data() {
        return {
            target: Const.PORTAL_TARGET_NAME_POPUP
        };
    },
    methods: {
        onClose() {
            this.$emit('close');
            this.$emit('update:visible', false);
        }
    }
};
</script>
