/**
 * @module i18n
 * @description Internationalization and localization utilities: number, dates, word forms formatting
 */

/**
 *
 * @param {number} count
 * @param {[string, string, string]} wordForms
 * @return {string}
 */
export function pluralize<A extends string, B extends string, C extends string>(
    count: number,
    wordForms: [A, B, C]
): A | B | C;
