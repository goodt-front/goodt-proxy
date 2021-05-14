/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({});

/**
 * @description Don't change `descriptor` exported name
 */
export const descriptor = () => ({
    props: {
        // @todo: DELETE UNUSED STUFF
        /*
        themes: {
            type: String,
            default: 'light',
            options: [
                { label: 'Light theme', value: 'light' },
                { label: 'Dark theme', value: 'dark' }
            ]
        }
        */
    },
    vars: Object.values(Vars).reduce(
        (acc, varName) => ({ ...acc, [varName]: { description: varName } }),
        {}
    )
});

export default descriptor;
