import { RecordPropsDefinition } from 'vue/types/vue';
/**
 * @see {@link file:///./Elem.descriptor.js | BaseElemDescriptor}
 */
export interface Props {
    slot: string;
    position: string;
    display: string;
    width: string;
    widthUnit: string;
    height: string;
    heightUnit: string;
    marginT: string;
    marginR: string;
    marginB: string;
    marginL: string;
    paddingT: string;
    paddingR: string;
    paddingB: string;
    paddingL: string;
    cssClass: string;
    cssStyle: string;
    varAliases: Record<string, ElemVarAliasDef>;
    slotData: Record<string, any>;
}

export const descriptor: () => {
    props: RecordPropsDefinition<Props>;
};

export const ElemEvent: Readonly<{ CREATED: string; MOUNTED: string; DESTROYED: string }>;
