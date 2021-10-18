/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({
    FOO: 'foo',
    BAR: 'bar',
    BAZ: 'baz'
});

/**
 * @description Don't change `descriptor` exported name
 * @return {ElemDescriptor}
 */
export const descriptor = () => ({
    props: {
        boxBorder: {
            type: Object,
            default: () => ({ color: '', width: '1rem' }),
            units: ['em', 'rem', 'px', '%']
        },
        color: {
            type: Object,
            default: () => ({ even: '#f00', odd: '#0f0' })
        }
    },
    vars: Object.values(Vars).reduce((acc, varName) => ({ ...acc, [varName]: { description: varName } }), {}),
    cssVars: {
        'box-border-color': ['boxBorder.color', 'var(--color-primary)'],
        'box-border-width': 'boxBorder.width'
    }
});

export default descriptor;
