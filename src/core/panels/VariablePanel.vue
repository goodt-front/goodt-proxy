<template>
    <ui-panel-container>
        <ui-has-panel v-for="variable in varsInfo" :key="variable.name" class="pad-v-1">
            <div class="d-flex flex-v-center">
                <template v-if="!variable.alias.listen && !variable.alias.trigger">
                    <i class="mdi mdi-close text-muted"></i>
                </template>
                <template v-else>
                    <i
                        class="mdi cursor-pointer "
                        :class="{
                            'mdi-earth-off color-grey': !variable.alias.meta.global,
                            'mdi-earth color-primary': variable.alias.meta.global
                        }"
                        :title="variable.alias.meta.global ? 'global' : 'local'"
                        @click="toggleAliasMetaGlobal(variable.alias)"
                    ></i>
                </template>
                <div
                    class="mdi mdi-arrow-down pad-left-2"
                    :class="{ 'text-muted': !variable.alias.listen }"
                    :title="`listen: ${variable.alias.listen}`"
                />
                <div
                    class="mdi mdi-arrow-up"
                    :class="{ 'text-muted': !variable.alias.trigger }"
                    :title="`trigger: ${variable.alias.trigger}`"
                />
                <div class="text-small pad-left-2" :title="variable.description">
                    {{ variable.name }}
                </div>
            </div>
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
        },
        /**
         * @param {ElemVarAliasDef} alias
         */
        toggleAliasMetaGlobal(alias) {
            alias.meta.global = !alias.meta.global;
            this.exportAliases();
        }
    }
};
</script>
