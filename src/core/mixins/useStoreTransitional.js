/**
 * Промежуточный вариант с логикой для StoreManager
 */
// eslint-disable-next-line import/no-cycle
// import {
//     buildExternalStateFromInternal as buildExternalStateFromInternalLegacy,
//     buildInternalStateFromExternal as buildInternalStateFromExternalLegacy
// } from '../Elem.vue.legacy';

// eslint-disable-next-line import/no-cycle
import {
    buildExternalStateFromInternal as buildExternalStateFromInternalRefactored,
    buildInternalStateFromExternal as buildInternalStateFromExternalRefactored
} from './useStore';

/**
 * @see buildInternalStateFromExternalRefactored
 *
 * @param {Record<string, any>} internalState
 * @param {Record<string, AliasMapMeta>} varAliases
 * @param {function(value: any, meta: ValueObjectMeta): ValueObject} buildExternalStateValue
 * @param {IArguments} args
 * @return {Record<string, ValueObject>}
 */
export const buildExternalStateFromInternal = (...args) => {
    const result = buildExternalStateFromInternalRefactored(...args);
    // const referenceResult = buildExternalStateFromInternalLegacy(...args);

    return result;
};

/**
 * @see buildInternalStateFromExternalRefactored
 * @param {Record<string, ValueObject>} externalState
 * @param {Record<string, AliasMapMeta>} varAliases
 * @param {function(valueObject: ValueObject): any} unwrapExternalStateValue
 * @return {Record<string, any>}
 */
export const buildInternalStateFromExternal = (...args) => {
    const result = buildInternalStateFromExternalRefactored(...args);
    // const referenceResult = buildInternalStateFromExternalLegacy(...args);

    return result;
};
