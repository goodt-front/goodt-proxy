import { ExtendedVue } from 'vue/types/vue';
import { IDescriptorProps } from '[[{core}]]';
import Elem, { IElemComponentOptions, IElemInstance } from '[[{core}]]/Elem';
import { descriptor } from './descriptor';

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends ExtendedVue, IElemInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions extends IElemComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: typeof Elem;
}
