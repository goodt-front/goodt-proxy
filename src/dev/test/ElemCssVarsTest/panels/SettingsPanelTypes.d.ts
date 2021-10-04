import { IDescriptorProps } from '@goodt-wcore/core';
import { IPanelComponentOptions, IPanelInstance } from '@goodt-wcore/core/Panel';
import { descriptor } from '../descriptor';

interface Data {}
interface Methods {}
interface Props {}
interface Computed extends IDescriptorProps<ReturnType<typeof descriptor>> {}

export interface IInstance extends IPanelInstance, Data, Methods, Computed, Props {}
export interface IComponentOptions
    extends IPanelComponentOptions<IInstance, Data, Methods, Computed, Props> {}

export type TInstance = IInstance & Computed;
