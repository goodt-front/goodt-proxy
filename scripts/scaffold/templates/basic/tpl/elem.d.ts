import { IDescriptorProps } from '[[{core}]]';
import { IElemComponentOptions, IElemInstance, IElemComponentOptionsInternal } from '[[{core}]]/Elem';
[[#hasTransport]]
import { IApiServiceMixinInstance } from '@goodt/common/mixins';
import { [[{name}]]Service } from './api/[[{name}]]Service';
[[/hasTransport]]
import { descriptor } from './descriptor';

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export type IInstance = IElemInstance &
    [[#hasTransport]]
    IApiServiceMixinInstance<InstanceType<typeof [[{name}]]Service>> &
    [[/hasTransport]]
    Data & Methods & Computed & Props

export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: typeof IElemComponentOptionsInternal;
}
