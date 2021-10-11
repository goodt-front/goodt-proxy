<template>
    <div class="cf" :class="cssClass" :style="cssStyle">
        <slot>
            <code v-if="isEditorMode">default slot</code>
        </slot>
    </div>
</template>
<script>
import Elem from './Elem.vue';

const descriptor = () => ({
    props: {
        height: {
            type: String,
            default: '100'
        }
    }
});

export default {
    extends: Elem,
    data: () => ({ descriptor: descriptor() })
};
</script>
