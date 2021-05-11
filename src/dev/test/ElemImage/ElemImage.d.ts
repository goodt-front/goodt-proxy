import Elem, { IElemComponentOptions, IElemInstance } from '@goodt/core/Elem';
import { IDescriptorProps } from '@goodt/core';
import { descriptor } from './descriptor';

interface Methods { }
interface Computed { }
interface Data { }
type Props = IDescriptorProps<ReturnType<typeof descriptor>>; // { }

export interface IInstance extends IElemInstance, Data, Methods, Computed, Props { }
export interface IComponentOptions extends IElemComponentOptions<Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
