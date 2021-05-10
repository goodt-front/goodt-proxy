import { RecordPropsDefinition } from 'vue/types/vue';
import { ElemDescriptor } from '../../types/core';

export function defineDescriptor<T extends ElemDescriptor>(
    descriptor: ElemDescriptor
): () => ElemDescriptor;

export const DescriptorTypes: Readonly<{
    InputString: String,
    TextareaString: String,
    FileString: String,
    TimeString: String,
    SelectString: String,
    CheckboxBoolean: Boolean,
    SwitchBoolean: Boolean
}>;

export interface IInstanceWithDescriptorProps<T> {
    props: {
        [P in keyof T['props']]?: ReturnType<T['props'][P]['type']>;
    }
};
