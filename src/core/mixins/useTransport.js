import { createTransport } from '../net';
import './types';

export { HttpTransportSymbol, HttpAuthTransportSymbol } from '../net';

const PUBLIC_ACCESSOR_NAME = '$transport';
const PRIVATE_ACCESSOR_NAME = Symbol('$transport');

/**
 * @typedef {import('vue/types/vue').Vue} VueInstance
 * @typedef {Record<string, unknown>} UseTransportOptions
 * @property {string} [name='$state'] instance property name
 * @property {TransportConfig} [options={}] instance property name
 */

/**
 * @typedef {VueInstance} TransportMixinInstance
 * @property {ITransport} $transport transport instance
 */

/**
 * @typedef {ComponentOptions|VueInstance} TransportMixin
 */

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 *
 * @type {import('./useTransport').useTransport}
 */
export const useTransport = (transportId, useOptions = {}) => {
    /**
     * @member {(function(*): TransportConfig|TransportConfig)} options
     * @member {string|symbol} name
     */
    const { name: $transport = PUBLIC_ACCESSOR_NAME, options: transportOptions } = useOptions;

    /**
     * @this {VueInstance}
     * @return {ITransport}
     */
    function createTransportInstance(vm) {
        const transportOptionsResolved =
            typeof transportOptions === 'function' ? transportOptions(vm) : transportOptions;

        return createTransport(transportId, transportOptionsResolved);
    }

    /**
     * @type {TransportMixin}
     */
    const VueMixinComponentOptions = {
        computed: {
            /**
             * @this {VueInstance}
             */
            [$transport]() {
                if (!this[PRIVATE_ACCESSOR_NAME]) {
                    this[PRIVATE_ACCESSOR_NAME] = createTransportInstance(this);
                }
                return this[PRIVATE_ACCESSOR_NAME];
            }
        },
        /**
         * @this {VueInstance}
         */
        destroyed() {
            if (this[PRIVATE_ACCESSOR_NAME]) {
                this[PRIVATE_ACCESSOR_NAME].dispose();
            }
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};

export default useTransport;
