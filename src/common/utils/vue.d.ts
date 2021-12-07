/**
 * @template {Record<string, any>} T
 * @param {T} state
 * @return {T}
 */
export function reactive<T extends Record<string, any>>(state: T): T;
