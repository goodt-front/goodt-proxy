/**
 * @typedef {import('@goodt-wcore/core/Elem').IElemInstance} ElemInstance
 */

/**
 * Watch store component option name @default 'watchStore'
 */
const WATCH_STORE_COMPONENT_OPTION_NAME = 'watchStore';

/**
 * @type {import('./WatchStore').WatchStoreStratEnum}
 */
const WatchStoreStrategy = {
    ANY: 'any',
    ALL: 'all'
};

/**
 * @param {(function(): void)|string} handler
 * @param {ElemInstance} context
 * @return {function(): void}
 */
const resolveHandler = (handler, context) =>
    typeof handler === 'function' ? handler.bind(context) : context[handler].bind(context);

const WatchStoreStratFactory = {
    /**
     * Build a 'state' object using 'vars' as keys, even if values are 'undefined'
     * always invoke handler (just like vue does)
     *
     * @example
     * // $storeState: { foo: 1 }
     * // vars: ['foo', 'bar']
     * // state: { foo:1, bar:undefined }
     *
     * @param {ElemInstance} vm             vue component reference
     * @param {WatchStoreDefinition} def    watcher definition
     * @return {function(): void}           strat handler
     */
    [WatchStoreStrategy.ANY](vm, { vars, when, handler }) {
        handler = resolveHandler(handler, vm);

        if (vars.length === 0) {
            return () => vm.$nextTick(() => handler(Object.values(vm.$storeState), vm.$storeState));
        }

        // prettier-ignore
        const shouldInvoke = (values) => []
            .concat(when)
            .filter((f) => typeof f === 'function')
            .every((isTrue) => isTrue(values));

        // prettier-ignore
        const resolveState = () =>
            vars.reduce((acc, varName) => ({
                ...acc,
                [varName]: vm.$storeState[varName]
            }), {});

        return () => {
            const state = resolveState();
            const values = Object.values(state);
            if (shouldInvoke(values)) {
                vm.$nextTick(() => handler(values, state));
            }
        };
    },
    /**
     * Builds a 'state' object using 'vars' as keys, only if values are not 'undefined'
     * invoke handler only if all 'vars' keys are present in the 'state'
     *
     * @example
     * $storeState: { foo: 1 }
     * vars: ['foo', 'bar']
     * state: { foo:1 }
     *
     * @param {ElemInstance} vm             vue component reference
     * @param {WatchStoreDefinition} def    watcher definition
     * @return {Function}                   strat handler
     */
    [WatchStoreStrategy.ALL](vm, { vars, handler, when }) {
        handler = resolveHandler(handler, vm);
        // prettier-ignore
        const resolveVarValue = (varName) =>
            vm.$storeState[varName] !== undefined
                ? { [varName]: vm.$storeState[varName] }
                : undefined;

        // prettier-ignore
        const shouldInvoke = (values) => {
            if (values.length !== vars.length) {
                return false;
            }
            return []
                .concat(when)
                .filter((f) => typeof f === 'function')
                .every((isTrue) => isTrue(values));
        }

        const resolveState = () => {
            // prettier-ignore
            return vars.reduce((acc, varName) => ({
                ...acc,
                ...resolveVarValue(varName)
            }), {});
        };

        return () => {
            const state = resolveState();
            const values = Object.values(state);
            if (shouldInvoke(values)) {
                vm.$nextTick(() => handler(values, state));
            }
        };
    }
};

/**
 *
 * @param {import('./WatchStore').WatchStoreStrategy} strategy
 * @return {*}
 */
const useWatchStoreStrategyWatcher = (strategy) => {
    const watcher = WatchStoreStratFactory[strategy];
    if (watcher == null) {
        throw new Error(
            `Watch store strategy '${strategy}' not implemented. Check your component '${WATCH_STORE_COMPONENT_OPTION_NAME}' options`
        );
    }
    return watcher;
};

/**
 *
 */
