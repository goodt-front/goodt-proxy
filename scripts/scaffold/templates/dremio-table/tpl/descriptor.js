/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({});

/**
 * @description Don't change `descriptor` exported name
 * @return {ElemDescriptor}
 */
export const descriptor = () => ({
    props: {
        [[#pagination]]
        // pagination settings
        pagination: {
            type: Object,
            default() {
                return {
                    showArrows: true
                };
            }
        }
        [[/pagination]]
    },
    vars: Object.values(Vars).reduce(
        (acc, varName) => ({ ...acc, [varName]: { description: varName } }),
        {}
    ),
    cssVars: {}
});

export default descriptor;
