<template>
    <div>
        <ui-input-browse class="p" v-model="props.url" @change="propChanged('url')">
            image url
        </ui-input-browse>
        <ui-switch class="p" v-model="props.responsive" @change="propChanged('responsive')">
            responsive
        </ui-switch>
    </div>
</template>
<script>
import { Panel } from '../../../../core/index';
import ElemImage from '../ElemImage.vue';

let descriptor = ElemImage.data().descriptor;

export default {
    extends: Panel,
    data() {
        return {
            descriptor,
            $meta: { name: 'Настройки виджета', icon: 'widgets' }
        };
    }
};
</script>
