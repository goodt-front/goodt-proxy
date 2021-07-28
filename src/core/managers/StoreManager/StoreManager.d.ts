/**
 * @deprecated
 */
export const store: Store;
export type CommitHandler = (statePartial: Record<string, any>) => any;
/**
 * Store factory method
 *
 * @return {Store}
 */
export function createStore(): Store;
/**
 * Store
 */
export declare class Store {
    private _commitHandlers: any[];
    /**
     * Returns the current state
     *
     * @return {Record<string, any>}
     */
    readonly state: Record<string, any>;
    /**
     * Merges the 'statePartial' object to the current state
     *
     * @param {Record<string, unknown>} statePartial      state change obj
     * @param {boolean} [isInvokeCommitHandlers=true]     if true will invoked
     */
    commit(statePartial: Record<string, unknown>, isInvokeCommitHandlers?: boolean): void;
    /**
     * Replaces the state with the 'newState'
     *
     * @param {Record<string, any>} newState
     */
    replace(newState: Record<string, any>): void;
    /**
     * Adds a commit handler
     *
     * @param {CommitHandler} handler
     */
    addCommitHandler(handler: CommitHandler): void;
    /**
     * Removes a commit handler
     *
     * @param {CommitHandler} handler
     */
    removeCommitHandler(handler: CommitHandler): void;
    /**
     * @callback CommitHandler
     * @param {Record<string, any>} statePartial
     */
    /** @type {CommitHandler[]} */
    [stateManagerObservable]: CommitHandler[];
}
/**
 * Reactive state holder symbol identifier
 */
declare const stateManagerObservable: unique symbol;
