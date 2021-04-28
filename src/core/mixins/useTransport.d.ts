import { VueConstructor } from 'vue';
import { ITransport } from '../net/types';

type TransportOptions = Record<string, any> | (() => Record<string, any>);

type UseTransportOptions = {
    name: string | symbol;
    options?: TransportOptions;
};

interface TransportMixinComputed {
    $transport: ITransport;
}

declare const HttpTransportSymbol: symbol;

/**
 * Creates Vue Mixin with specified Transport and extra component transport-related behaviour
 * and returns meta object with it
 */
export function useTransport(
    transportId: string | symbol,
    useOptions?: UseTransportOptions = {}
): {
    mixin: VueConstructor<Vue & TransportMixinComputed>;
};
