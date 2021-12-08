/**
 *
 * @param {Set<(param: any) => any>} [fns]
 * @return {{trigger(param: any): void, off(callback: (param: any) => void): void, on(callback: (param: any) => void): {off: function(): *}}}
 */
export const useEventHook = (fns = new Set()) => ({
    // eslint-disable-next-line id-length
    on(callback) {
        fns.add(callback);
        return {
            off: () => this.off(callback)
        };
    },
    off(callback) {
        if (fns.has(callback)) {
            fns.delete(callback);
        }
    },
    trigger(param) {
        fns.forEach((callback) => callback(param));
    }
});
