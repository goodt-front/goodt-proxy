/**
 * Returns generated Constructor-specific dom id
 */
export function filterObject<T extends Record<string, unknown>>(
    object: T,
    filterFn: ([key, value]: [string, unknown]) => boolean
): T;
