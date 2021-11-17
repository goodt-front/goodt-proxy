import { IDescriptorProps } from '[[{core}]]';
import { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';

import { descriptor } from '../descriptor';

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends IElemInstance, Data, Methods, Computed, Props {}
export type TInstance = IInstance & Computed;

export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {}
