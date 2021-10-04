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
        bgColor: {
            type: String,
            default: 'white'
        },
        textColor: {
            type: String,
            default: 'black'
        }
    },
    vars: Object.values(Vars).reduce((acc, varName) => ({ ...acc, [varName]: { description: varName } }), {}),
    cssVars: {
        'bg-color': ({ bgColor }) => bgColor,
        'text-color': ({ textColor }, { isClicked }) => (isClicked ? textColor : 'black')
    }
});

export default descriptor;
