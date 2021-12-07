import Vue from 'vue';
/**
 * @template {Record<string, any>} T
 * @param {T} state
 * @return {T}
 */
export const reactive = (state) => Vue.observable(state);
