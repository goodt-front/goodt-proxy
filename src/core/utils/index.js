/**
 *
 * @param {Record<string, unknown>} object
 * @param {function([string, unknown]): boolean} filterFn
 * @return {Record<string, unknown>}
 */
export const filterObject = (object, filterFn) =>
    Object.fromEntries(Object.entries(object).filter(filterFn));

export * from './descriptor';
