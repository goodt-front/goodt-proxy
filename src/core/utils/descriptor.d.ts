import { RecordPropsDefinition } from 'vue/types/vue';
import { ElemDescriptor } from '@goodt/core/types';

type ThunkFn<T> = () => T;
export function defineDescriptor(descriptor: ElemDescriptor): ThunkFn<ElemDescriptor>;

export const DescriptorTypes: Readonly<{
    InputString: String;
    TextareaString: String;
    FileString: String;
    TimeString: String;
    SelectString: String;
    CheckboxBoolean: Boolean;
    SwitchBoolean: Boolean;
}>;

type Primitive<T> = T extends String
    ? string
    : T extends Number
    ? number
    : T extends Boolean
    ? boolean
    : Record<string, any>;

export interface IDescriptorProps<T> {
    props: {
        [P in keyof T['props']]?: Primitive<T['props'][P]['type']>;
    };
}