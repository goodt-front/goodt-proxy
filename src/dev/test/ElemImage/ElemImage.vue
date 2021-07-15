<template>
    <img :class="cssClass" :style="cssStyle" :src="imageURL" />
</template>
<script>
import { Elem } from '@goodt-wcore/core';
import { descriptor } from './descriptor';

const placeholderImageBase64 =
    'data:image/jpeg;base64,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';

/**
 * @typedef {import('./ElemImage').IComponentOptions} IComponentOptions
 * @typedef {import('./ElemImage').IInstance} IInstance
 */

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Elem,
    data() {
        return {
            descriptor: descriptor()
        };
    },
    computed: {
        /**
         * @return {string}
         */
        imageURL() {
            const url = this.$c(this.props.url);
            return this.isEditorMode ? url || placeholderImageBase64 : url;
        }
    },
    methods: {
        isChildAllowed(type) {
            return false;
        },
        getSlotNames() {
            return [];
        },
        getPanels() {
            return [import('./panels/OptionsPanel.vue')];
        },
        genCssClass() {
            this.super(Elem).genCssClass.call(this);
            this.$set(this.cssClass, 'responsive', this.props.responsive);
        }
    }
});
</script>
