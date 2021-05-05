<template>
    <div :class="cssClass" :style="cssStyle">
        <!-- {demo} -->
        <code>{{ type }}</code>
        <div v-if="isEditorMode">running in editor</div>
        <div v-if="result">
            <pre v-for="(item, i) in result.rows" :key="i">{{ item }}</pre>
        </div>
        <div v-if="loading">loading</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="!props.dremio">no dataset selected</div>
        <ul class="pagination" v-if="pages > 1">
            <li v-for="n in pages" :key="n" :class="{ active: n === page }">
                <a href="#" @click.stop="loadDataPage(n)">{{ n }}</a>
            </li>
        </ul>
        <!-- {/demo} -->
    </div>
</template>
<script>
import { Elem, getDescriptorDefaultProps } from '[[{core}]]/core';
import { mixin as DremioMixin, Query } from '[[{core}]]/core/dremio';

const descriptor = () => ({
    props: {
        dremio: {
            type: Object,
            default: null
        }
    },
    vars: {}
});

export default {
    extends: Elem,
    mixins: [DremioMixin],
    props: {
        props: {
            default() {
                return getDescriptorDefaultProps(descriptor());
            }
        }
    },
    data() {
        return {
            descriptor: descriptor(),
            loadDataHooks: {
                before: () => {
                    this.loading = true;
                },
                then: (r) => r,
                catch: (e) => {
                    if (!e.isCancel) {
                        this.error = e;
                    }
                },
                finally: () => {
                    this.loading = false;
                }
            },
            loading: false,
            error: null
        };
    },
    /*
    watch: {
        $storeState(state, prevState) {
            // to be implement watch
        },
        $routeCurrent(route, prevRoute) {
            // to be implement watch
        },
    },
    */
    created() {
        // to be implemented
    },
    mounted() {
        // to be implemented
    },
    destroyed() {
        // to be implemented
    },
    methods: {
        /*
        sampleStoreCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        sampleRouteNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        */
        getSlotNames() {
            return ['default'];
        },
        isChildAllowed(type) {
            return true;
        },
        getPanels() {
            return [import('[[{lib}]]/DremioPanel.vue'), import('./panels/SettingsPanel.vue')];
        },
        subscribe() {
            // call mixin subscribe()
            this.super(DremioMixin).subscribe.call(this);
        },
        loadDataPage(page) {
            this.page = page;
            this.loadData();
        }
    }
};
</script>
