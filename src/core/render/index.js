/**
 * @typedef {object} ElemInfo
 * @property {string} id            id
 * @property {string} type          type
 * @property {object} props         props
 * @property {string} slot          slot name
 * @property {object} component     component options
 * @property {ElemInfo[]} children  children
 * @return {import("vue/types/umd").VNode[]}
 */
/**
 * Recursively renders elems' collection
 * @param {import("vue").CreateElement} h       createElement function provided by vue
 * @param {ElemInfo} elem                       elem
 * @param {import("vue").VNodeData} vnodeData   additional VNodeData to share across all vnodes (used by the editor env)
 * @param {object} [slotData={}]                slot data object (holds the scoped slot context)
 * @return {import("vue/types/umd").VNode}
 */
export default function render(h, elem, vnodeData = {}, slotData = {}) {
    // we are mapping our nodes array to a hash keyed by 'slot'
    /** @type {Object.<string, ElemInfo[]>} */
    const slots = elem.children.reduce((obj, child) => {
        const slotName = elem.slot || 'default';
        // eslint-disable-next-line
        obj[slotName] = obj[slotName] ?? [];
        obj[slotName].push(child);
        return obj;
    }, {});
    // next we need to transform our hash values a factory methods
    /** @type {Object.<string, (props:object) => import("vue/types/umd").VNode[]>} */
    const scopedSlots = Object.entries(slots).reduce((obj, [slotName, slotNodes]) => {
        // eslint-disable-next-line
        obj[slotName] = props => slotNodes.map(slotElem => render(h, slotElem, vnodeData, props));
        return obj;
    }, {});
    const { id, type, props } = elem;
    // render vnode now
    const vnode = h(elem.component, {
        props: { id, type, props, slotData },
        scopedSlots,
        key: elem.id,
        ...vnodeData
    });
    return vnode;
}
