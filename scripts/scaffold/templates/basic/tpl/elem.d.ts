import { IDescriptorProps } from '[[{core}]]';
import Elem, { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
import { descriptor } from './descriptor';
[[#hasTransport]]
import { ITransportMixinInstance } from '[[{coreMixins}]]/useTransport';
[[/hasTransport]]

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends IElemInstance, [[#hasTransport]]ITransportMixinInstance,[[/hasTransport]] Data, Methods, Computed, Props {}
export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
