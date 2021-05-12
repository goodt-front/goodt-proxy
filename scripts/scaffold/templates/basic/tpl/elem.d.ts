import { IDescriptorProps } from '[[{core}]]';
import Elem, { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
import { descriptor } from './descriptor';
[[#hasTransport]]
import { TransportMixinComputed } from '@goodt/core/mixins/useTransport';
[[/hasTransport]]

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>>[[#hasTransport]],
    TransportMixinComputed[[/hasTransport]] {}

export interface IInstance extends IElemInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions extends IElemComponentOptions<Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
