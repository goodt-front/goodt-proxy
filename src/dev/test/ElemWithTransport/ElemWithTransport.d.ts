import Elem, { IElemComponentOptions, IElemInstance } from '@goodt/core/Elem';
import { ITransportMixinInstance } from '@goodt/core/mixins/useTransport';
import { IDescriptorProps } from '@goodt/core';
import { descriptor } from './descriptor';

interface Methods {}

interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

interface Data {}

interface Props {}

export interface IInstance
    extends IElemInstance,
        ITransportMixinInstance,
        Data,
        Methods,
        Computed,
        Props {}
export interface IComponentOptions
    extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
