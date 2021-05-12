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
        dremio: {
            type: Object,
            default: null
        }
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
