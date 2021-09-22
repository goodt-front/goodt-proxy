<template>
    <ui-panel-container>
        <ui-has-two-columns class="p">
            <template #left>
                <ui-select v-model="props.position" :options="descriptor.props.position.options" @change="propChanged">
                    Position
                </ui-select>
            </template>
            <template #right>
                <ui-select v-model="props.display" :options="descriptor.props.display.options" @change="propChanged">
                    Display
                </ui-select>
            </template>
        </ui-has-two-columns>

        <ui-has-two-columns class="p">
            <template #left>
                <ui-input-units
                    v-model="widthWithUnit"
                    :units="widthUnits"
                    :options="descriptor.props.width.options"
                    @change="propChanged"
                >
                    Width
                </ui-input-units>
            </template>
            <template #right>
                <ui-input-units
                    v-model="heightWithUnit"
                    :units="heightUnits"
                    :options="descriptor.props.height.options"
                    @change="propChanged"
                >
                    Height
                </ui-input-units>
            </template>
        </ui-has-two-columns>

        <ui-collapse class="p">
            <template #header>
                Margin
            </template>
            <div class="grid-3-3 flex-center">
                <ui-select
                    v-for="dir in directions"
                    :key="`margin-${dir.id}`"
                    v-model="props[`margin${dir.id.toUpperCase()}`]"
                    :options="marginOptions"
                    :style="{ 'grid-area': dir.id }"
                    @change="propChanged"
                    @focusin.native="marginDirectionId = dir.id"
                    @focusout.native="marginDirectionId = null"
                />
                <div class="box" :data-dir="marginDirectionId" style="grid-area: c" />
            </div>
        </ui-collapse>

        <ui-collapse class="p">
            <template #header>
                Padding
            </template>
            <div class="grid-3-3 flex-center">
                <ui-select
                    v-for="dir in directions"
                    :key="`padding-${dir.id}`"
                    v-model="props[`padding${dir.id.toUpperCase()}`]"
                    :options="paddingOptions"
                    :style="{ 'grid-area': dir.id }"
                    @change="propChanged"
                    @focusin.native="paddingDirectionId = dir.id"
                    @focusout.native="paddingDirectionId = null"
                />
                <div class="box" :data-dir="paddingDirectionId" style="grid-area: c" />
            </div>
        </ui-collapse>

        <ui-input-tags v-model="props.cssClass" class="p" v-bind="{ delimiter: ' ' }" @change="propChanged">
            Css class
            <template #tag="{ tag, remove }">
                <ui-badge
                    class="mar-right-1 mar-bot-1"
                    v-bind="{ size: 'xsmall', theme: 'primary', removable: true }"
                    @remove="remove(tag)"
                >
                    {{ tag }}
                </ui-badge>
            </template>
        </ui-input-tags>

        <ui-input-tags ref="cssstyle" v-model="cssStyles" class="p" v-bind="{ delimiter: ';' }" @change="propChanged">
            Css style
            <template #tag="{ tag, remove, setNewTag }">
                <ui-badge
                    class="mar-right-1 mar-bot-1"
                    v-bind="{ size: 'xsmall', theme: 'primary', removable: true }"
                    @remove="remove(tag)"
                >
                    <span
                        class="cursor-pointer nobr pad-right-2"
                        style="align-self: flex-start"
                        @click="setNewTag(tag)"
                    >
                        {{ getStyleDefObj(tag).key }}:
                    </span>
                    {{ getStyleDefObj(tag).value }}
                </ui-badge>
            </template>
        </ui-input-tags>

        <ui-select
            class="p"
            v-model="props.slot"
            v-bind="{ options: slotNames, valueField: null, labelField: null }"
            @change="propChanged"
        >
            Render slot
        </ui-select>

        <ui-collapse>
            <template #header>Css variables</template>
            <ui-input
                :class="{ p: i < cssVars.length - 1 }"
                v-for="({ name, value, valueDefault, description }, i) in cssVars"
                v-bind="{ placeholder: valueDefault, value, key: name, colSize: '8-12' }"
                @change="(val) => setCssVar(name, val, valueDefault)"
            >
                <div :title="description">{{ name }}</div>
            </ui-input>
        </ui-collapse>
    </ui-panel-container>
