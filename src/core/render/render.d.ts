import { CreateElement, VNodeData, VNode } from 'vue';

export type ElemInfo = {
    /**
     * id
     */
    id: string;
    /**
     * type
     */
    type: string;
    /**
     * props
     */
    props: object;
    /**
     * component def
     */
    component: import('vue/types/options').AsyncComponentFactory;
    /**
     * children
     */
    children: ElemInfo[];
};
/**
 * @typedef {object} ElemInfo
 * @property {string} id            id
 * @property {string} type          type
 * @property {object} props         props
 * @property {import('vue/types/options').AsyncComponentFactory} component     component def
 * @property {ElemInfo[]} children  children
 * @return {import("vue/types/umd").VNode[]}
 */
/**
 * Recursively renders elems' collection
 * @param {import('vue').CreateElement} h                   createElement function provided by vue
 * @param {ElemInfo} elemInfo                               elem info
 * @param {import('vue').VNodeData} [vnodeData={}]          vnode data addon options
 * @param {boolean} [isEditorMode=false]                    editor mode
 * @param {object} [slotData={}]                            slot data object (holds the scoped slot context)
 * @return {import("vue/types/umd").VNode}
 */
export function render(
    h: CreateElement,
    elemInfo: ElemInfo,
    vnodeData?: VNodeData,
    isEditorMode?: boolean,
    slotData?: object
): VNode;

export function createRenderFactory(
    h: CreateElement,
    elemInfo: ElemInfo,
    vnodeData?: VNodeData,
    isEditorMode?: boolean,
    slotData?: object
): () => VNode;
