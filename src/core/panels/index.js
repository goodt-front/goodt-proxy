export { default as DremioPanel } from './DremioPanel.vue';
export { default as StylePanel } from './StylePanel.vue';
export { default as VariablePanel } from './VariablePanel.vue';

const DremioPanelAsync = () => import('./DremioPanel.vue');
const StylePanelAsync = () => import('./StylePanel.vue');
const VariablePanelAsync = () => import('./VariablePanel.vue');

export { DremioPanelAsync, VariablePanelAsync, StylePanelAsync };
