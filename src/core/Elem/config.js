import '../defs';
import { defineDescriptor } from '../utils';

const cssOptions = {
    height: [{ value: '', label: 'inherit' }],
    sizeUnits: [
        { value: '', label: 'inherit' },
        { value: '1-12', label: '1/12' },
        { value: '2-12', label: '2/12' },
        { value: '3-12', label: '3/12' },
        { value: '4-12', label: '4/12' },
        { value: '5-12', label: '5/12' },
        { value: '6-12', label: '6/12' },
        { value: '7-12', label: '7/12' },
        { value: '8-12', label: '8/12' },
        { value: '9-12', label: '9/12' },
        { value: '10-12', label: '10/12' },
        { value: '11-12', label: '11/12' },
        { value: '12-12', label: '12/12' }
    ],
    marginPadding: [
        { value: '', label: 'inherit' },
        { value: 'auto', label: 'auto' },
        { value: 'none', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: 'l1', label: 'layout 1' },
        { value: 'l2', label: 'layout 2' },
        { value: 'l3', label: 'layout 3' },
        { value: 'l4', label: 'layout 4' },
        { value: 'l5', label: 'layout 5' },
        { value: 'l6', label: 'layout 6' },
        { value: 'l7', label: 'layout 7' }
    ]
};
/**
 * Returns base elem descriptor
 *
 * @return {ElemDescriptor}
 */
const descriptor = defineDescriptor({
    props: {
        slot: {
            type: String,
            default: 'default'
        },
        position: {
            type: String,
            default: '',
            options: [
                { value: '', label: 'inherit' },
                { value: 'pos-static', label: 'static' },
                { value: 'pos-abs', label: 'absolute' },
                { value: 'pos-rel', label: 'relative' },
                { value: 'pos-fixed', label: 'fixed' },
                { value: 'pos-sticky', label: 'sticky' }
            ]
        },
        /**
         * @type {PropOptions<Record<string, Record>>}
         */
        display: {
            type: String,
            default: '',
            options: [
                { value: '', label: 'inherit' },
                { value: 'd-block', label: 'block' },
                { value: 'd-inline', label: 'inline' },
                { value: 'd-inline-block', label: 'inline-block' },
                { value: 'd-flex', label: 'flex' },
                { value: 'd-inline-flex', label: 'inline-flex' }
            ]
        },
        width: {
            type: String,
            default: '',
            options: cssOptions.sizeUnits
        },
        widthUnit: {
            type: String,
            default: '',
            options: [
                { value: '', label: 'size' },
                { value: '%', label: '%' },
                { value: 'px', label: 'px' },
                { value: 'em', label: 'em' },
                { value: 'rem', label: 'rem' },
                { value: 'vw', label: 'vw' }
            ]
        },
        height: {
            type: String,
            default: '',
            options: cssOptions.height
        },
        heightUnit: {
            type: String,
            default: '%',
            options: [
                { value: '%', label: '%' },
                { value: 'px', label: 'px' },
                { value: 'em', label: 'em' },
                { value: 'rem', label: 'rem' },
                { value: 'vh', label: 'vh' }
            ]
        },
        marginT: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        marginR: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        marginB: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        marginL: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        paddingT: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        paddingR: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        paddingB: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        paddingL: {
            type: String,
            default: '',
            options: cssOptions.marginPadding
        },
        /**
         * @type {PropOptions<Record<string, unknown>[]>}
         */
        cssClass: {
            type: Array,
            default() {
                return [];
            }
        },
        /**
         * @type {PropOptions<Record<string, Record>>}
         */
        cssStyle: {
            type: Object,
            default() {
                return {};
            }
        },
        /**
         * Returns aliases hash for 'vars'
         *
         * @type PropOptions<Record<string, ElemVarAliasDef>>
         */
        varAliases: {
            type: Object,
            default() {
                return {};
            }
        },
        slotData: {
            type: Object,
            default: () => ({})
        }
    },
    vars: {}
});

/**
 * /**
 * Elem events Lifecycle events
 * @enum {string}
 * @type {Readonly<{CREATED: string, MOUNTED: string, DESTROYED: string}>}
 */
const ElemEvent = Object.freeze({
    CREATED: 'elem-created',
    MOUNTED: 'elem-mounted',
    DESTROYED: 'elem-destroyed'
});

export { descriptor, ElemEvent };

export default {
    descriptor,
    ElemEvent
};
