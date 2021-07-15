import Panel, {
    IPanelComponentOptions,
    IPanelComponentOptionsInternal,
    IPanelInstance
} from '@goodt-wcore/Panel';

interface Methods {}
interface Computed {}
interface Data {}
interface Props {}

export interface IInstance extends IPanelInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions
    extends IPanelComponentOptions<IInstance, Data, Methods, Computed, Props> {
    extends: IPanelComponentOptionsInternal;
}
