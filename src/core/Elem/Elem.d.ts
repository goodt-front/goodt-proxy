import Vue, { AsyncComponent, VueConstructor, ComponentOptions as VueComponentOptions } from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';

import { EventBusWrapper, EventBus } from '../managers/EventBus';
import { Computed as StoreMixinComputed, Methods as StoreMixinMethods } from '../mixins/useStore';
import { Computed as RouterMixinComputed, Methods as RouterMixinMethods } from '../mixins/useRouter';

import VueElem from './Elem.vue';
import { descriptor } from './descriptor';
import { DescriptorProps } from './infra/types';

export type TDescriptorProps = ReturnType<typeof descriptor>;

/**
 * Component Instance 'data' ComponentOptions descriptor section members
 * @interface {Data}
 */
interface Data {
    cssClass: Record<string, string>;
    cssStyle: Record<string, string>;
    slotDefault: string;
    descriptor: ReturnType<typeof descriptor>;
    eventBusWrapper: EventBusWrapper;
}

interface Props {
    readonly id: string;
    readonly type: string;
    readonly initProps: object;
    readonly slotData: object;
    readonly isEditorMode: boolean;
}

/**
 * Component Instance 'computed' ComponentOptions descriptor section members
 */
interface Computed extends StoreMixinComputed, RouterMixinComputed {
    readonly props?: DescriptorProps;
    readonly varAliases: Record<string, any>;
    readonly $cssVars: Record<string, any>;
    readonly $cssVarsStatic: Record<string, any>;
    readonly $cssVarsCombined: Record<string, any>;
    readonly $eventBus: EventBusWrapper;
}

/**
 * Component Instance 'methods' ComponentOptions descriptor section members
 * @interface {Methods}
 */
interface Methods extends StoreMixinMethods, RouterMixinMethods {
    super(componentOptions?: VueComponentOptions): IElemInstance;
    _mounted(triggerEvents: boolean = true): void;

    genCssClass(): void;
    genCssStyle(): void;
    genCssVarsStyle(cssVars): Record<string, any>;
    buildCssVars(cssVarsMapping, props): Record<string, any>;
    getSlotNames(): string[];
    getPanels(): AsyncComponent[];
    isChildAllowed(type: string): boolean;

    /* event bus related */
    setEventBus(eventBus: EventBus): void;
    subscribe(): void;

    $c<T extends unknown>(constantName: T): T;
}

export interface IElemInstance extends Vue, Data, Methods, Computed, Props, Injected {}

export interface IElemComponentOptionsInternal
    extends ThisTypedComponentOptionsWithRecordProps<Vue, Data, IElemInstance, Computed, Props> {
    computed?: IElemInstance;
    static: Record<string, any>;
}

export interface IElemComponentOptions<IInstance, D, M, C, P>
    extends ThisTypedComponentOptionsWithRecordProps<
        IElemInstance & IInstance,
        Data & D,
        IElemInstance & IInstance & D & M & C & P,
        Computed & C,
        Props & P
    > {
    computed?: IElemInstance & IInstance & D & M & C & P;
    static: Record<string, any>;
}

declare module 'vue/types/options' {
    import Vue from 'vue';
    interface ComponentOptions<V extends Vue> {
        static?: Record<string, any>;
    }
}

export type TElemConstructor = VueConstructor<IElemInstance>;
declare const _default: VueElem & IElemComponentOptions;
export default _default;
