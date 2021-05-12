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

interface ValueObjectMeta {
    global: boolean;
}

interface AliasMapMeta {
    listen?: string;
    trigger?: string;
    meta?: ValueObjectMeta;
}

export function buildInternalStateFromExternal(
    externalState: Record<string, ValueObject>,
    varAliases: Record<string, AliasMapMeta>,
    unwrapExternalStateValue: (valueObject: ValueObject) => any
): Record<string, ValueObject>;

export function buildExternalStateFromInternal(
    internalState: Record<string, any>,
    varAliases: Record<string, AliasMapMeta>,
    buildExternalStateValue: (value: any, meta: ValueObjectMeta) => ValueObject
): Record<string, any>;
