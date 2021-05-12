import { IDescriptorProps } from '[[{core}]]';
import Panel, { IPanelComponentOptions, IPanelInstance } from '[[{core}]]/Panel';
import { descriptor } from '../descriptor';

interface Data {}
interface Methods {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}
interface Props {}

export interface IInstance extends IPanelInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions extends IPanelComponentOptions<Data, Methods, Computed, Props> {
    extends: typeof Panel;
}
