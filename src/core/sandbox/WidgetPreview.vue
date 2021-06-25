<template>
    <div class="mar-v-l1">
        <div class="row">
            <div class="col">
                <widget-render v-bind="renderOpts" v-if="renderOpts"></widget-render>
            </div>
            <div class="col col-auto" v-if="showPanels">
                <div class="tile scroll-y h-100" :style="panelSidebarStyle">
                    <div class="tile-body">
                        <div class="p cf">
                            <code class="pull-left text-truncate" :title="elemType">
                                {{ elemType }}
                            </code>
                        </div>
                        <!-- {panels} -->
                        <ui-collapse class="p" v-for="(p, k) in panels" :key="`${elemType}-${k}`">
                            <template #header>{{ p.meta.name }}</template>
                            <component
                                :is="p.def"
                                :init-props="elemProps"
                                :descriptor="elemDescriptor"
                                :element-instance="elemInstance"
                                @[panelEvent]="onPanelPropsChange"
                            ></component>
                        </ui-collapse>
                        <!-- {/panels} -->
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
import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { ElemEvent, PanelEvent, Components } from '../index';
import { StylePanelAsync, VariablePanelAsync } from '../panels/index';
import WidgetRender from './WidgetRender.vue';

let ID = 0;

const { UiCollapse } = Components.PanelUi;

/**
 * @param {ElemInfoShort} child
 * @return {import('../render/render').ElemInfo}
 */
const buildElemInfo = (child) => ({
    ...child,
    id: `demo-${ID++}`,
    children: child.children.map(buildElemInfo)
});

/**
 * @typedef {object} ElemInfoShort
 * @property {string} type
 * @property {object} props
 * @property {import('vue/types/options').AsyncComponentFactory} component
 * @property {ElemInfoShort[]} children
 */
/**
 * @typedef {object} RenderOpts
 * @property {import('../render').ElemInfo} elem
 * @property {object} dataAddons
 * @property {boolean} isEditorMode
 */
export default {
    name: 'WidgetPreview',
    components: { UiCollapse, WidgetRender },
    props: {
        /** @type {import('vue').PropOptions<ElemInfoShort>} */
        elem: {
            type: Object,
            default: null
        },
        panelSidebarStyle: {
            type: Object,
            default() {
                return { width: '22rem', 'max-height': '80vh' };
            }
        },
        showPanels: {
            type: Boolean,
            default: true
        },
        isEditorMode: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            /** @type {import('../../core/Elem').Elem} */
            elemInstance: null,
            elemDescriptor: {},
            elemProps: {},
            panels: [],
            panelEvent: PanelEvent.PROPS_CHANGE,
            /** @type {?RenderOpts} */
            renderOpts: null
        };
    },
    computed: {
        /**
         * @return {string}
         */
        elemType() {
            const { elem } = this;
            return elem ? elem.type : '';
        }
    },
    watch: {
        elemType: {
            handler(val) {
                if (val) {
                    const { elem } = this;
                    this.elemProps = cloneDeep(elem.props);
                    this.getElemComponentDescriptor(elem.component).then((descriptor) => {
                        this.elemDescriptor = descriptor;
                        this.renderOpts = this.buildRenderOpts(elem);
                    });
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
        /**
         * @param {ElemInfoShort} elem
         * @return {RenderOpts}
         */
        buildRenderOpts(elem) {
            const elemPatched = buildElemInfo(elem);
            const { props, ...elemAttrs } = elemPatched;
            const { elemProps, onElemMounted, isEditorMode } = this;
            return {
                elem: {
                    ...elemAttrs,
                    props: elemProps
                },
                dataAddons: {
                    on: {
                        [ElemEvent.MOUNTED]: onElemMounted
                    }
                },
                isEditorMode
            };
        },
        /**
         * @param {import('vue/types/options').AsyncComponentFactory} componentFactory
         * @return {Promise<ElemDescriptor>}
         */
        getElemComponentDescriptor(componentFactory) {
            return componentFactory().then((m) => Vue.extend(m.default).options.data().descriptor);
        },
        /**
         *
         * @param {import('@goodt/core/Elem').ElemInstance} ci
         */
        onElemMounted(ci) {
            this.elemInstance = ci;
            const panels = [...ci.getPanels(), StylePanelAsync, VariablePanelAsync].map((panel) =>
                typeof panel === 'function' ? panel() : panel
            );
            Promise.all(panels).then((m) => {
                // widget panels
                this.panels = m.map((mi) => ({
                    def: mi.default,
                    meta: Vue.extend(mi.default).options.data().$meta
                }));
            });
        },
        /**
         *
         * @param {Record<string, any>} newProps
         * @param {?string} [propName=null]
         */
        onPanelPropsChange(newProps, propName = null) {
            if (propName != null && Object.prototype.hasOwnProperty.call(newProps, propName)) {
                this.$set(this.elemProps, propName, newProps[propName]);
                return;
            }
            this.elemProps = newProps;
            // @NOTE set reference as we reassign the props object (for the sake of sandbox)
            // in a real env there's no need for such approach as the arch differs
            // vuex --(props)--> panel --(new props)--> vuex --(new props)--> elem
            this.renderOpts.elem.props = this.elemProps;
        }
    }
};
</script>
