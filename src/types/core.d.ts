import { PropOptions } from 'vue';

export interface ElemDescriptor {
    props?: ElemPropDef;
    vars?: ElemVarDef;
}

export declare type ElemPropDef = {
    options?: { value: unknown; label: string }[];
} & PropOptions;
