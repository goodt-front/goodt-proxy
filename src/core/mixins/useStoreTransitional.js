/**
 * Промежуточный вариант с логикой для StoreManager
 */
import {
    buildExternalStateFromInternal as buildExternalStateFromInternalLegacy,
    buildInternalStateFromExternal as buildInternalStateFromExternalLegacy
} from '../Elem.vue.legacy';

import {
    buildExternalStateFromInternal as buildExternalStateFromInternalRefactored,
    buildInternalStateFromExternal as buildInternalStateFromExternalRefactored
} from './useStore';

/**
 * @param {IArguments} args
 * @see buildInternalStateFromExternalRefactored
 * @return {Record<string, ValueObject>}
 */
export const buildExternalStateFromInternal = (...args) => {
    const result = buildExternalStateFromInternalRefactored(...args);
    const referenceResult = buildExternalStateFromInternalLegacy(...args);

    // @todo compare logic
    console.log({
        result,
        referenceResult
    });

    return result;
};

/**
 * @param {IArguments} args
 * @see buildInternalStateFromExternalRefactored
 * @return {Record<string, *>}
 */
export const buildInternalStateFromExternal = (...args) => {
    const result = buildInternalStateFromExternalRefactored(...args);
    const referenceResult = buildInternalStateFromExternalLegacy(...args);

    // @todo compare logic
    console.log({
        result,
        referenceResult
    });

    return result;
};
