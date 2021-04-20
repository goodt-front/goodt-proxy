<template>
    <div>
        <div class="p d-flex pad-1">
            <template v-if="groups.length > 1">
                <div
                    v-for="(g, i) in groups"
                    :key="i"
                    class="btn btn-small flex-grow"
                    :class="[i == activeIndex ? 'btn-primary' : 'btn-ghost']"
                    :style="{ width: `${(1 / groups.length) * 100}%` }"
                    @click="activeIndex = i"
                >
                    <div class="text-truncate">
                        {{ g.name }}
                    </div>
                </div>
            </template>
            <template v-else>
                {{ groups[0].name }}
            </template>
        </div>
        <div class="content pad-1">
            <slot :name="activeSlot" />
        </div>
    </div>
</template>
<style lang="less" scoped>
.content {
    max-height: 50vh;
    overflow: auto;
}
</style>
<script>
export default {
    props: {
        /**
         * Defines slotted groups of the panel Array.[Object] ~ [ { name:<group-name>, slot:<group-content-slot-name> } ]
         */
        groups: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return { activeIndex: 0 };
    },
    computed: {
        activeSlot() {
            return this.groups[this.activeIndex].slot;
        }
    }
};
</script>
