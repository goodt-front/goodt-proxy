import { PropOptions } from 'vue';

export declare interface ElemPropDef extends PropOptions {
    enum?: string[];
    options?: { value: unknown; label: string }[];
}

export declare interface ElemVarDef {
    description?: string;
}

export type ElemRecordPropsDefinition<T> = {
    readonly [K in keyof T]: ElemPropDef<T[K]>;
};

export type ElemRecordVarsDefinition = {
    readonly [K as string]?: ElemVarDef;
};

export interface ElemDescriptor<P extends Record<string, any>, V extends Record<string, any> = {}> {
    readonly props?: ElemRecordPropsDefinition<P>;
    readonly vars?: ElemRecordVarsDefinition<V>;
}
