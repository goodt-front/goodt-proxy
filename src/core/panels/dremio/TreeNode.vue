<template>
    <div class="tree-node">
        <div
            class="tree-node-info pos-rel cursor-pointer pad-v-3 pad-h-3"
            :class="{ 'color-red': error }"
            @click="onNodeClick"
        >
            <div :style="{ 'padding-left': `${15 * level}px` }">
                <div class="row row-collapse">
                    <div class="col col-auto col-vmid">
                        <div
                            class="icon mar-right-2"
                            :title="
                                `type: ${entity.containerType ? entity.containerType : entity.type}`
                            "
                        >
                            <i class="mdi" :class="['mdi-18px', ...icon]" />
                        </div>
                    </div>
                    <div class="col col-vmid text-small text-truncate">
                        <div class="text-truncate">
                            {{ name }}
                        </div>
                    </div>
                    <div class="col col-auto col-vmid">
                        <div v-if="loading" class="preloader" />
                        <div v-else-if="hasChildren" class="icon">
                            <i
                                class="mdi"
                                :class="[open ? 'mdi-chevron-up' : 'mdi-chevron-down']"
                            />
                        </div>
                    </div>
                </div>
                <div
                    v-if="error"
                    class="tree-node-info-error tooltip pos-abs pos-bot pos-offset-bot bg-red events-none"
                >
                    {{ error }}
                </div>
            </div>
        </div>
        <template v-if="open">
            <tree-node
                v-for="child in children"
                :key="child.id"
                :get-entity="getEntity"
                :select-dataset="selectDataset"
                :entity="child"
                :level="level + 1"
            />
        </template>
    </div>
</template>
<style lang="less" scoped>
.tree-node {
    &-info {
        &-error {
            transition: opacity 0.2s;
            opacity: 0;
        }
        &:hover {
            background: var(--color-grey-lighter);
            .tree-node-info-error {
                opacity: 1;
            }
        }
    }
}
</style>
<script>
import trim from 'lodash/trim';

const CONTAINER_TYPE = {
    SOURCE: 'SOURCE'
};
const CATALOG_ENTITY_TYPE = {
    CONTAINER: 'CONTAINER',
    DATASET: 'DATASET',
    FILE: 'FILE'
};

export default {
    name: 'TreeNode',
    props: {
        getEntity: {
            type: Function,
            default: () => Promise.resolve({})
        },
        selectDataset: {
            type: Function,
            default: entity => Promise.resolve({})
        },
        entity: {
            type: Object,
            default() {
                return null;
            }
        },
        level: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            children: [],
            initLoad: true,
            error: null,
            open: false,
            loading: false
        };
    },
    computed: {
        name() {
            let name = this.entity ? this.entity.path[this.entity.path.length - 1] : '';
            return trim(name, '"');
        },
        icon() {
            let type = this.entity ? this.entity.type : '';
            let containerType = this.entity ? this.entity.containerType : '';
            if (this.error) {
                return 'mdi mdi-alert-circle-outline color-red';
            }
            if (containerType == CONTAINER_TYPE.SOURCE) {
                return 'mdi mdi-cube-outline';
            }
            if (type == CATALOG_ENTITY_TYPE.DATASET) {
                return 'mdi-database color-primary';
            }
            if (type == CATALOG_ENTITY_TYPE.CONTAINER) {
                return 'mdi-folder color-grey-dark';
            }
            return 'mdi-help';
        },
        hasChildren() {
            return (
                (this.initLoad || (!this.initLoad && this.children.length)) &&
                this.entity.type == CATALOG_ENTITY_TYPE.CONTAINER
            );
        }
    },
    methods: {
        setOpen(val) {
            this.open = val;
            if (val && !this.children.length) {
                this.getChildren();
            }
        },
        getChildren() {
            this.error = null;
            this.loading = true;
            this.getEntity(this.entity.path)
                .then(result => {
                    if (!result.children) {
                        return;
                    }
                    this.children = result.children.filter(
                        el =>
                            el.type == CATALOG_ENTITY_TYPE.DATASET ||
                            el.type == CATALOG_ENTITY_TYPE.CONTAINER
                    );
                })
                .catch(e => (this.error = e))
                .finally(() => {
                    this.loading = false;
                    this.initLoad = false;
                });
        },
        onNodeClick() {
            if (this.entity.type == CATALOG_ENTITY_TYPE.DATASET) {
                this.selectDataset(this.entity.path);
            } else {
                this.setOpen(!this.open);
            }
        }
    }
};
</script>
