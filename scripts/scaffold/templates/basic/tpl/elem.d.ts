import Elem, { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
import { IDescriptorProps } from '[[{core}]]';
import { descriptor } from './descriptor';

// const a: ReturnType<typeof descriptorStatic> = {

// };

interface Methods {}
interface Computed {}
interface Data {}
type Props = IDescriptorProps<ReturnType<typeof descriptor>>; // { }

export interface IInstance extends IElemInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions extends IElemComponentOptions<Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
