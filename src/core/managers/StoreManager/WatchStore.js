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
const WatchStoreStrat = {
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
    [WatchStoreStrat.ANY](vm, { vars, handler }) {
        if (handler) {
            handler = resolveHandler(handler, vm);
        }
        const resolveState = () => {
            if (vars.length === 0) {
                return vm.$storeState;
            }
            // prettier-ignore
            return vars.reduce((acc, key) => ({
                ...acc,
                [key]: vm.$storeState[key]
            }), {});
            // return vars.map((name) => vm.$storeState[name]);
        };

        return () => {
            const state = resolveState();
            vm.$nextTick(() => handler(Object.values(state), state));
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
    [WatchStoreStrat.ALL](vm, { vars, handler }) {
        if (handler) {
            handler = resolveHandler(handler, vm);
        }
        const resolveState = () => {
            if (vars.length === 0) {
                return vm.$storeState;
            }
            // prettier-ignore
            return vars.reduce((acc, key) => ({
                ...acc,
                ...(vm.$storeState[key] !== undefined
                    ? { [key]: vm.$storeState[key] }
                    : undefined)
            }), {});
            // return vars.map((name) => vm.$storeState[name]).filter((value) => value !== undefined);
        };
        return () => {
            const state = resolveState();
            const values = Object.values(state);
            if (values.length === vars.length) {
                vm.$nextTick(() => handler(values, state));
            }
        };
    }
};

/**
 *
 * @param {import('./WatchStore').WatchStoreStrat} strat
 * @return {*}
 */
const useWatchStoreStrat = (strat) => {
    const factories = WatchStoreStratFactory;
    if (!factories[strat]) {
        throw new Error(
            `Watch store strategy '${strat}' not implemented. Check your component '${WATCH_STORE_COMPONENT_OPTION_NAME}' options`
        );
    }
    return factories[strat];
};

/**
 *
 */
const resolveStrategy = ({ all }) => {
    return all ? WatchStoreStrat.ALL : WatchStoreStrat.ANY;
};

/**
 * Creates a new watcher, which watches 'vars' keys in '$storeState'
 * @param {ElemInstance} vm                                 vue component reference
 * @param {WatchStoreDefinition} def                        watcher definition
 * @param {import('vue').WatchOptions} watchOptions         watcher options
 *
 * @return {function(): void} watcher disposal function
 */
const createStoreWatcher = (vm, { all = false, vars = [], handler }, watchOptions = { immediate: true }) => {
    const strat = resolveStrategy({ all });
    return vm.$watch(
        () => {
            // use 'vars' keys from '$storeState' || use all keys from '$storeState'
            const values = vars.length > 0 ? vars.map((key) => vm.$storeState[key]) : vm.$storeState;
            // stringify as 'state' is always a new object
            return JSON.stringify(values);
        },
        useWatchStoreStrat(strat)(vm, { vars, handler }),
        watchOptions
    );
};

/**
 * Allows creating a stateWatcher dynamically
 * @param {WatchStoreDefinition} def                                            watcher definition
 * @return {function(): void} watcher disposal function
 */
function watchStore({ all = false, vars = [], handler }) {
    return createStoreWatcher(this, { all, vars, handler });
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
