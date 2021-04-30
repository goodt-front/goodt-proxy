import { StoreManager } from '@/core/managers';

const { vo, ValueObject } = StoreManager;

/**
 * before refactored logic for $storeCommit
 *
 * Для эталонного сравнения при тестировании в процессе миграции
 *
 * @param stateChange
 * @param varAliases
 * @return {{}}
 */
export const buildExternalStateFromInternal = (stateChange, varAliases) => {
    // eslint-disable-next-line no-param-reassign
    varAliases = varAliases || {};
    const obj = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const k in stateChange) {
        if (varAliases[k] && varAliases[k].trigger) {
            const alias = varAliases[k].trigger;
            obj[alias] = vo(stateChange[k], varAliases[k].meta);
        }
    }

    return obj;
};

/**
 * before refactored logic for $storeState
 *
 * Для эталонного сравнения при тестировании в процессе миграции
 *
 * @param state
 * @param varAliases
 * @return {{}}
 */
export const buildInternalStateFromExternal = (state, varAliases) => {
    // eslint-disable-next-line no-param-reassign
    varAliases = varAliases || {};
    const obj = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const k in varAliases) {
        const alias = varAliases[k].listen;
        // eslint-disable-next-line no-undef
        if (alias && state[alias]) {
            obj[k] = ValueObject.getValue(state[alias]);
        }
    }
    return obj;
};
