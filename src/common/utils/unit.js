/**
 * Replace px units with converted in rem into string and returns new one
 * @param {string} cssPropValue
 * @param {number} [rem2PxRatio=16]
 * @return {string}
 */
export const convertPxToRemInString = (cssPropValue, rem2PxRatio = 16) => {
    // prettier-ignore
    return [...cssPropValue.matchAll(/(\d+px)\s/g)].reduce((replaced, [, m]) => {
        const rem = (Number.parseFloat(m) / rem2PxRatio).toFixed(4);
        return replaced.replaceAll(m, `${rem}rem`);
    }, cssPropValue);
};
