import Vue from 'vue';
import { ElemDescriptor } from '../../types/core';

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
