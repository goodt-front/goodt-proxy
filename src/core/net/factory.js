import './types';
import Http from './Http';
import HttpAuth from './HttpAuth';

/**
 *
 * @param {TransportConfig} options
 * @return {Http}
 */
const createHttp = options => new Http(options);

/**
 *
 * @param {TransportConfig} options
 * @return {HttpAuth}
 */
const createHttpAuth = options => new HttpAuth(options);

/** @type {symbol} */
export const HttpTransportSymbol = Symbol();
/** @type {symbol} */
export const HttpAuthTransportSymbol = Symbol();

/**
 * @type {Map<symbol, ITransportFactory>}
 */
const TransportFactoryMap = new Map();
TransportFactoryMap.set(HttpTransportSymbol, createHttp);
TransportFactoryMap.set(HttpAuthTransportSymbol, createHttpAuth);

/**
 * @param {symbol} transportId
 * @param {TransportConfig} options
 * @return {ITransport}
 */
export const createTransport = (transportId, options) => {
    const createTransport = TransportFactoryMap.get(transportId);
    if (!createTransport) {
        throw new Error(
            `Transport constructor with identifier [${transportId.toString()}] not found`
        );
    }
    return createTransport(options);
};
