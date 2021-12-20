// @ts-check

/**
 * @typedef {import('./tree').AppEntityElem} AppEntityElem
 */

class Queue {
    _array = [];
    
    /**
     * @param {AppEntityElem[]} array - started array of nodes
     */
    constructor(array) {
        this.enqueue(array);
    }

    /**
     * @param {AppEntityElem[]} nodes - nodes for interaction
     * @param {(AppEntityElem|null)=null} parent - parent node of nodes
     */
    enqueue(nodes, parent = null) {
        this._array.push(...nodes.map(this.mapper(parent)));
    }

    /**
     * @return {[AppEntityElem, AppEntityElem]} - first element in queue
     */
    dequeue() {
        return this._array.shift();
    }
    
    /**
     * @param {AppEntityElem|null=null} parent
     * @return {(AppEntityElem) => [AppEntityElem, AppEntityElem|null]}
     */
    mapper(parent = null) {
        return (node) => [node, parent];
    }
    
    /**
     * @return {boolean} - shows queue is empty or not
     */
    get isEmpty() {
        return this._array.length === 0;
    }
}

/**
 * finds node in the tree by the "match" function and returns it
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {Object|null}
 */
function findNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);

    while (!nodeQueue.isEmpty) {
        const [currentNode] = nodeQueue.dequeue();
        if (match(currentNode)) {
            return currentNode;
        }
        nodeQueue.enqueue(currentNode[childrenProp], currentNode);
    }

    return null;
}

/**
 * find parent of node in the tree by the "match" function and returns it
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {Object|null}
 */
function findParentNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);

    while (!nodeQueue.isEmpty) {
        const [currentNode] = nodeQueue.dequeue();
        // eslint-disable-next-line no-restricted-syntax
        for (const childNode of currentNode[childrenProp]) {
            if (match(childNode)) {
                return currentNode;
            }
        }
        nodeQueue.enqueue(currentNode[childrenProp], currentNode);
    }

    return null;
}

/**
 * finds node in the tree by the "match" function, delete it and returns boolean
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem) => boolean} match
 * @return {boolean}
 */
function deleteNode(array, childrenProp, match) {
    const nodeQueue = new Queue(array);

    while (!nodeQueue.isEmpty) {
        const [currentNode, parentNode] = nodeQueue.dequeue();
        if (match(currentNode)) {
            const currentNodeIndex = parentNode[childrenProp].findIndex(match);
            parentNode[childrenProp].splice(currentNodeIndex, 1);
            return true;
        }
        nodeQueue.enqueue(currentNode[childrenProp], currentNode);
    }

    return false;
}

/**
 * apply callback function for each node in the tree or subtree
 * @param {AppEntityElem[]} array
 * @param {string} childrenProp
 * @param {(node: AppEntityElem, parentNode?: AppEntityElem) => void} callback
 */
function traverse(array, childrenProp, callback) {
    const nodeQueue = new Queue(array);

    while (!nodeQueue.isEmpty) {
        const [currentNode, parentNode] = nodeQueue.dequeue();
        callback(currentNode, parentNode);
        nodeQueue.enqueue(currentNode[childrenProp], currentNode);
    }
}

export { traverse, findNode, findParentNode, deleteNode };
