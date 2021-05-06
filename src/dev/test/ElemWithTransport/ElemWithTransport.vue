<template>
    <section>
        <h1>Transport</h1>
        <div>BaseURL: {{ transportBaseUrl }}</div>
    </section>
</template>
<script>
import { Elem } from '@goodt/core';
import { useTransport, HttpTransportSymbol } from '@goodt/core/mixins/useTransport';

/**
 * useTransport example
 */
const { mixin: TransportMixin } = useTransport(HttpTransportSymbol, {
    options() {
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
    data() {
        return {
            descriptor: descriptor()
        };
    },
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
