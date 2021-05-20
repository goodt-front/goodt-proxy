import Vue from 'vue';
import { ElemDescriptor } from '@goodt/core/types';

/**
 * Dispatches Elem Vue Component LC-specific Event
 * via Vue emit mechanism and also DOM events mechanism.
 */
export function dispatchEventByName(eventName: string);
/**
 * Patches vue component instance root dom element with runtime prop
 * __elem__ refers to self component instance and set constructor-specific extra attributes
 */
export function patchComponentRootDomElement(context: Vue);
/**
 * Returns descriptor props hash with default values
 */
export function getDescriptorDefaultProps(descriptor: ElemDescriptor);
/**
 * Returns generated Constructor-specific dom id
 */
export function getElemDomId(elemId: string): string;