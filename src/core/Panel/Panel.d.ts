import { ElemDescriptor } from '../types/core';
import Vue, { VueConstructor, WatchOptionsWithHandler } from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';

type PanelMetaData = {
    /**
     * panel name
     */
    name: string;
    /**
     * mdi icon class
     */
    icon: string;
};

interface Methods {
    /**
     * Notifies env that the 'props' object has changed (used by the editor env)
     * @param {?String} [propName=null]     property to update from the 'props' object or null to replace the whole 'props' object
     */
    propChanged(propName?: string): void;
}

interface Props {
    elementInstance: Vue;
    initProps: boolean;
}

interface Data {
    /** @type {PanelMetaData} panel meta data (used by the editor env) */
    $meta: PanelMetaData;
    /** @mutable elem instance props { key:value } */
    props: {};
    /** @type {ElemDescriptor} elem descriptor */
    descriptor: ElemDescriptor;
}

interface Watch {
    initProps: WatchOptionsWithHandler;
}

export type ComponentOptions = ThisTypedComponentOptionsWithRecordProps<Vue, Data, Methods, Props>;

declare const _default: VueConstructor<Vue & Data & Methods & Computed & Props>;
export default _default;
