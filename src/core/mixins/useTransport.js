import { createTransport } from '../net';
import './';

export { HttpTransportSymbol, HttpAuthTransportSymbol } from '../net';
export const TransportSymbol = Symbol('Transport');
const INSTANCE_ACCESSOR_NAME = '$transport';

/**
 * @typedef {Object} UseTransportOptions
 * @property {string} [name='$state'] instance property name
 * @property {TransportConfig} [options={}] instance property name
 */

/**
 * @typedef {VueInstance} TransportMixinInstance
 * @property {ITransport} $transport transport instance
 */

/**
 * @typedef {ComponentOptions} TransportMixin
 */

/**
 *
 * @param {symbol} transportId
 * @param {UseTransportOptions} [useOptions={}]
 */
export const useTransport = (transportId, useOptions = {}) => {
    /**
     * @var {(function(*): TransportConfig|TransportConfig)} options
     * @var {string|symbol} name
     */
    const { name: accessorName = INSTANCE_ACCESSOR_NAME, options: transportOptions } = useOptions;

    /**
     * @this {VueInstance}
     * @return {ITransport}
     */
    const createTransportInstance = function() {
        const transportOptionsResolved =
            typeof transportOptions === 'function'
                ? //@ts-ignore
                  transportOptions.call(this)
                : transportOptions;

        return createTransport(transportId, transportOptionsResolved);
    };

    /**
     * @type {TransportMixin}
     * @this {TransportMixinInstance}
     */
    const VueMixinComponentOptions = {
        computed: {
            /**
             * @this {VueInstance}
             */
            [accessorName]() {
                if (!this.$options[TransportSymbol]) {
                    this.$options[TransportSymbol] = createTransportInstance.call(this);
                }
                return this.$options[TransportSymbol];
            }
        },
        /**
         * @this {VueInstance}
         */
        destroyed() {
            if (this.$options[TransportSymbol]) {
                this.$options[TransportSymbol].cancelAllRequests();
            }
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};
