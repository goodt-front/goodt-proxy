/**
 *
 * @param descriptor
 * @return {function(): *}
 */
export function defineDescriptor(descriptor) {
    return () => descriptor;
}

/**
 * @enum {ObjectConstructor}
 * @type {Readonly<{TextareaString: StringConstructor, TimeString: StringConstructor, InputString: StringConstructor, FileString: StringConstructor, CheckboxBoolean: BooleanConstructor, SwitchBoolean: BooleanConstructor, SelectString: StringConstructor}>}
 */
export const DescriptorTypes = Object.freeze({
    InputString: String,
    TextareaString: String,
    FileString: String,
    TimeString: String,
    SelectString: String,
    CheckboxBoolean: Boolean,
    SwitchBoolean: Boolean
});
