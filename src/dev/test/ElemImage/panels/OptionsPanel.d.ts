import Panel, { IPanelComponentOptions, IPanelInstance } from '@goodt/core/Panel';

interface Methods { }
interface Computed { }
interface Data { }
interface Props { }

export interface IInstance extends IPanelInstance, Data, Methods, Computed, Props { }
export interface IComponentOptions extends IPanelComponentOptions<Data, Methods, Computed, Props> {
    extends: typeof Panel
}
