import { DescriptorTypes } from '@goodt/core';

const { InputString, CheckboxBoolean } = DescriptorTypes;

export const descriptor = () => ({
    props: {
        url: {
            type: InputString,
            default: ''
        },
        responsive: {
            type: CheckboxBoolean,
            default: true
        }
    },
    vars: {}
});

export default descriptor;
