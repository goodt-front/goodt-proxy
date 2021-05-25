import ControlLayout from '../components/ControlLayout.vue';
import ConstManager from '../../../managers/ConstManager';

/*
Slot proxy
<template v-for="(s, name) in slots" v-slot:[name]="scope">
    <slot :name="name" v-bind="scope"></slot>
</template>
*/
const ControlMixin = {
    inheritAttrs: false,
    components: { ControlLayout },
    props: {
        /**
         * @model
         */
        value: {
            type: String,
            default: ''
        },
        /**
         * Column size (12-fraction)
         *
         * @example 1-12, 2-12, ..., 12-12
         */
        colSize: {
            type: String,
            default: '12-12',
            validation(input) {
                const matches = input.match(/^(\d+)-(\d+)$/);
                if (!matches) {
                    return false;
                }
                matches.shift();
                return matches.every((frCount) => frCount >= 1 || frCount <= 12);
            }
        },
        /**
         * Whether the component is invalid
         */
        invalid: {
            type: Boolean,
            default: false
        },
        /**
         * Whether the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        attrs() {
            const { colSize, value, disabled, ...attrs } = this.$attrs;
            return { ...attrs, disabled: this.disabled, value: this.value };
        },
        listeners() {
            const { input, change, ...listeners } = { ...this.$listeners };
            return { ...listeners, input: this.onInput, change: this.onChange };
        },
        controlCl() {
            return { invalid: this.invalid, disabled: this.disabled };
        }
    },
    methods: {
        onInput(event) {
            /**
             * Input event
             *
             * @property {any} value
             */
            this.$emit('input', event.target.value);
        },
        /**
         *
         * @param {Event} event
         */
        onChange(event) {
            this.$emit('change', event.target.value);
        }
    }
};

const getConstants = () => Object.keys(ConstManager.instance.getConstantsHash());

const isConstant = (value) =>
    value != null && typeof value === 'string' && value.match(/^%([\w-])+%$/) !== null;

export { ControlMixin, getConstants, isConstant };
