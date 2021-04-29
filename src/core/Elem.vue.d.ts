import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import Vue, { AsyncComponent, VueConstructor, ComponentOptions as VueComponentOptions } from 'vue';

interface StoreState {
    [k as string]: any;
}

interface RouteManagerRoute {
    readonly path: string;
    readonly query: Record<string, null | undefined | string | number | boolean>;
    readonly meta: Record<string, any>;
}

/**
 * Elem events Lifecycle events
 */
export type ElemEvent = string;
export namespace ElemEvent {
    const CREATED: string;
    const MOUNTED: string;
    const DESTROYED: string;
}
import { getDescriptorDefaultProps } from './utils';
export { getDescriptorDefaultProps };

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
 * Component Instance 'props' ComponentOptions descriptor section members
 * @interface {Props}
 */
interface Props {
    readonly id: string;
    readonly type: string;
    readonly isEditorMode: boolean;
    readonly props: Record<string, any>;
}

/**
 * Component Instance 'computed' ComponentOptions descriptor section members
 * @interface {Computed}
 */
interface Computed {
    readonly $storeState: StoreState;
    readonly $routerCurrent: RouteManagerRoute;
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
    setEventBus(): void;
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

declare const _default: VueConstructor<Vue & Data & Methods & Computed & Props>;
export default _default;
