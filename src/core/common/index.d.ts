import { RecordPropsDefinition } from 'vue/types/vue';

export function defineDescriptor<T extends Record<string, any>>(descriptor: {
    props: RecordPropsDefinition<T>;
    vars: Record<string, any>;
}): () => {
    props: RecordPropsDefinition<T>;
    vars: Record<string, any>;
};

export const InputString: StringConstructor;
export const TextareaString: StringConstructor;
export const FileString: StringConstructor;
export const TimeString: StringConstructor;
export const SelectString: StringConstructor;
export const CheckboxBoolean: BooleanConstructor;
export const SwitchBoolean: BooleanConstructor;
