<template>
    <ui-panel-container>
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
    </ui-panel-container>
</template>
<script>
import isEqual from 'lodash/isEqual';
import { Panel } from '../Panel';
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
    data() {
        return { $meta: { name: 'Variables', icon: '' } };
    },
    computed: {
        /**
         * @return {{ name:string, alias:ElemVarAliasDef, description:string }[]}
         */
        varsInfo() {
            const varsInstance = this.elementInstance?.descriptor.vars ?? {};
            const vars = { ...this.descriptor.vars, ...varsInstance };
            const { varAliases } = this.props;
            const arr = [];
            for (const name in vars) {
                const alias = varAlias(varAliases[name] || {});
                arr.push({ name, ...vars[name], alias });
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
