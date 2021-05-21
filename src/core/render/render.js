const identity = (x) => x;

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
 * @param {import('vue').VNodeData|((ei:ElemInfo) => import('vue').VNodeData)} [vnodeData={}]          vnode data addon options
 * @param {boolean} [isEditorMode=false]                    editor mode
 * @param {object} [slotData={}]                            slot data object (holds the scoped slot context)
 * @return {import("vue/types/umd").VNode}
 */

const createRenderThunk = (h, elemInfo, vnodeData = {}, isEditorMode = false, slotData = {}) => {
    const cache = new Map();
    // we are mapping our nodes array to a hash keyed by 'slot'
    /** @type {Object.<string, ElemInfo[]>} */
    const slots = elemInfo.children.reduce((obj, child) => {
        const slotName = child.props.slot || 'default';
        // eslint-disable-next-line
        obj[slotName] = obj[slotName] ?? [];
        obj[slotName].push(child);
        return obj;
    }, {});
    // next we need to transform our hash values a factory methods
    /** @type {Object.<string, (props:object) => import("vue/types/umd").VNode[]>} */
    const scopedSlots = Object.entries(slots).reduce((slotsAccum, [slotName, slotElemInfos]) => {
        const slotElemRenderFns = slotElemInfos.map((slotElemInfo) =>
            createRenderThunk(h, slotElemInfo, vnodeData, isEditorMode)
        );

        const scopedSlot = (props) => {
            const mergeFn = (data) => ({
                ...data,
                props: {
                    ...data.props,
                    slotData: {
                        ...data.props.slotData,
                        props
                    }
                }
            });

            return slotElemRenderFns.map((render) => render({ mergeFn }));
        };

        return {
            ...slotsAccum,
            [slotName]: scopedSlot
        };
    }, {});
    const { id, type, props } = elemInfo;
    const dataAddon = typeof vnodeData === 'function' ? vnodeData(elemInfo) : vnodeData;
    const data = {
        props: { id, type, initProps: props, slotData, isEditorMode },
        scopedSlots,
        key: elemInfo.id,
        ...dataAddon
    };

    // create vnode
    return ({ mergeFn = identity } = {}) => h(elemInfo.component, mergeFn(data));
};

const render = (...args) => createRenderThunk(...args).call();

export { createRenderThunk, render };
