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
    [[#hasTransport]]
        apiBaseURL: {
            type: String,
            default: 'https://reqres.in/api/'
        },
        orgStructureApiUrl: {
            default: 'https://goodt-dev.goodt.me:8480',
            options: {
                apiPath: '/api/'
            }
        }
    [[/hasTransport]]
    },
    vars: Object.values(Vars).reduce(
        (acc, varName) => ({ ...acc, [varName]: { description: varName } }),
        {}
    )
});

export default descriptor;
