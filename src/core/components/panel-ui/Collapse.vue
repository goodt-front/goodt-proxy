<template>
    <ui-collapse class="collapse pos-rel radius" :visible="open">
        <template #heading="{ isOpen, toggle }">
            <div
                class="collapse-header radius pad-v-2 pad-h-l1 cursor-pointer bg-white u-select-none"
                :class="{ open: isOpen }"
                @click="toggle"
            >
                <div class="row row-collapse">
                    <div class="col col-vmid text-small text-truncate">
                        <!--
                        @slot header slot
                        -->
                        <slot name="header" />
                    </div>
                    <div class="col col-auto col-vmid">
                        <div class="icon w-auto pull-left">
                            <i class="mdi mdi-chevron-right" :class="{ 'mdi-rotate-90': isOpen }" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="pad-l1">
                <!--
                @slot content slot
                -->
                <slot />
            </div>
        </template>
    </ui-collapse>
</template>
<style lang="less" scoped>
.collapse {
    border: 1px solid var(--color-grey-light);
    &-header {
        position: sticky;
        top: 0;
        z-index: 1;
        overflow: hidden;
        &:before {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            background: var(--color-primary-focus);
            transition: all 0.2s ease;
            content: '';
        }
        &.open {
            color: var(--color-primary);
            &:before {
                opacity: 1;
            }
        }
    }
}
</style>
<script>
import { Collapse as UiCollapse } from 'goodteditor-ui';

export default {
    components: { UiCollapse },
    props: {
        /**
         * Whether the collapse is 'open'
         */
        open: {
            type: Boolean,
            default: false
        }
    }
};
</script>
