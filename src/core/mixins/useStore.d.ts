import { ValueObject } from '../managers/StoreManager';

interface StoreState {
    [k as string]: ValueObject;
}

export interface Computed {
    readonly $storeState: StoreState;
}

export interface Methods {
    $storeCommit(state: StoreState): void;
}
