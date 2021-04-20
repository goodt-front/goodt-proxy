import Vue from 'vue';

/**
 * @typedef {Object} ValueObjectMeta
 * @property {Boolean} global   global flag
 */
/**
 * ValueObject class
 */
class ValueObject {
    /**
     * Constructor
     * @param {any} value
     * @param {ValueObjectMeta} [meta=null]
     */
    constructor(value, meta = null) {
        const def = ValueObject.defaultMeta();
        /**
         * @member {any} value
         */
        this.value = value;
        /**
         * @member {ValueObjectMeta} meta
         */
        this.meta = meta ? { ...def, ...meta } : def;
    }
}
/**
 * @static Default meta factory
 * @return {ValueObjectMeta}
 */
ValueObject.defaultMeta = () => ({ global: true });
/**
 * @static Returns 'value' property if 'obj' is instanceof ValueObject; otherwise just returns the obj itself
 * @param {any} obj
 * @return {any}
 */
ValueObject.getValue = obj => (obj instanceof ValueObject ? obj.value : obj);

/**
 * ValueObject factory method
 * @param {any} value
 * @param {?ValueObjectMeta} [meta=null]
 */
const vo = (value, meta = null) => new ValueObject(value, meta);

/**
 * Reactive state holder
 */
const stateOb = Vue.observable({ state: {} });
/**
 * Store
 */
const store = {
    get state() {
        return stateOb.state;
    },
    commit(newState) {
        let { state } = stateOb;
        for (let k in newState) {
            if (newState[k] === undefined) {
                Vue.delete(state, k);
            } else {
                Vue.set(state, k, newState[k]);
            }
        }
    },
    replace(newState) {
        stateOb.state = newState;
    }
};

export { store, vo, ValueObject };
