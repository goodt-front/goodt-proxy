/**
 * Decorates initial object with proxy to missing props and methods
 *
 * @param {any} initial
 * @param {any} delegate
 * @return {ProxyHandler<Record<string, any>>}
 */
export const decorateObjectWithProxy = (initial, delegate) => {
    const proxyHandler = {
        // eslint-disable-next-line no-shadow
        get(target, propKey) {
            const realTarget = propKey in target ? target : delegate;
            const propValue = realTarget ? realTarget[propKey] : undefined;

            return typeof propValue === 'function' ? propValue.bind(target) : propValue;
        },
        set(target, propKey, value) {
            const realTarget = propKey in target ? target : delegate;
            Reflect.set(realTarget, propKey, value);

            return true;
        },
        has(target, propKey) {
            return Reflect.has(target, propKey);
        }
    };

    return new Proxy(initial, proxyHandler);
};
