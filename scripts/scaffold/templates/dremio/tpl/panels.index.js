import { DremioPanelAsync } from '[[{corePanels}]]';
const [[{panelName}]]Async = () => import('./[[{panelName}]].vue');

export default [DremioPanelAsync, [[{panelName}]]Async];
