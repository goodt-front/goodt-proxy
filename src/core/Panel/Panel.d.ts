import Vue, { VueConstructor } from 'vue';
import { ElemDescriptor } from '@goodt/core/types';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import VuePanel, { PanelEvent } from './Panel.vue';

interface PanelMetaData {
    /**
     * panel name
     */
    name: string;
    /**
     * mdi icon class
     */
    icon: string;
}

interface Methods<T = {}> extends T {
    /**
     * Notifies env that the 'props' object has changed (used by the editor env)
     * @param {?string} [propName=null]     property to update from the 'props' object or null to replace the whole 'props' object
     */
    propChanged?(propName?: string): void;
}

interface Props {
    elementInstance?: Vue;
    initProps?: boolean;
}

interface Computed { }

interface Data {
    /** @type {PanelMetaData} panel meta data (used by the editor env) */
    $meta?: PanelMetaData;
    /** @mutable elem instance props { key: value } */
    props?: {};
    /** @type {ElemDescriptor} elem descriptor */
    descriptor?: ElemDescriptor;
}

export interface IPanelInstance extends Vue, Data, Methods, Computed, Props { }

export interface IPanelComponentOptions<D, M, C, P>
    extends ThisTypedComponentOptionsWithRecordProps<
    Vue,
    Data & D,
    IPanelInstance & D & M & C & P,
    IPanelInstance & D & M & C & P,
    Props & P
    > {
    computed?: IPanelInstance & D & M & C & P;
}

export type TPanelConstructor = VueConstructor<Data>;

declare const _default: VuePanel;
export default _default;

export const PanelEvent;
