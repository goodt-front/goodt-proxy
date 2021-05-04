<template>
    <div class="mar-v-l1">
        <div class="row">
            <div class="col">
                <widget-render v-bind="renderOpts" v-if="renderOpts"></widget-render>
            </div>
            <div class="col col-auto">
                <div class="tile scroll-y h-100" :style="panelSidebarStyle">
                    <div class="tile-body">
                        <div class="p cf">
                            <code class="pull-left text-truncate" :title="elemType">
                                {{ elemType }}
                            </code>
                        </div>
                        <!-- {elem panels} -->
                        <ui-collapse class="p" v-for="(p, k) in panels" :key="`${elemType}-${k}`">
                            <template #header>{{ p.meta.name }}</template>
                            <component
                                :is="p.def"
                                :init-props="elemProps"
                                :element-instance="elemInstance"
                                @[panelEvent]="onPanelPropsChange"
                            ></component>
                        </ui-collapse>
                        <!-- {/elem panels} -->
                        <!-- {defaults} -->
                        <ui-collapse class="p">
                            <template #header>Style</template>
                            <style-panel
                                :init-props="elemProps"
                                @[panelEvent]="onPanelPropsChange"
                            ></style-panel>
                        </ui-collapse>
                        <ui-collapse class="p">
                            <template #header>Vars</template>
                            <variable-panel
                                :vars-descriptor="elemDescriptor.vars"
                                :init-props="elemProps"
                                @[panelEvent]="onPanelPropsChange"
                            ></variable-panel>
                        </ui-collapse>
                        <!-- {/defaults} -->
                        <ui-collapse class="p">
                            <template #header>elem.props</template>
                            <pre class="pre text-xsmall">{{ elemProps }}</pre>
                        </ui-collapse>
                        <ui-collapse>
                            <template #header>elem.descriptor</template>
                            <pre class="pre text-xsmall">{{ elemDescriptor }}</pre>
                        </ui-collapse>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep';
import { ElemEvent } from '../Elem.vue';
import { PanelEvent } from '../Panel.vue';
import { UiCollapse } from '../components/panel-ui/index';
import { StylePanel, VariablePanel } from '../panels/index';
import WidgetRender from './WidgetRender.vue';

let ID = 0;

/**
 * @typedef {object} ElemInfo
 * @property {string} type
 * @property {object} props
 * @property {string|import('vue').Component|import('vue').AsyncComponent} component
 * @property {ElemInfo[]} children
 */
export default {
    name: 'WidgetPreview',
    components: { UiCollapse, StylePanel, VariablePanel, WidgetRender },
    props: {
        /** @type {import('vue').PropOptions<ElemInfo>} */
        elem: {
            type: Object,
            default: null
        },
        panelSidebarStyle: {
            type: Object,
            default() {
                return { width: '22rem', 'max-height': '100vh' };
            }
        },
        isEditorMode: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            elemInstance: null,
            elemDescriptor: {},
            elemProps: {},
            panels: [],
            panelEvent: PanelEvent.PROPS_CHANGE
        };
    },
    computed: {
        /**
         * @return {string}
         */
        elemType() {
            const { elem } = this;
            return elem ? elem.type : '';
        },
        /**
         * @return {object}
         */
        renderOpts() {
            const { elem, elemProps, onElemMounted, isEditorMode } = this;
            if (!elem) {
                return null;
            }
            const { type, children, component } = this.elem;
            const id = this.getElemNextId();
            /** @param {ElemInfo} child */
            const patch = (child) => ({
                ...child,
                id: this.getElemNextId(),
                children: child.children.map(patch)
            });
            return {
                elem: {
                    id,
                    type,
                    props: elemProps,
                    children: children.map(patch),
                    component
                },
                dataAddons: {
                    on: {
                        [ElemEvent.MOUNTED]: onElemMounted
                    }
                },
                isEditorMode
            };
        }
    },
    watch: {
        elemType: {
            handler(val) {
                if (val) {
                    this.elemProps = cloneDeep(this.elem.props);
                }
            },
            immediate: true
        }
    },
    methods: {
        reset() {
            this.elemInstance = null;
            this.elemDescriptor = {};
            this.elemProps = {};
            this.panels = [];
        },
        getElemNextId() {
            ID += 1;
            return `demo-${ID}`;
        },
        onElemMounted(ci) {
            this.elemInstance = ci;
            this.elemDescriptor = ci.descriptor;

            Promise.all(ci.getPanels()).then((m) => {
                this.panels = m.map((mi) => ({ def: mi.default, meta: mi.default.data().$meta }));
            });
        },
        onPanelPropsChange(newProps, propName = null) {
            if (propName != null && Object.prototype.hasOwnProperty.call(newProps, propName)) {
                this.$set(this.elemProps, propName, newProps[propName]);
            } else {
                this.elemProps = newProps;
            }
        }
    }
};
</script>
