export type ValueObjectMeta = {
    /**
     * global flag
     */
    global: boolean;
};

/**
 * @typedef {object} ValueObjectMeta
 * @property {boolean} global   global flag
 */
/**
 * ValueObject class
 */
export class ValueObject {
    /**
     * Constructor
     *
     * @param {any} value
     * @param {?ValueObjectMeta} [meta=null]
     */
    constructor(value: any, meta?: ValueObjectMeta | null);

    /**
     * @member {any} value
     */
    value: any;
    /**
     * @member {ValueObjectMeta} meta
     */
    meta: ValueObjectMeta;
}

export namespace ValueObject {
    function defaultMeta(): ValueObjectMeta;

    function getValue(obj: any): any;
}

/**
 * ValueObject factory method
 *
 * @param {any} value
 * @param {?ValueObjectMeta} [meta=null]
 */
export function createValueObject(value: any, meta?: ValueObjectMeta | null): ValueObject;
