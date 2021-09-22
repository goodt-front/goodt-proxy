/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({});

/**
 * @description Don't change `descriptor` exported name
 */
export const descriptor = () => ({
    props: {},
    vars: Object.values(Vars).reduce((acc, varName) => ({ ...acc, [varName]: { description: varName } }), {})
});

export default descriptor;
