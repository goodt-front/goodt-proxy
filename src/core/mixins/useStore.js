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
// eslint-disable-next-line import/no-cycle
import { StoreManager } from '../managers';

const { store, buildStoreValue, unwrapStoreValue } = StoreManager;
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
 * @param {Record<string, AliasMapMeta>} varAliases
 * @param {function(valueObject: ValueObject): any} unwrapExternalStateValue
 * @return {Record<string, any>}
 */
export const buildInternalStateFromExternal = (
    externalState,
    varAliases,
    unwrapExternalStateValue = unwrapStoreValue
) => {
    const internalState = Object.entries(varAliases).reduce((state, [varName, varAliasData]) => {
        const { listen: alias } = varAliasData;
        if (!alias) {
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
    const externalState = Object.entries(internalState).reduce((state, [varName, varValue]) => {
        const { trigger: alias, meta } = varAliases[varName] || {};
        if (alias) {
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
    const { name: $accessorName = INSTANCE_ACCESSOR_NAME } = useOptions;

    /**
     * @type {MixinOptions}
     */
    const MixinComponentOptions = {
        props: {
            type: Object,
            default: () => ({
                varAliases: {}
            })
        },
        /**
         *
         */
        inject: {
            $store: {
                from: '$store',
                default: () => store
            }
        },
        computed: {
            /**
             * Returns the current store state
             *
             * @return {object} state
             */
            [`${$accessorName}State`]() {
                const varAliases = this.props.varAliases || {};
                const { state: externalState } = store;
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
                const varAliases = this.props.varAliases || {};
                const externalStatePartial = buildExternalStateFromInternal(
                    internalStatePartial,
                    varAliases,
                    buildStoreValue
                );
                // don't commit if obj is empty
                if (Object.keys(externalStatePartial).length > 0) {
                    store.commit(externalStatePartial);
                }
                return {};
            }
        }
    };

    return {
        mixin: MixinComponentOptions
    };
};
