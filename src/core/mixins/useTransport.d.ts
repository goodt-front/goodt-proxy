import { VueConstructor } from 'vue';
import { ITransport } from '../net/types';

export type TransportOptions = Record<string, any> | (() => Record<string, any>);

type UseTransportOptions = {
    name?: string | symbol;
    options?: TransportOptions;
};

interface TransportMixinComputed {
    $transport: ITransport;
}

export interface ITransportMixinInstance extends TransportMixinComputed {}
export interface ITransportMixin extends VueConstructor<Vue & ITransportMixinInstance> {}

declare const HttpTransportSymbol: symbol;
declare const HttpAuthTransportSymbol: symbol;

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useTransport(
    transportId: string | symbol,
    useOptions?: UseTransportOptions = {}
): {
    mixin: ITransportMixin;
};
