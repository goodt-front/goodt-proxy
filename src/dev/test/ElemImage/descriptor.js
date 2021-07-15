import { DescriptorTypes } from '@goodt-wcore/core';

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
