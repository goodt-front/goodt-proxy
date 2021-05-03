<template>
    <div>
        <ui-has-panel v-for="variable in varsInfo" :key="variable.name" class="pad-v-1">
            <ui-checkbox
                v-model.lazy="variable.alias.meta.global"
                :disabled="!variable.alias.listen && !variable.alias.trigger"
                :title="variable.alias.meta.global ? 'global' : 'local'"
                @change="exportAliases"
            >
                <span :title="variable.description">{{ variable.name }}</span>
                <template #helper>
                    <div
                        class="mdi mdi-arrow-down pull-left"
                        :class="{ 'text-muted': !variable.alias.listen }"
                        :title="`listen: ${variable.alias.listen}`"
                    />
                    <div
                        class="mdi mdi-arrow-up pull-left"
                        :class="{ 'text-muted': !variable.alias.trigger }"
                        :title="`trigger: ${variable.alias.trigger}`"
                    />
                </template>
            </ui-checkbox>
            <template #panel>
                <ui-panel :groups="[{ name: variable.name, slot: 'default' }]">
                    <div v-if="variable.name != variable.description" class="text-small p">
                        {{ variable.description }}
                    </div>
                    <ui-input
                        v-model.lazy="variable.alias.listen"
                        class="p"
                        @change="exportAliases"
                    >
                        Listen
                        <i class="mdi mdi-arrow-down" />
                    </ui-input>
                    <ui-input v-model.lazy="variable.alias.trigger" @change="exportAliases">
                        Trigger
                        <i class="mdi mdi-arrow-up" />
                    </ui-input>
                </ui-panel>
            </template>
        </ui-has-panel>
    </div>
</template>
<script>
import isEqual from 'lodash/isEqual';
import Panel from '../Panel.vue';
import { ValueObject } from '../managers/StoreManager';

/**
 * Var alias factory
 * @return {ElemVarAliasDef}
 */
const varAlias = ({ listen = '', trigger = '', meta = null }) => ({
    listen,
    trigger,
    meta: meta || ValueObject.defaultMeta()
});

export default {
    extends: Panel,
    props: {
        varsDescriptor: {
            default() {
                return {};
            }
        }
    },
    computed: {
        varsInfo() {
            const { varsDescriptor } = this;
            const { varAliases } = this.props;
            const arr = [];
            for (const name in varsDescriptor) {
                const alias = varAlias(varAliases[name] || {});
                arr.push({ name, ...varsDescriptor[name], alias });
            }
            return arr.sort((a, b) => {
                const i = a.sortIndex || 0;
                const j = b.sortIndex || 0;
                return i - j;
            });
        }
    },
    methods: {
        exportAliases() {
            const aliases = {};
            this.varsInfo.forEach(({ name, alias }) => {
                const { listen, trigger, meta } = alias;
                const obj = {};
                // no lister,trigger -> ignore
                if (!listen && !trigger) {
                    return;
                }
                listen && (obj.listen = listen);
                trigger && (obj.trigger = trigger);
                // meta defers from default -> save
                if (!isEqual(meta, ValueObject.defaultMeta())) {
                    obj.meta = meta;
                }
                aliases[name] = obj;
            });
            this.props.varAliases = aliases;
            this.propChanged('varAliases');
        }
    }
};
</script>
