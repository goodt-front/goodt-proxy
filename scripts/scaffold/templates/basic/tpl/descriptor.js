/**
 * @enum {string}
 * @type {Readonly<Record<string, string>>}
 */
export const Vars = Object.freeze({
    // @todo: DELETE COMMENTED STUFF
    /*
    DUMMY_VAR_NAME: 'dummyVarName'
    */
});

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
    vars: {
        // @todo: DELETE UNUSED STUFF
        /*
        [Vars.DUMMY_VAR_NAME]: {
            description: 'some description'
        }
        */
    }
});

export default descriptor;
