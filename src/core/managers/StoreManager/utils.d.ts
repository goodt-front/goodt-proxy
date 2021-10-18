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

/**
 * Automatically creates '$storeState' watchers defined in the '#WATCH_STORE_COMPONENT_OPTION_NAME' block of the target 'vm'
 * @param {IElemInstance} vm  target component
 * @return {function[]} array of watcher disposal functions
 */
export function useWatchStore(vm: ElemInstance): function[];

import { IElemInstance } from '../../Elem';
import { ValueObject } from './ValueObject';
