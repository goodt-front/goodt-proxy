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
        bgColor: {
            type: String,
            default: 'white'
        },
        font: {
            type: Object,
            default() {
                return { color: 'black' };
            }
        },
        buttonStyles: {
            type: Object,
            // prettier-ignore
            default: () => [
                { textColor: 'red' },
                { textColor: 'green' },
                { textColor: 'blue' },
                { textColor: 'yellow' }
            ]
        }
    },
    vars: Object.values(Vars).reduce((acc, varName) => ({ ...acc, [varName]: { description: varName } }), {}),
    cssVars: {
        'bg-color': 'bgColor',
        'text-color': 'font.color'
    }
});

export default descriptor;
