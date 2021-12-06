export const DateTimeUnit = Object.freeze({
    YEAR: 'year',
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    HOUR: 'hour',
    MINUTE: 'minute',
    SECOND: 'second'
});

/**
 * Replace px units with converted in rem into string and returns new one
 * @param {string} cssPropValue
 * @param {number} [rem2PxRatio=16]
 * @return {string}
 */
export const convertPxToRem = (cssPropValue, rem2PxRatio = 16) => {
    const iterator = cssPropValue.matchAll(/(\d+px)\s/g);
    // prettier-ignore
    return Array.from(iterator).reduce(
        (replaced, [, m]) => {
            const rem = (Number.parseFloat(m) / rem2PxRatio).toFixed(4);
            return replaced.replaceAll(m, `${rem}rem`);
        },
        cssPropValue
    );
};

/**
 *
 * @param {number|string} decimal
 * @return {string}
 */
export const dec2hex = (decimal = 0) => {
    decimal = Number(decimal) || 0;
    const hex = Math.round(Math.min(Math.max(0, decimal), 255)).toString(16);
    return `0${hex}`.slice(-2);
};

/**
 * Replace RGB or RGBA color format string with Hex format in provided string and returns new.
 * e.g. "rgb(28, 166, 171)" -> "#1ca6ab"
 *
 * @param {string} cssPropValue A color of RGB or RGBA format.
 * @return {string} A color of Hex format;
 */
export function convertRgbaToHex(cssPropValue) {
    // prettier-ignore
    const iterator = cssPropValue.matchAll(
        /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+)\s*)?\)/g
    );
    // prettier-ignore
    return Array.from(iterator).reduce(
        (replaced, [rgbaToken, ...colorIntensities]) => {
            const converter = (decimal) => dec2hex(decimal == null ? 255 : Number(decimal))
            return replaced.replace(
                rgbaToken,
                `#${colorIntensities.map(converter).join('')}`
            )
        },
        cssPropValue
    );
}
