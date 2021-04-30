import Vue from 'vue';
import { ElemDescriptor } from '../types/core';

/**
 * Dispatches Elem Vue Component LC-specific Event
 * via Vue emit mechanism and also DOM events mechanism.
 */
declare function dispatchEventByName(eventName: string);
/**
 * Patches vue component instance root dom element with runtime prop
 * __elem__ refers to self component instance and set constructor-specific extra attributes
 */
declare function patchComponentRootDomElement(context: Vue);
/**
 * Returns descriptor props hash with default values
 */
declare function getDescriptorDefaultProps(descriptor: ElemDescriptor);
/**
 * Returns generated Constructor-specific dom id
 */
declare function getDomId(elemId: string): string;
/**
 * Returns generated Constructor-specific dom id
 */
declare function filterObject<T extends Record<string, unknown>>(
    object: T,
    filterFn: ([key, value]: [string, unknown]) => boolean
): T;
