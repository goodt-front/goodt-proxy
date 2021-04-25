<template>
    <section>
        <h1>Transport</h1>
        <div>BaseURL: {{ transportBaseUrl }}</div>
    </section>
</template>
<script>
import { Elem } from './../../../core/index';
import { useTransport, HttpTransportSymbol } from './../../../core/mixins/useTransport';

/**
 *
 */
const { mixin: TransportMixin } = useTransport(HttpTransportSymbol, {
    name: '$transport',
    options: function() {
        return {
            baseURL: this.props.apiURL
        };
    }
});

/**
 *
 */
const descriptor = () => ({
    props: {
        apiURL: {
            type: String,
            default: 'https://goodt-dev.goodt.me:8425/api/'
        }
    },
    vars: {}
});

/**
 * @this {VueInstance & TransportMixinInstance}
 * @type {ComponentOptions & TransportMixin}
 */
export default {
    extends: Elem,
    mixins: [TransportMixin],
    computed: {
        /**
         * @this {VueInstance & { $transport: ITransport }}
         * @return {string}
         */
        transportBaseUrl() {
            return this.$transport.getBaseUrl();
        }
    },
    methods: {
        isChildAllowed(type) {
            return false;
        },
        getSlotNames() {
            return [];
        },
        getPanels() {
            return [];
        },
        genCssClass() {
            this.super(Elem).genCssClass.call(this);
        }
    }
};
</script>
