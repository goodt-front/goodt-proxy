import inflection from 'inflection';

/**
 *
 * @param {Record<string, unknown>} object
 * @return {Record<string, unknown>}
 */
export const camelizeObjectKeys = (object) =>
    Object.fromEntries(
        Object.entries(object).map(([key, value]) => [
            inflection.camelize(key, true),
            // eslint-disable-next-line no-nested-ternary
            typeof value === 'object' ? (value ? camelizeObjectKeys(value) : null) : value
        ])
    );

/**
 *
 * @param {Record<string, unknown>} object
 * @return {Record<string, unknown>}
 */
export const underscoreObjectKeys = (object) =>
    Object.fromEntries(
        Object.entries(object).map(([key, value]) => [
            inflection.underscore(key, true),
            // eslint-disable-next-line no-nested-ternary
            typeof value === 'object' ? (value ? underscoreObjectKeys(value) : null) : value
        ])
    );
