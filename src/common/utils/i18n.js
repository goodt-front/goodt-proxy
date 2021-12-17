/**
 * @module i18n
 * @description Internationalization and localization utilities: number, dates, word forms formatting
 */
/**
 *
 * @param {number} count
 * @param {string[]} wordForms
 * @return {string}
 */
export const pluralize = (count, wordForms = ['', '', '']) => {
    // eslint-disable-next-line no-magic-numbers
    const cases = [2, 0, 1, 1, 1, 2];

    // eslint-disable-next-line no-magic-numbers
    return wordForms[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
};
