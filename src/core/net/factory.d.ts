import { ITransportFactory, ITransportFactoryOptions } from './types';

export const HttpTransportSymbol: symbol;
export const HttpAuthTransportSymbol: symbol;

export const TransportFactoryMap: Map<symbol, ITransportFactory>;
export function createTransport(
    transportId: symbol,
    ...options: ITransportFactoryOptions
): ReturnType<ITransportFactory>;
