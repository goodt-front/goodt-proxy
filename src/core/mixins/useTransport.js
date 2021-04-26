import { createTransport } from '../net';
import './types';

export { HttpTransportSymbol, HttpAuthTransportSymbol } from '../net';

const PUBLIC_ACCESSOR_NAME = '$transport';
const PRIVATE_ACCESSOR_NAME = Symbol('$transport');

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
    const { name: $transport = PUBLIC_ACCESSOR_NAME, options: transportOptions } = useOptions;

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
            [$transport]() {
                if (!this[PRIVATE_ACCESSOR_NAME]) {
                    this[PRIVATE_ACCESSOR_NAME] = createTransportInstance.call(this);
                }
                return this[PRIVATE_ACCESSOR_NAME];
            }
        },
        /**
         * @this {VueInstance}
         */
        destroyed() {
            if (this[PRIVATE_ACCESSOR_NAME]) {
                this[PRIVATE_ACCESSOR_NAME].cancelAllRequests();
            }
        }
    };

    return {
        mixin: VueMixinComponentOptions
    };
};
