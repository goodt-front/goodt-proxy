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

const createRenderFactory = (h, elemInfo, vnodeData = {}, isEditorMode = false, slotData = {}) => {
    // we are mapping our nodes array to a hash keyed by 'slot'
    /** @type {Object.<string, ElemInfo[]>} */
    const slots = elemInfo.children.reduce((slotsAcc, child) => {
        const slotName = child.props.slot || 'default';
        // eslint-disable-next-line
        slotsAcc[slotName] = slotsAcc[slotName] ?? [];
        slotsAcc[slotName].push(child);

        return slotsAcc;
    }, {});
    // next we need to transform our hash values a factory methods
    /** @type {Record<string, function (props: object): import("vue/types/vue").VNode[]>} */
    const scopedSlots = Object.entries(slots).reduce((accSlots, [slotName, slotElemInfos]) => {
        const slotElemRenderFns = slotElemInfos.map((slotElemInfo) =>
            createRenderFactory(h, slotElemInfo, vnodeData, isEditorMode)
        );

        const scopedSlot = (props) => {
            const buildData = (data) => ({
                ...data,
                props: {
                    ...data.props,
                    slotData: {
                        ...data.props.slotData,
                        ...props
                    }
                }
            });

            return slotElemRenderFns.map((render) => render({ buildData }));
        };

        return {
            ...accSlots,
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
    return ({ buildData = identity } = {}) => h(elemInfo.component, buildData(data));
};

const render = (...args) => createRenderFactory(...args).call();

export { createRenderFactory, render };
