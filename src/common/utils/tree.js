// @ts-check
/**
 * @typedef {object} AppEntityElem
 * @property {string} id - id of element
 * @property {string} pid - parent id of element
 * @property {string} type - type of element
 * @property {object} props - props of element
 * @property {boolean} visible - visibility of element
 * @property {AppEntityElem[]} children - children of element
 */
class Queue {
    /**
     * @param {AppEntityElem[]} array - started array of nodes
     */
    constructor(array) {
        this._array = [...array];
    }
    
    /**
     * @param {AppEntityElem[]} value - nodes for interaction
     */
    enqueue(value) {
        this._array.push(...value);
    }
    
    /**
     * @return {AppEntityElem} - first element in queue
     */
    
    dequeue() {
        return this._array.shift();
    }
    
    /**
     * @return {boolean} - shows queue is empty or not
     */
    get isEmpty() {
        return this._array.length === 0;
    }
}
/**
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {Function} match
 * @return {Object|null}
 */
function findNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);
    
    while (!nodeQueue.isEmpty) {
        const currentNode = nodeQueue.dequeue();
        if (match(currentNode)) {
            return currentNode;
        }
        nodeQueue.enqueue(currentNode[childrenProp]);
    }
    
    return null;
}
/**
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {Function} match
 * @return {Object|null}
 */
function findParentNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);
    
    while (!nodeQueue.isEmpty) {
        const currentNode = nodeQueue.dequeue();
        // eslint-disable-next-line no-restricted-syntax
        for (const childNode of currentNode[childrenProp]) {
            if (match(childNode)) {
                return currentNode;
            }
        }
        nodeQueue.enqueue(currentNode[childrenProp]);
    }
    
    return null;
}
/**
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {Function} match
 * @return {boolean}
 */
function deleteNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);
    
    while (!nodeQueue.isEmpty) {
        const currentNode = nodeQueue.dequeue();
        if (match(currentNode)) {
            const parentNode = findParentNode(array, childrenProp, match);
            const currentNodeIndex = parentNode[childrenProp].findIndex(match);
            parentNode[childrenProp].splice(currentNodeIndex, 1);
            return true;
        }
        nodeQueue.enqueue(currentNode[childrenProp]);
    }
    
    return false;
}
/**
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {Function} callback
 */
function traverse(array, childrenProp, callback) {
    const nodeQueue = new Queue(array);
    
    while (!nodeQueue.isEmpty) {
        const currentNode = nodeQueue.dequeue();
        const parentNode = findParentNode(array, childrenProp, ({ id }) => id === currentNode.id);
        callback(currentNode, parentNode);
        nodeQueue.enqueue(currentNode[childrenProp]);
    }
}

export { traverse, findNode, findParentNode, deleteNode };
