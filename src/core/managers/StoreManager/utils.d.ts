/**
 * Builds store value (ValueObject) to keep in state
 * Encapsulates store value type and structure.
 *
 * @param {any} value
 * @param {?ValueObjectMeta} [meta=null]
 * @return {ValueObject}
 */
export function buildStoreValue(value: any, meta?: any): ValueObject;

/**
 * Unwraps value from Store Value (ValueObject)
 *
 * @param {ValueObject} valueObject
 * @return {*}
 */
export function unwrapStoreValue(valueObject: ValueObject): any;

import { ValueObject } from './ValueObject';
