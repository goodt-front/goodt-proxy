<script>
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { getDescriptorDefaultProps } from '../Elem';
import { PanelUi } from '../components';
import { ConstManager } from '../managers';

/**
 * Panel events
 * @enum {string}
 */
const PanelEvent = Object.freeze({
    PROPS_CHANGE: 'props-change'
});

export { PanelEvent };

/**
 * @typedef {object} PanelMetaData
 * @property {string} name      panel name
 * @property {string} icon      mdi icon class
 */

/**
 * @type {import('./Panel').IPanelComponentOptionsInternal}
 */
export default ({
    components: { ...PanelUi },
    props: {
        /** elem component instance reference */
        /** @type {import('vue').PropOptions<import('vue')>} */
        elementInstance: {
            type: Object
        },
        /** elem instance props { key: value } */
        /** @type {import('vue').PropOptions<Record<string, any>>} */
        initProps: {
            type: Object,
            required: true
        },
        /** @type {import('vue').PropOptions<import('@goodt-wcore/core/types').ElemDescriptor>} */
        descriptor: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            /** @type {PanelMetaData} panel meta data (used by the editor env) */
            $meta: { name: '', icon: '' },
            /** @mutable elem instance props { key: value } */
            props: {}
        };
    },
    computed: {
        /**
         * @return {object}
         */
        propsDefault() {
            return getDescriptorDefaultProps(this.descriptor);
        },
        /**
         * @return {object}
         */
        propsMerged() {
            const { propsDefault, initProps } = this;
            return { ...propsDefault, ...initProps };
        },
        /**
         * @NOTE compatibility fix tobe removed
         * @return [string[]]
         */
        envConstantsNames() {
            return Object.keys(ConstManager.instance.getConstantsHash());
        }
    },
    watch: {
        propsMerged: {
            handler(val) {
                this.props = cloneDeep(val);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        /**
         * Notifies env that the 'props' object has changed (used by the editor env)
         *
         * @param {?string|?string[]} [propName=null] property to update from the 'props' object or null to replace the whole 'props' object
         */
        propChanged(propName = null) {
            const { props, propsDefault } = this;
            const propsDif = Object
                .entries(propsDefault)
                .filter(([key, defaultVal]) => !isEqual(defaultVal, props[key]))
                .reduce((obj, [key]) => ({
                    ...obj,
                    [key]: props[key]
                }), {});
            const propNames = [propName].flat().filter(name => propsDefault[name] !== undefined);

            this.$emit(
                PanelEvent.PROPS_CHANGE,
                propsDif,
                propNames
            );
        }
    }
});
</script>
