import { DescriptorTypes } from '[[{core}]]';

const {
    InputString,
    TextareaString,
    FileString,
    TimeString,
    SelectString,
    CheckboxBoolean,
    SwitchBoolean
} = DescriptorTypes;

/**
 * @description Don't change `descriptor` exported name
 * @return {{vars: {}, props: {}}}
 */
export const descriptor = () => ({
    props: {
        /*
        themes: {
            type: SelectString,
            default: 'light',
            options: [
                { label: 'Light theme', value: 'light' },
                { label: 'Dark theme', value: 'dark' }
            ]
        }
    */
    },
    vars: {}
});

export default descriptor;
