/**
 * @typedef {import('vue').PropOptions} PropOptions
 */
/**
 * @typedef {object} ElemDescriptor
 * @property {Object<string, ElemPropDef>} props            props definition
 * @property {Object<string, ElemVarDef>} vars              vars definition
 * @property {Object<string, ElemCssVarFactory>} cssVars    css variables definition
 */
/**
 * @typedef {object} ElemPropDef
 * @property {Function|Function[]} type                         Ctor type
 * @property {boolean | number | string | Function} default     default value for Object, Array must be a factory method
 * @property {{ value:any, label: string}[]} [options]          value options
 */
/**
 * @typedef {object} ElemVarDef
 * @property {string} description   variable description
 */
/**
 * @typedef {object} ElemVarAliasDef
 * @property {string} listen            listen alias
 * @property {string} trigger           trigger alias
 * @property {?ElemVarAliasMeta} meta   meta data
 */
/**
 * @typedef {object} ElemVarAliasMeta
 * @property {boolean} [global=true]    alias global scope
 */
/**
 * @callback ElemCssVarFactory
 * @param {Object<string, object>} props
 * @param {import('vue').Component} vm
 * @return {string|number|boolean}
 */
