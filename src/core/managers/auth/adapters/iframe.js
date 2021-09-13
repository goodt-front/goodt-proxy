/** @param {import('keycloak-js').KeycloakConfig & { postMessageInit: boolean } & { init: import('keycloak-js').KeycloakInitOptions }|null|undefined} */
const POST_MESSAGE_RESPONSE_TIMEOUT = 30000;

export const PostMessageEvent = {
    REQUEST: 'goodt/request-keycloak-init-config',
    RESPONSE: 'goodt/post-keycloak-init-config'
};

/**
 *
 * @param {boolean} isRequired
 * @return {boolean}
 */
export const isPostMessageInitRequired = (isRequired) => {
    const isIframe = window.parent !== window;

    if (isIframe === false && isRequired) {
        console.warn(
            `[WARNING] using 'postMessageInit' keycloak init option in non-iframe document`
        );
    }

    return isIframe && isRequired;
};

/**
 *
 * @param {function(options: import('keycloak-js').KeycloakInitOptions): { token: string, refreshToken: string, idToken: string }} callback
 * @return {Promise<unknown>}
 */
export const promisifyAuthCredentialsRequest = (callback) =>
    new Promise((resolve) => {
        console.warn(
            `[WARNING] Auth Credentials postMessage request is used due to 'postMessageInit' option is enabled`
        );
        /**
         * @param {import('keycloak-js').KeycloakInitOptions} config
         */
        function resolveWithConfig(config) {
            if (callback == null) {
                return;
            }

            const initialPromise = callback(config);
            resolve(initialPromise);

            // eslint-disable-next-line no-use-before-define
            window.removeEventListener(PostMessageEvent.REQUEST, authCredentialsResponseListener);
            // eslint-disable-next-line no-param-reassign
            callback = null;
        }

        /**
         *
         * @param {string} name
         * @param {{ token: string, refreshToken: string }} details
         */
        function authCredentialsResponseListener({ data: { name, details } }) {
            if (name !== PostMessageEvent.RESPONSE) {
                return;
            }

            const { token, refreshToken } = details;
            resolveWithConfig({ token, refreshToken });
        }

        console.info(`[ATTACH] iframe 'authCredentialsResponseListener' attached`);
        window.addEventListener('message', authCredentialsResponseListener);

        window.postMessage(
            {
                name: PostMessageEvent.REQUEST
            },
            '*'
        );

        window.setTimeout(() => {
            console.error(
                `[ERROR] Auth Credentials postMessage request is timeout of ${POST_MESSAGE_RESPONSE_TIMEOUT} ms`
            );
            resolveWithConfig({});
        }, POST_MESSAGE_RESPONSE_TIMEOUT);
    });

/**
 *
 * @param context
 * @param adapter
 * @example
 * export const addAuthCredentialsRequestListener = (context, getToken) => {
 *
 *   if (context instanceof Window === false) {
 *     throw new Error('addAuthCredentialsRequestListener `context` argument is not a window object');
 *   }
 *   if (typeof getToken !== 'function') {
 *     throw new Error('addAuthCredentialsRequestListener `getToken` argument is not a function');
 *   }
 *
 *   const postMessageListener = async ({ data }) => {
 *     const { name } = data;
 *
 *     if (name !== PostMessageEvent.REQUEST) {
 *       return;
 *     }
 *
 *     console.info(`[ATTACH] parent 'addAuthCredentialsRequestListener' attached`);
 *     console.info(`[PENDING] 'getToken' async function response...`);
 *
 *     let response = null;
 *     while(response === null) {
 *       response = await getToken();
 *     }
 *
 *     const { token, refreshToken } = response;
 *     context.postMessage(
 *       {
 *         name: PostMessageEvent.RESPONSE,
 *         details: { token, refreshToken }
 *       },
 *       '*'
 *     );
 *     context.removeEventListener('message', postMessageListener);
 *   };
 *
 *   context.addEventListener('message', postMessageListener);
 * };
 */