</template>
<style lang="less" scoped>
.grid-3-3 {
    display: grid;
    grid-template-areas: '. t .' 'l c r' '. b .';
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacer2);
    .box {
        position: relative;
        height: 100%;
        transition: border 0.1s ease;
        border: 1px solid var(--color-border);
        @b: 0.25rem solid var(--color-primary);
        &[data-dir='l'] {
            border-left: @b;
        }
        &[data-dir='r'] {
            border-right: @b;
        }
        &[data-dir='t'] {
            border-top: @b;
        }
        &[data-dir='b'] {
            border-bottom: @b;
        }
    }
}
.badge {
    white-space: normal;
}
</style>
<script>
import { Badge as UiBadge } from 'goodteditor-ui';
import { Panel } from '../Panel';

export default {
    components: { UiBadge },
    extends: Panel,
    props: {
        slotNames: {
            default() {
                return ['default'];
            }
        }
    },
    data() {
        return {
            $meta: { name: 'Style', icon: '' },
            marginDirectionId: '',
            paddingDirectionId: '',
            directions: [
                { id: 't', pos: 'pos-top-center', icon: 'mdi-arrow-collapse-up' },
                { id: 'b', pos: 'pos-bot-center', icon: 'mdi-arrow-collapse-down' },
                { id: 'l', pos: 'pos-left-center', icon: 'mdi-arrow-collapse-left' },
                { id: 'r', pos: 'pos-right-center', icon: 'mdi-arrow-collapse-right' }
            ],
            test: ''
        };
    },
    computed: {
        marginOptions() {
            return this.descriptor.props.marginT.options;
        },
        paddingOptions() {
            return this.descriptor.props.paddingT.options;
        },
        widthUnits() {
            return this.descriptor.props.widthUnit.options.map(({ value }) => value).filter((v) => !!v);
        },
        heightUnits() {
            return this.descriptor.props.heightUnit.options.map(({ value }) => value);
        },
        widthWithUnit: {
            get() {
                const { width, widthUnit } = this.props;
                return `${width}${widthUnit}`;
            },
            set(v) {
                const a = String(v).match(/^([\d.-]*)([a-z%]+)$/i);
                const [_, n, u] = a || [];
                this.props.width = n == null ? v : n;
                this.props.widthUnit = u == null ? '' : u;
            }
        },
        heightWithUnit: {
            get() {
                const { height, heightUnit } = this.props;
                return `${height}${heightUnit}`;
            },
            set(v) {
                const a = String(v).match(/^([\d.-]*)([a-z%]+)$/i);
                const [_, n, u] = a || [];
                this.props.height = n == null ? v : n;
                this.props.heightUnit = u == null ? '' : u;
            }
        },
        cssStyles: {
            get() {
                const { cssStyle = {} } = this.props;
                const a = [];
                for (const k in cssStyle) {
                    a.push(`${k}: ${cssStyle[k]}`);
                }
                return a.sort();
            },
            set(v) {
                const obj = v
                    .filter((v) => v !== '')
                    .reduce((acc, el) => {
                        const obj = this.getStyleDefObj(el);
                        if (obj) {
                            acc[obj.key] = obj.value;
                        }
                        return acc;
                    }, {});
                this.props.cssStyle = obj;
            }
        },
        cssVars() {
            const { cssVars } = this.descriptor;
            const { cssVars: cssVarsValues } = this.props;
            return Object.entries(cssVars).map(([name, { default: f, description }]) => ({
                name,
                value: cssVarsValues[name] || '',
                valueDefault: typeof f === 'function' ? f() : f,
                description
            }));
        }
    },
    methods: {
        getStyleDefObj(def) {
            const [key, value] = def.split(':');
            return value != null ? { key: key.trim(), value: value.trim() } : null;
        },
        setCssVar(name, value, valueDefault) {
            const propName = 'cssVars';
            if (value === '' || value == valueDefault) {
                this.$delete(this.props[propName], name);
            } else {
                this.$set(this.props[propName], name, value);
            }
            this.propChanged(propName);
        }
    }
};
</script>
