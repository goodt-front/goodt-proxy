<template>
    <div>
        <!-- {demo} -->
        <div><code>message.name:</code> {{ message.name }}</div>
        <div><code>message.value:</code> {{ message.value }}</div>
        <div><code>message.format:</code> {{ message.format() }}</div>
        <div><code>message.style:</code> {{ message.style() }}</div>
        <div><code>test:</code> {{ test }}</div>
        <!-- {/demo} -->
    </div>
</template>
<script>
import RenderMixin from '[[{lib}]]/../ElemDremioTable/renders/render-mixin';

export default {
    mixins: [RenderMixin],
    props: {
        message: {
            type: Object
        },
        // regular vue prop
        test: {
            type: String,
            default: 'Hello world',
            private: true
        }
    }
};
</script>
