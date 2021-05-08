import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import Vue, { AsyncComponent, VueConstructor, ComponentOptions as VueComponentOptions } from 'vue';
import { ElemDescriptor } from '../types/core';
import { EventBusWrapper, EventBus } from '../managers/EventBus';
import { ValueObject } from '../managers/StoreManager';
import { Props as ElemDescriptorProps } from './config';

interface StoreState {
    [k as string]: ValueObject;
}

interface RouteManagerRoute {
    readonly path: string;
    readonly query: Record<string, null | undefined | string | number | boolean>;
    readonly meta: Record<string, any>;
}

/**
 * Component Instance 'data' ComponentOptions descriptor section members
 * @interface {Data}
 */
interface Data {
    cssClass: Record<string, string>;
    cssStyle: Record<string, string>;
    slotDefault: string;
    descriptor: ElemDescriptor;
}

/**
 * @interface PropsWithDescriptor
 */
export interface PropsWithDescriptor<P extends Record<string, any>, V extends Record<string, any>> {
    readonly props: P;
    readonly vars: V;
}

/**
 * Component Instance 'props' ComponentOptions descriptor section members
 * @interface Props
 * @extends PropsWithDescriptor<ElemDescriptorProps>
 * @see ElemDescriptorProps
 */
interface Props extends PropsWithDescriptor<ElemDescriptorProps> {
    readonly id: string;
    readonly type: string;
    readonly isEditorMode: boolean;
}

/**
 * Component Instance 'computed' ComponentOptions descriptor section members
 * @interface {Computed}
 */
interface Computed {
    readonly $storeState: StoreState;
    readonly $routeCurrent: RouteManagerRoute;
    readonly $eventBus: EventBusWrapper;
}

/**
 * Component Instance 'methods' ComponentOptions descriptor section members
 * @interface {Methods}
 */
interface Methods {
    _mounted(triggerEvents: boolean = true): void;
    genCssClass(): void;
    genCssStyle(): void;
    getSlotNames(): string[];
    getPanels(): AsyncComponent[];
    isChildAllowed(): boolean;
    super(componentOptions?: VueComponentOptions | VueConstructor): VueConstructor;
    /* event bus related */
    setEventBus(eventBus: EventBus): void;
    subscribe(): void;

    $storeCommit(state: StoreState): void;
    $c<T extends unknown>(constantName: T): T;
    $routeNavigate({ path, query = {} }: { path: string; query: Record<string, any> }): void;
}

export type ComponentOptions = ThisTypedComponentOptionsWithRecordProps<
    Vue,
    Data,
    Methods,
    Computed,
    Props
>;

export interface ElemInstance extends Vue, Data, Methods, Computed, Props {}

declare const _default: VueConstructor<ElemInstance>;
export default _default;
