/**
 * @typedef {object} AppEntityElem
 * @property {string} id - id of element
 * @property {string} pid - parent id of element
 * @property {string} type - type of element
 * @property {object} props - props of element
 * @property {boolean} visible - visibility of element
 * @property {AppEntityElem[]} children - children of element
 */
type AppEntityElem = {
    id: string,
    pid?: string,
    type: string,
    props: {[key: string]: any},
    visible: boolean,
    children: AppEntityElem[]
}

type ChildrenProp = 'children'

class Queue {
    _array: AppEntityElem[];

    constructor (array: AppEntityElem[]);

    /**
     * @param {AppEntityElem[]} nodes - nodes for interaction
     * @param {(AppEntityElem|null)=null} parent - parent node of nodes
     */
    enqueue(nodes: AppEntityElem[], parent?: AppEntityElem|null = null): void

    /**
     * @return {[AppEntityElem, AppEntityElem|null]} - first element in queue and his parent
     */
    dequeue(): [AppEntityElem, AppEntityElem|null]

    /**
     * @param {AppEntityElem|null=null} parent
     * @return {(AppEntityElem) => [AppEntityElem, AppEntityElem|null]}
     */
    mapper(parent: AppEntityElem|null = null): (node: AppEntityElem) => [AppEntityElem, AppEntityElem|null]

    /**
     * @return {boolean} - shows queue is empty or not
     */
    get isEmpty(): boolean
}

/**
 * finds node in the tree by the "match" function and returns it
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {Object|null}
 */
export function findNode(array: AppEntityElem[], childrenProp: ChildrenProp, match: (node: AppEntityElem) => boolean): AppEntityElem|null;

/**
 * find parent of node in the tree by the "match" function and returns it
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {Object|null}
 */
export function findParentNode(array: AppEntityElem[], childrenProp: ChildrenProp, match: (node: AppEntityElem) => boolean): AppEntityElem|null;

/**
 * finds node in the tree by the "match" function, delete it and returns boolean
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {boolean}
 */
export function deleteNode(array: AppEntityElem[], childrenProp: ChildrenProp, match: (node: AppEntityElem) => boolean): boolean;

/**
 * apply callback function for each node in the tree or subtree
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem, parentNode?: AppEntityElem): void} callback
 */
export function traverse(array: AppEntityElem[], childrenProp: ChildrenProp, callback: (node: AppEntityElem, parentNode?: AppEntityElem) => void);
