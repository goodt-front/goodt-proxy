import { IDescriptorProps } from '[[{core}]]';
import Elem, { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
[[#hasTransport]]
import { IServiceMixinInstance } from '@goodt/common/mixins';
import { ITransportMixinInstance } from '[[{coreMixins}]]';
import { [[{name}]]Service } from './api/[[{name}]]Service';
[[/hasTransport]]
import { descriptor } from './descriptor';


interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends IElemInstance,
    [[#hasTransport]]ITransportMixinInstance,
    IServiceMixinInstance<InstanceType<typeof [[{name}]]Service>>,[[/hasTransport]]
    Data, Methods, Computed, Props {}
export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
