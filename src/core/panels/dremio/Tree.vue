<template>
    <div>
        <tree-node
            v-for="entity in entities"
            :key="entity.id"
            :get-entity="getEntity"
            :select-dataset="selectDataset"
            :entity="entity"
        />
        <div v-if="loading" class="shim">
            <div class="shim-overlay" />
            <div class="shim-content d-flex flex-v-center flex-h-center h-100">
                <div class="preloader pad-l1 color-primary" />
            </div>
        </div>
    </div>
</template>
<script>
import TreeNode from './TreeNode.vue';

export default {
    components: {
        TreeNode
    },
    props: {
        entities: {
            type: Array,
            default() {
                return [];
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        getEntity: {
            type: Function,
            default: () => Promise.resolve({})
        },
        selectDataset: {
            type: Function,
            default: entity => Promise.resolve({})
        }
    }
};
</script>
