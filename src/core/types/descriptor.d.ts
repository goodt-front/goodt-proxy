import { PropOptions } from 'vue';

export interface ElemPropDef extends PropOptions {
    type?: String | Boolean | Number | Object | Array | Function;
    enum?: string[];
    options?: { value: unknown; label: string }[];
}

export interface ElemVarDef {
    description?: string;
}

export interface ElemRecordPropsDefinition<T> {
    readonly [K in keyof T]: ElemPropDef<T[K]>;
};

export type ElemRecordVarsDefinition = {
    readonly [K as string]?: ElemVarDef;
};

export interface ElemDescriptor<P extends Record<string, ElemPropDef>, V extends Record<string, ElemVarDef>> {
    readonly props?: ElemRecordPropsDefinition<P>;
    readonly vars?: ElemRecordVarsDefinition<V>;
}