const resolveStrategy = ({ all, when }) => {
    if (all === true || when === true || when === WatchStoreStrategy.ALL) {
        return WatchStoreStrategy.ALL;
    }
    return WatchStoreStrategy.ANY;
};

/**
 * Creates a new watcher, which watches 'vars' keys in '$storeState'
 * @param {ElemInstance} vm                                 vue component reference
 * @param {WatchStoreDefinition} definition                 watcher definition
 * @param {import('vue').WatchOptions} watchOptions         watcher options
 *
 * @return {function(): void} watcher disposal function
 */
const createStoreWatcher = (vm, definition, watchOptions = { immediate: true }) => {
    const { all = false, vars = [], handler, when = false } = definition;

    validateDefinition({ ...definition, all, vars, when });

    const watcher = useWatchStoreStrategyWatcher(resolveStrategy({ all, when }));

    // use 'vars' keys from '$storeState' || use all keys from '$storeState'
    // prettier-ignore
    const resolveWatcherValues = () => vars.length > 0
        ? vars.map((key) => vm.$storeState[key])
        : vm.$storeState;

    return vm.$watch(
        () => {
            // stringify as 'state' is always a new object
            return JSON.stringify(resolveWatcherValues());
        },
        watcher(vm, { vars, handler, when }),
        watchOptions
    );
};

/**
 *
 * @param {WatchStoreDefinition} definition watcher definition
 * @throw {Error}
 */
const validateDefinition = (definition) => {
    const unknownProps = Object.keys(definition).filter(
        (prop) => false === ['handler', 'vars', 'all', 'when'].includes(prop)
    );
    console.log({ unknownProps });
    if (unknownProps.length > 0) {
        throw new Error(
            `'watchStore' section invalid descriptor: prop(s) '${unknownProps.join("', '")}' ${
                unknownProps.length > 1 ? 'are' : 'is'
            } unknown.`
        );
    }

    const { handler, vars, all, when } = definition;
    if (['function', 'string'].includes(typeof handler) === false) {
        throw new Error(
            `'watchStore' section invalid descriptor format: 'handler' prop type is expected to be Function or String.`
        );
    }
    if (Array.isArray(vars) === false) {
        throw new Error(
            `'watchStore' section invalid descriptor format: 'vars' prop type is expected to be Array<String>`
        );
    }
    if (typeof all !== 'boolean') {
        throw new Error(`'watchStore' section invalid descriptor format: 'all' prop type is expected to be Boolean`);
    }
    if (['function', 'string', 'boolean'].includes(typeof when) === false && Array.isArray(when) === false) {
        throw new Error(
            `'watchStore' section invalid descriptor format. 'when' prop type is expected to be Function, String,  Boolean, Array<Function>`
        );
    }
    if (vars.length === 0 && (all === true || when === true)) {
        throw new Error(
            `'watchStore' section invalid descriptor format: 'all: true' or 'when: true' prop and empty 'vars' prop can't be used together`
        );
    }
};

/**
 * Allows creating a stateWatcher dynamically
 * @param {WatchStoreDefinition} def                                            watcher definition
 * @return {function(): void} watcher disposal function
 */
function watchStore({ handler, vars = [], all = false, when = false }) {
    return createStoreWatcher(this, { handler, vars, all, when });
}

/**
 * Automatically creates '$storeState' watchers defined in the '#WATCH_STORE_COMPONENT_OPTION_NAME' block of the target 'vm'
 * @param {ElemInstance} vm  target component
 * @return {{ disposals: function[], $watchStore: function }}
 */
const useWatchStore = (vm) => {
    /** @type {WatchStoreDefinition[]} */
    const defs = vm.$options[WATCH_STORE_COMPONENT_OPTION_NAME] ?? [];
    const disposals = defs.map((def) => createStoreWatcher(vm, def));
    const $watchStore = watchStore.bind(vm);
    return {
        disposals,
        $watchStore
    };
};

export { useWatchStore };
