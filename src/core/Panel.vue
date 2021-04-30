<script>
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import Elem from './Elem.vue';
import { PanelUi } from './components/index';
import { getDescriptorDefaultProps } from './utils';

const descriptor = { ...Elem.data().descriptor };

/**
 * Panel events
 * @enum {string}
 */
const PanelEvent = {
    PROPS_CHANGE: 'props-change'
};
export { PanelEvent };

/**
 * @typedef {Object} PanelMetaData
 * @property {String} name      panel name
 * @property {String} icon      mdi icon class
 */
export default {
    components: { ...PanelUi },
    props: {
        /** elem component instance reference */
        elementInstance: {
            type: Object
        },
        /** elem instance props { key:value } */
        initProps: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            /** @type {PanelMetaData} panel meta data (used by the editor env) */
            $meta: { name: '', icon: '' },
            /** @muttable elem instance props { key:value } */
            props: {},
            /** @type {ElemDescriptor} elem descriptor */
            descriptor
        };
    },
    computed: {
        /**
         * @return {object}
         */
        propsDefault() {
            return getDescriptorDefaultProps(this.descriptor);
        }
    },
    watch: {
        initProps: {
            handler(val) {
                this.props = { ...this.propsDefault, ...cloneDeep(val) };
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        /**
         * Notifies env that the 'props' object has changed (used by the editor env)
         * @param {?String} [propName=null]     property to update from the 'props' object or null to replace the whole 'props' object
         */
        propChanged(propName = null) {
            const { props, propsDefault } = this;
            const propsDif = Object.keys(propsDefault).reduce((obj, key) => {
                if (!isEqual(propsDefault[key], props[key])) {
                    obj[key] = props[key];
                }
                return obj;
            }, {});

            this.$emit(
                PanelEvent.PROPS_CHANGE,
                propsDif,
                typeof propName === 'string' ? propName : null
            );
        }
    }
};
</script>
