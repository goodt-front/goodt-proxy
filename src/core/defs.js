/**
 * @typedef {Record<string, any>} ElemDescriptor
 * @property {Record<string, ElemPropDef>} props
 * @property {Record<string, ElemVarDef>} vars
 */
/**
 * @typedef {Record<string, any>} ElemPropDef
 * @property {Function|Function[]} type                     Ctor type @example String or [String,Array]
 * @property {Boolean|Number|String|Function} default       default value for Object, Array must be a factory method
 * @property {Array.<{ value:any, label:String}>} [options]   value options
 */
/**
 * @typedef {Record<string, any>} ElemVarDef
 * @property {string} description   variable description
 */
/**
 * @typedef {Object} ElemVarAliasDef
 * @property {string} listen            listen alias
 * @property {string} trigger           trigger alias
 * @property {?ElemVarAliasMeta} meta   meta data
 */
/**
 * @typedef {Object} ElemVarAliasMeta
 * @property {boolean} [global=true]    alias global scope
 */
