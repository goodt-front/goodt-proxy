import { defineDescriptor, DescriptorTypes } from '@goodt/core';

const { InputString, CheckboxBoolean } = DescriptorTypes;

export const descriptor = () => ({
    props: {
        url: {
            type: Boolean,
            default: 0
        },
        responsive: {
            type: CheckboxBoolean,
            default: true
        }
    },
    vars: {}
});
