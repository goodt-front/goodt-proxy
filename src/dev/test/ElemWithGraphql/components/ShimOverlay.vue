<template functional>
    <div class="shim">
        <div class="shim-overlay"></div>
        <div class="shim-content d-flex flex-center h-100">
            <h3 v-if="props.message" class="last">{{ props.message }}</h3>
            <template v-else>
                <div class="preloader"></div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    functional: true,
    props: {
        message: {
            type: String,
        },
    }
};
</script>
