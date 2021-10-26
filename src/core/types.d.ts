export { IWatchStoreDefinition } from './managers';

declare global {
    import { PropOptions } from 'vue';

    export interface ElemPropDef extends PropOptions {
        type: String | Boolean | Number | Object | Array | Function;
        default?: String | Boolean | Number | Object | Array | Function;
        enum?: string[];
        options?: { value: unknown; label: string }[] | Record<string, any>;
    }

    export interface ElemVarDef {
        description?: string;
    }

    export type ElemRecordPropsDefinition<T> = {
        readonly [K in keyof T]: ElemPropDef<T[K]>;
    };

    export interface ElemCssVarContext {
        isEditorMode: boolean;
    }

    export type ElemCssVarFactory = (props: object, ctx: ElemCssVarContext) => string | number | boolean;

    export type ElemRecordVarsDefinition = {
        readonly [K as string]?: ElemVarDef;
    };

    export type ElemRecordCssVarsDefinition = {
        readonly [K as string]?: ElemCssVarFactory | string;
    };

    export interface ElemDescriptor<
        P extends Record<string, ElemPropDef>,
        V extends Record<string, ElemVarDef>,
        X extends Record<string, ElemCssVarDef>
    > {
        readonly props?: ElemRecordPropsDefinition<P>;
        readonly vars?: ElemRecordVarsDefinition<V>;
        readonly cssVars?: ElemRecordCssVarsDefinition<X>;
    }
}
