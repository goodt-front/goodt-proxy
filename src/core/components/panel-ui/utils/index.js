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
         * @example 1-12, 2-12, ..., 12-12
         */
        colSize: {
            type: String,
            default: '12-12',
            validation(val) {
                const m = val.match(/^(\d+)-(\d+)$/);
                if (!m) {
                    return false;
                }
                m.shift();
                for (const n of m) {
                    if (n < 1 || n > 12) {
                        return false;
                    }
                }
                return true;
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
        onInput(e) {
            /**
             * Input event
             * @property {any} value
             */
            this.$emit('input', e.target.value);
        },
        onChange(e) {
            /**
             * Change event
             * @property {any} value
             */
            this.$emit('change', e.target.value);
        }
    }
};

const getConstants = () => Object.keys(ConstManager.instance.getConstantsHash());

const isConstant = v => v != null && typeof v === 'string' && !!v.match(/^%([\w-])+%$/);

export { ControlMixin, getConstants, isConstant };
