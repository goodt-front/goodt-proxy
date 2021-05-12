/**
 * @typedef {object} UseStoreOptions
 * @property {string} [name='$state'] instance property name
 */
/**
 * @typedef {object} AliasMapMeta
 * @property {string} listen
 * @property {string} trigger
 * @property {import('../managers/StoreManager').ValueObjectMeta} meta
 */
import { store, buildStoreValue, unwrapStoreValue } from '../managers/StoreManager';

const INSTANCE_ACCESSOR_NAME = '$store';

/// /////////////////////////////////
//  Mixin private functionality
/// ////////////////////////////////
/**
 * Functions with dynamic context to encapsulate mixin private
 * context-dependent service/helper methods
 /
 
 /**
 *
 * @param {Record<string, ValueObject>} externalState
 * @param {Record<string, AliasMapMeta>} [varAliases=null]
 * @param {function(valueObject: ValueObject): any} unwrapExternalStateValue
 * @return {Record<string, any>}
 */
export const buildInternalStateFromExternal = (
    externalState,
    varAliases = null,
    unwrapExternalStateValue = unwrapStoreValue
) => {
    if (varAliases === null) {
        return Object.entries(externalState).reduce(
            (state, [varName, varValueObject]) => ({
                ...state,
                [varName]: unwrapExternalStateValue(varValueObject)
            }),
            {}
        );
    }

    const internalState = Object.entries(varAliases).reduce((state, [varName, varAliasData]) => {
        const { listen: alias } = varAliasData;
        if (alias == null || String(alias).length === 0) {
            return state;
        }
        if (alias in externalState) {
            const varValueObject = externalState[alias];
            return {
                ...state,
                [varName]: unwrapExternalStateValue(varValueObject)
            };
        }

        return state;
    }, {});

    return internalState;
};

/**
 * @param {Record<string, any>} internalState
 * @param {Record<string, AliasMapMeta>} varAliases
 * @param {function(value: any, meta: ValueObjectMeta): ValueObject} buildExternalStateValue
 * @return {Record<string, ValueObject>}
 */
export const buildExternalStateFromInternal = (
    internalState,
    varAliases = null,
    buildExternalStateValue = buildStoreValue
) => {
    if (varAliases === null) {
        const externalState = Object.entries(internalState).reduce(
            (state, [varName, varValue]) => ({
                ...state,
                [varName]: buildExternalStateValue(varValue)
            }),
            {}
        );

        return externalState;
    }

    const externalState = Object.entries(internalState).reduce((state, [varName, varValue]) => {
        const { trigger: alias, meta } = varAliases[varName] || {};
        if (alias != null && String(alias).length > 0) {
            return {
                ...state,
                [alias]: buildExternalStateValue(varValue, meta)
            };
        }

        return state;
    }, {});

    return externalState;
};

/**
 *
 * @param {UseStoreOptions} [useOptions={ }]
 * @return {{ mixin: MixinOptions }}
 */
export const useStore = (useOptions = {}) => {
    const {
        name: $accessorName = INSTANCE_ACCESSOR_NAME,
        store: storeInstance = () => store
    } = useOptions;

    /**
     * @type {MixinOptions}
     */
    const MixinComponentOptions = {
        /**
         *
         */
        inject: {
            __$store: {
                name: '$store',
                default: storeInstance
            }
        },
        computed: {
            /**
             * Returns the current store state
             *
             * @return {object} state
             */
            [`${$accessorName}State`]() {
                const varAliases = this.props?.varAliases || {};
                const { state: externalState } = this.__$store;
                const internalState = buildInternalStateFromExternal(
                    externalState,
                    varAliases,
                    unwrapStoreValue
                );

                return internalState;
            }
        },
        methods: {
            /**
             * Transforms 'internalStatePartial' object to Record<string, ValueObject>
             * and commits internalStatePartial to the store's state
             *
             * @param {Record<string, any>} internalStatePartial
             * @return {object} transformed 'internalStatePartial' with ValueObjects
             */
            [`${$accessorName}Commit`](internalStatePartial) {
                const varAliases = this.props?.varAliases || {};
                const externalStatePartial = buildExternalStateFromInternal(
                    internalStatePartial,
                    varAliases,
                    buildStoreValue
                );
                // don't commit if obj is empty
                if (Object.keys(externalStatePartial).length > 0) {
                    this.__$store.commit(externalStatePartial);
                }
                return {};
            }
        }
    };

    return {
        mixin: MixinComponentOptions
    };
};
