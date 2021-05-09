/**
 *
 * @param descriptor
 * @return {function(): *}
 */
export function defineDescriptor(descriptor) {
    return () => descriptor;
}

export const InputString = String;
export const TextareaString = String;
export const FileString = String;
export const TimeString = String;
export const SelectString = String;
export const CheckboxBoolean = Boolean;
export const SwitchBoolean = Boolean;
