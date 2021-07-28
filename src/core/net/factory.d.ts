import { ITransport } from "./types";

/** @type {symbol} */
export const HttpTransportSymbol: symbol;
/** @type {symbol} */
export const HttpAuthTransportSymbol: symbol;
/**
 * @type {Map<symbol, Function>}
 */
export const TransportFactoryMap: Map<symbol, Function>;

export function createTransport(transportId: symbol, options?: Function | Record<string, any>): ITransport;
