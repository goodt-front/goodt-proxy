[[#hasTransport]]
import { joinPathParts } from '@goodt-widgets/common/utils';
[[/hasTransport]]

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
        apiBaseUrl: {
            type: String,
            default: 'https://reqres.in/api'
        },
        orgStructureApiUrl: {
            default: 'https://goodt-dev.goodt.me:8480',
            options: {
                apiPath: '/api/',
                build(host) {
                    return joinPathParts(
                        host,
                        this.apiPath
                    );
                }
            }
        }
    [[/hasTransport]]
    },
    vars: Object.values(Vars).reduce(
        (acc, varName) => ({ ...acc, [varName]: { description: varName } }),
        {}
    ),
    cssVars: {}
});

export default descriptor;
