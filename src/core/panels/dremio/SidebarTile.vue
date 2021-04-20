<template>
    <div class="tile d-flex flex-col" :class="{ 'flex-grow': open }">
        <div
            class="pad-l1 u-select-none"
            :class="{ 'color-primary': open, 'cursor-pointer': toggleEnabled }"
            @click="onHeaderClick"
        >
            <div class="row row-collapse">
                <div class="col col-vmid col-auto">
                    <div class="mar-right-3">
                        <slot name="icon">
                            icon
                        </slot>
                    </div>
                </div>
                <div class="col col-vmid">
                    <slot name="title">
                        title
                    </slot>
                </div>
                <div v-if="toggleEnabled" class="col col-vmid col-auto">
                    <div class="icon">
                        <i
                            class="mdi mdi-18px"
                            :class="[open ? 'mdi-chevron-up' : 'mdi-chevron-down']"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="open" class="pos-rel flex-grow" style="min-height: 350px;">
            <hr />
            <slot name="content">
                <div class="pad-l1">
                    content
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        },
        toggleEnabled: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onHeaderClick() {
            this.toggleEnabled && this.$emit('toggle');
        }
    }
};
</script>
