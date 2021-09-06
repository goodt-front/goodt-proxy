import { IDescriptorProps } from '[[{core}]]';
import { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
[[#hasTransport]]
import { IApiServiceMixinInstance } from '@goodt-common/mixins';
import { ApiService } from './api';
[[/hasTransport]]
import { descriptor } from './descriptor';

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends IElemInstance, Data, Methods, Computed, Props {}
export type TInstance = IInstance [[#hasTransport]]& IApiServiceMixinInstance<ApiService>[[/hasTransport]] & Computed;

export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {}
