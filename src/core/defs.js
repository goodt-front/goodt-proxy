/* globals Record */
/**
 * @typedef {import('vue').PropOptions} PropOptions
 */
/**
 * @typedef {Record<string, any>} ElemDescriptor
 * @property {Record<string, ElemPropDef>} props
 * @property {Record<string, ElemVarDef>} vars
 * @property {Record<string, ElemCssVarFactory>} cssVars
 */
/**
 * @typedef {Record<string, any>} ElemPropDef
 * @property {Function|Function[]} type                     Ctor type @example String or [String,Array]
 * @property {boolean | number | string | Function} default       default value for Object, Array must be a factory method
 * @property {Array<{ value:any, label: string}>} [options]   value options
 */
/**
 * @typedef {Record<string, any>} ElemVarDef
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
 * @param {Record<string, ElemPropDef>} props
 * @param {import('vue').Component} vm
 * @return {string|number}
 */
