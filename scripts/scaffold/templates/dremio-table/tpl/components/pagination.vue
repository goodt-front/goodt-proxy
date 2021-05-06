<template>
    <div>
        <!-- {demo} -->
        <ul class="pagination">
            <li v-if="settings.showArrows && page > 1">
                <a href="#" @click.prevent="selectPage(page - 1)">◄</a>
            </li>
            <li :class="{ active: n === page }" v-for="n in pages" :key="n">
                <a href="#" @click.prevent="selectPage(n)">{{ n }}</a>
            </li>
            <li v-if="settings.showArrows && page < pages">
                <a href="#" @click.prevent="selectPage(page + 1)">►</a>
            </li>
        </ul>
        <!-- {/demo} -->
    </div>
</template>
<script>
export default {
    props: {
        page: {
            type: Number
        },
        pages: {
            type: Number
        },
        settings: {
            type: Object
        }
    },
    methods: {
        selectPage(page) {
            this.$emit('select', page);
        }
    }
};
</script>
