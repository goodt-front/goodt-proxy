/**
 * @typedef {Object} ElemDescriptor
 * @property {Object.<String, ElemPropDef>} props
 * @property {Object.<String, ElemVarDef>} vars
 */
/**
 * @typedef {Object} ElemPropDef
 * @property {Function|Function[]} type                     Ctor type @example String or [String,Array]
 * @property {Boolean|Number|String|Function} default       default value for Object, Array must be a factory method
 * @property {Array.<{ value:any, label:String}>} [options]   value options
 */
/**
 * @typedef {Object} ElemVarDef
 * @property {String} description   variable description
 */
/**
 * @typedef {Object} ElemVarAliasDef
 * @property {String} listen            listen alias
 * @property {String} trigger           trigger alias
 * @property {?ElemVarAliasMeta} meta   meta data
 */
/**
 * @typedef {Object} ElemVarAliasMeta
 * @property {Boolean} [global=true]    alias global scope
 */
