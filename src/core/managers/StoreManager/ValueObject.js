/**
 * @typedef {object} ValueObjectMeta
 * @property {boolean} global   global flag
 */

/**
 * ValueObject class
 */
class ValueObject {
    /**
     * Constructor
     *
     * @param {any} value
     * @param {?ValueObjectMeta} [meta=null]
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
 * Default meta factory
 *
 * @static
 * @return {ValueObjectMeta}
 */
ValueObject.defaultMeta = () => ({ global: true });
/**
 * Returns 'value' property if 'obj' is instanceof ValueObject; otherwise just returns the obj itself
 *
 * @static
 * @param {any} obj
 * @return {any}
 */
ValueObject.getValue = (valueObject) =>
    valueObject instanceof ValueObject ? valueObject.value : valueObject;

/**
 * ValueObject factory method
 *
 * @param {any} value
 * @param {?ValueObjectMeta} [meta=null]
 */
const createValueObject = (value, meta = null) => new ValueObject(value, meta);

export { ValueObject, createValueObject };
