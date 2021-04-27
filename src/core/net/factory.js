import './types';
import Http from './Http';
import HttpAuth from './HttpAuth';

class TransportFactoryError extends Error {}

/**
 * @implements {ITransportFactory}
 * @param {TransportConfig} options
 * @return {Http}
 */
const createHttp = options => new Http(options);

/**
 * @implements {ITransportFactory}
 * @param {TransportConfig} options
 * @return {HttpAuth}
 */
const createHttpAuth = options => new HttpAuth(options);

/** @type {symbol} */
export const HttpTransportSymbol = Symbol('HttpTransport');
/** @type {symbol} */
export const HttpAuthTransportSymbol = Symbol('HttpAuthTransport');

/**
 * @type {Map<symbol, Function>}
 */
const TransportFactoryMap = new Map();
TransportFactoryMap.set(HttpTransportSymbol, createHttp);
TransportFactoryMap.set(HttpAuthTransportSymbol, createHttpAuth);

/**
 * @param {symbol} transportId
 * @param {Function|Record<string, any>} options
 * @throws {TransportFactoryError}
 * @return {ITransport}
 */
export const createTransport = (transportId, options) => {
    const createTransport = TransportFactoryMap.get(transportId);
    if (!createTransport) {
        throw new TransportFactoryError(
            `Transport factory for specified identifier '${transportId.toString()}' not exist.`
        );
    }

    return createTransport(options);
};
