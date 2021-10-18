/**
 * @typedef {import('../../Elem').IElemInstance} ElemInstance
 */
/**
 * @typedef {object} WatchStore
 * @property {WatchStoreDefition[]} watchStore
 */
/**
 * @typedef {object} WatchStoreDefition
 * @property {WatchStoreStrat} [strat='any']    watch strategy
 * @property {string[]} [vars=[]]               array of 'var' names ie keys to watch in '$storeState'
 * @property {(state:object)} handler           handler to be invoked whenever '$storeState' changes with defined 'vars'
 */
/**
 * Watch store component option name @default 'watchStore'
 */
const WATCH_STORE_COMPONENT_OPTION_NAME = 'watchStore';
/**
 * Watch store strategy types
 * @typedef {'any'|'all'} WatchStoreStrat
 * @enum {string}
 */
const WatchStoreStrat = {
    ANY: 'any',
    ALL: 'all'
};
const WatchStoreStratFactory = {
    /**
     * @param {ElemInstance} vm             vue component reference
     * @param {WatchStoreDefition} def      watcher defition
     * @return {Function}                   strat handler
     */
    [WatchStoreStrat.ANY](vm, { vars, handler }) {
        return () => {
            let state = vm.$storeState;
            // build a 'state' object using 'vars' as keys, even if values are 'undefined'
            // always invoke handler (just like vue does)
            // ----
            // $storeState: { foo: 1 }
            // vars: ['foo', 'bar']
            // state: { foo:1, bar:undefined }
            if (vars.length > 0) {
                state = vars.reduce((obj, key) => {
                    obj[key] = vm.$storeState[key];
                    return obj;
                }, {});
            }
            vm.$nextTick(() => handler.call(vm, state));
        };
    },
    /**
     * @param {ElemInstance} vm             vue component reference
     * @param {WatchStoreDefition} def      watcher defition
     * @return {Function}                   strat handler
     */
    [WatchStoreStrat.ALL](vm, { vars, handler }) {
        return () => {
            let state = vm.$storeState;
            let shouldInvoke = true;
            // build a 'state' object using 'vars' as keys, only if values are not 'undefined'
            // invoke handler only if all 'vars' keys are present in the 'state'
            // ----
            // $storeState: { foo: 1 }
            // vars: ['foo', 'bar']
            // state: { foo:1 }
            if (vars.length > 0) {
                state = vars.reduce((obj, key) => {
                    const value = vm.$storeState[key];
                    if (value !== undefined) {
                        obj[key] = value;
                    }
                    return obj;
                }, {});
                shouldInvoke = Object.keys(state).length === vars.length;
            }
            if (shouldInvoke) {
                vm.$nextTick(() => handler.call(vm, state));
            }
        };
    }
};
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
 * Creates a new watcher, which watches 'vars' keys in '$storeState'
 * @param {ElemInstance} vm                             vue component reference
 * @param {WatchStoreDefition} def                      watcher defition
 * @param {import('vue').WatchOptions} watchOptions     watcher options
 * @return {Function} watcher disposal function
 */
const createStoreWatcher = (vm, { strat = WatchStoreStrat.ANY, vars = [], handler }, watchOptions) =>
    vm.$watch(
        () => {
            // use 'vars' keys from '$storeState' || use all keys from '$storeState'
            const values = vars.length > 0 ? vars.map((key) => vm.$storeState[key]) : vm.$storeState;
            // stringify as 'state' is always a new object
            return JSON.stringify(values);
        },
        useWatchStoreStrat(strat)(vm, { vars, handler }),
        watchOptions
    );

/**
 * Automatically creates '$storeState' watchers defined in the '#WATCH_STORE_COMPONENT_OPTION_NAME' block of the target 'vm'
 * @param {ElemInstance} vm  target component
 * @return {function[]} array of watcher disposal functions
 */
const useWatchStore = (vm) => {
    const watchOptions = { immediate: true };
    /** @type {WatchStoreDefition[]} */
    const defs = vm.$options[WATCH_STORE_COMPONENT_OPTION_NAME] || [];
    return defs.map((def) => createStoreWatcher(vm, def, watchOptions));
};

export { useWatchStore };
