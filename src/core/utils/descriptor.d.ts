import { RecordPropsDefinition } from 'vue/types/vue';
import { ElemDescriptor } from '../../types/core';

export function defineDescriptor<T extends ElemDescriptor>(descriptor: T): () => typeof descriptor;

export const DescriptorTypes: Readonly<{
    InputString: String;
    TextareaString: String;
    FileString: String;
    TimeString: String;
    SelectString: String;
    CheckboxBoolean: Boolean;
    SwitchBoolean: Boolean;
}>;

export interface IDescriptorProps<T> {
    props: {
        [P in keyof T['props']]?: InstanceType<T['props'][P]['type']>;
    };
}
