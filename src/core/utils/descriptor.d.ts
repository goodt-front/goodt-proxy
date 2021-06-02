import { RecordPropsDefinition } from 'vue/types/vue';

export const DescriptorTypes: Readonly<{
    InputString: String;
    TextareaString: String;
    FileString: String;
    TimeString: String;
    SelectString: String;
    CheckboxBoolean: Boolean;
    SwitchBoolean: Boolean;
}>;

type Primitive<T> = T extends String | StringConstructor
    ? string
    : T extends Number | NumberConstructor
    ? number
    : T extends Boolean | BooleanConstructor
    ? boolean
    : T extends Array | ArrayConstructor
    ? Array
    : T extends Object | ObjectConstructor
    ? Record<string, any>
    : T;

export interface IDescriptorProps<T> {
    props: {
        [P in keyof T['props']]?: Primitive<T['props'][P]['type']>;
    };
}
