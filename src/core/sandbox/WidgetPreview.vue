<template>
    <div class="mar-v-l1">
        <div class="row">
            <div class="col">
                <component
                    :is="elemDef"
                    :id="id"
                    :type="type"
                    :props="elemProps"
                    :is-editor-mode="true"
                    @[ELEM_EVENT_MOUNTED]="onElemMounted"
                ></component>
            </div>
            <div class="col col-auto">
                <div class="tile scroll-y h-100" :style="panelSidebarStyle">
                    <div class="tile-body">
                        <div class="p cf">
                            <code class="pull-left text-truncate" :title="type">{{ type }}</code>
                        </div>
                        <ui-collapse class="p" v-for="(p, k) in panels" :key="`${type}-${k}`">
                            <template #header>{{ p.meta.name }}</template>
                            <component
                                :is="p.def"
                                :init-props="elemProps"
                                :element-instance="elemInstance"
                                @change="onPanelChange"
                            ></component>
                        </ui-collapse>
                        <ui-collapse class="p">
                            <template #header>Style</template>
                            <style-panel
                                :init-props="elemProps"
                                @change="onPanelChange"
                            ></style-panel>
                        </ui-collapse>
                        <ui-collapse class="p">
                            <template #header>Vars</template>
                            <variable-panel
                                :vars-descriptor="elemDescriptor.vars"
                                :init-props="elemProps"
                                @change="onPanelChange"
                            ></variable-panel>
                        </ui-collapse>
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
import { ElemEvent, getDescriptorDefaultProps } from '../';
import { UiCollapse } from '../components/panel-ui';
import { StylePanel, VariablePanel } from '../panels';

let ID = 0;
export default {
    name: 'WidgetPreview',
    components: { UiCollapse, StylePanel, VariablePanel },
    props: {
        elem: {
            type: Promise,
            default() {
                return null;
            }
        },
        type: {
            type: String,
            default: ''
        },
        props: {
            type: Object,
            default() {
                return {};
            }
        },
        panelSidebarStyle: {
            type: Object,
            default() {
                return { width: '22rem', 'max-height': '100vh' };
            }
        }
    },
    data() {
        return {
            elemDef: null,
            elemInstance: null,
            elemProps: {},
            elemDescriptor: {},
            panels: [],
            ELEM_EVENT_MOUNTED: ElemEvent.MOUNTED
        };
    },
    computed: {
        id() {
            return `demo-${ID++}`;
        }
    },
    watch: {
        type: {
            handler(val) {
                const { elem } = this;
                if (!elem) {
                    this.reset();
                    return;
                }
                elem.then(m => {
                    const data = Vue.extend(m.default).options.data();
                    const { descriptor } = data;
                    const propsDefault = getDescriptorDefaultProps(descriptor);
                    this.elemDef = m.default;
                    this.elemProps = { ...propsDefault, ...this.props };
                    this.elemDescriptor = descriptor;
                });
            },
            immediate: true
        }
    },
    methods: {
        reset() {
            this.elemDef = null;
            this.elemInstance = null;
            this.elemProps = {};
            this.elemDescriptor = {};
            this.panels = [];
        },
        onElemMounted(ci) {
            this.elemInstance = ci;
            Promise.all(ci.getPanels()).then(m => {
                this.panels = m.map(mi => ({ def: mi.default, meta: mi.default.data().$meta }));
            });
        },
        onPanelChange(newProps, propName = null) {
            if (propName != null && Object.prototype.hasOwnProperty.call(newProps, propName)) {
                this.$set(this.elemProps, propName, newProps[propName]);
            } else {
                this.elemProps = newProps;
            }
        }
    }
};
</script>
