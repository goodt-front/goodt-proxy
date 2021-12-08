export const DateTimeUnit: {
    YEAR: 'year';
    MONTH: 'month';
    WEEK: 'week';
    DAY: 'day';
    HOUR: 'hour';
    MINUTE: 'minute';
    SECOND: 'second';
};

/**
 * Replace px units with converted in rem into string and returns new one
 * @param {string} cssPropValue
 * @param {number} [rem2PxRatio=16]
 * @return {string}
 */
export function convertPxToRem(cssPropValue: string, rem2PxRatio?: number = 16): string;

export function dec2hex(decimal: number | string): string;

/**
 * Replace RGB or RGBA color format string with Hex format in provided string and returns new.
 * e.g. "rgb(28, 166, 171)" -> "#1ca6ab"
 *
 * @param {string} cssPropValue A color of RGB or RGBA format.
 * @return {string} A color of Hex format;
 */
export function convertRgbaToHex(cssPropValue: string): string;
