/**
 * @todo: Possibly move functionality close to presentation level,
 * @todo to `useStore`'s structure / store's $storeState $storeCommit responsibility holder/provider
 */
import { ValueObject, createValueObject } from './ValueObject';
import { useWatchStore } from './WatchStore';
/**
 * Builds store value (ValueObject) to keep in state
 * Encapsulates store value type and structure.
 *
 * @param {any} value
 * @param {?import('.').ValueObjectMeta} [meta=null]
 * @return {ValueObject}
 */
const buildStoreValue = (value, meta = null) => (value instanceof ValueObject ? value : createValueObject(value, meta));

/**
 * Unwraps value from Store Value (ValueObject)
 *
 * @param {ValueObject} valueObject
 * @return {*}
 */
const unwrapStoreValue = (valueObject) => ValueObject.getValue(valueObject);

export { buildStoreValue, unwrapStoreValue, useWatchStore };
