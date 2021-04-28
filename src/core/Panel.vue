<script>
import cloneDeep from 'lodash/cloneDeep';
import Elem from './Elem.vue';
import { PanelUi } from './components';

const { descriptor } = Elem.data();

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
    watch: {
        initProps: {
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
         * @param {?String} [propName=null]     property to update from the 'props' object or null to replace the whole 'props' object
         */
        propChanged(propName = null) {
            propName = typeof propName === 'string' ? propName : null;
            this.$emit('change', this.props, propName);
        }
    }
};
</script>
