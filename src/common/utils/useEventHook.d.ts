/**
 *
 * @param {Set<(param: any) => any>} [fns]
 * @return {{trigger(param: any): void, off(callback: (param: any) => void): void, on(callback: (param: any) => void): {off: function(): *}}}
 */
export function useEventHook(fns?: Set<(param: any) => any>): {
    on(callback: () => any): { off(): void };
    off(callback: () => any): void;
    trigger(param: any): void;
};
