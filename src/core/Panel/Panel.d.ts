import Vue, { VueConstructor } from 'vue';
import { ElemDescriptor } from '../types/core';
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

interface Props<T = {}> extends T {
    elementInstance?: Vue;
    initProps?: boolean;
}

interface Computed<T = {}> extends T {}

interface Data<T = {}> extends T {
    /** @type {PanelMetaData} panel meta data (used by the editor env) */
    $meta?: PanelMetaData;
    /** @mutable elem instance props { key:value } */
    props?: {};
    /** @type {ElemDescriptor} elem descriptor */
    descriptor?: ElemDescriptor;
}

export interface IPanelInstance extends Vue, Data, Methods, Computed, Props {}

export interface IPanelComponentOptions<D, M, C, P>
    extends ThisTypedComponentOptionsWithRecordProps<
        Vue,
        Data & D,
        IPanelInstance & D & M & C & P,
        IPanelInstance & D & M & C & P,
        Props & P
    > {}

export type TPanelConstructor = VueConstructor<Data>;

declare const _default: VuePanel;
export default _default;

export const PanelEvent;
