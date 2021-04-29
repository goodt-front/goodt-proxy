import { EventBusBase, EventBusEvent } from './EventBus';

/**
 * @callback BrowseHandler
 * @param {{ options:FileManagerOptions, resolve:FileResolver}} options
 */
/**
 * @callback FileResolver
 * @param {FileInfo[]} files    files
 */
/**
 * @typedef {Object} FileManagerOptions
 * @property {boolean} selectMultiple       multiple file selection mode
 */
/**
 * @typedef {Object} FileInfo
 * @property {string} url   url
 * @property {string} name  name
 * @property {string} type  mime-type
 * @property {number} size  size in bytes
 * @property {string} hash  file hash
 */
let fileManager = null;
const fileManagerEnforcer = Symbol();
const eventBusInstance = new EventBusBase();

const FileManagerEvent = {
    BROWSE: 'browse'
};

export default class FileManager {
    /**
     * Constructor
     * @param {symbol} enforcer  singleton enforcer
     */
    constructor(enforcer) {
        if (enforcer !== fileManagerEnforcer) {
            throw new Error(`Instantiation failed: use FileManager.instance`);
        }
    }

    /**
     * @return {FileManager}
     */
    static get instance() {
        if (!fileManager) {
            fileManager = new FileManager(fileManagerEnforcer);
        }
        return fileManager;
    }

    /**
     * Invokes env file manager's browse method for file selection
     * @param {FileManagerOptions} options
     * @return {Promise<FileInfo[]>}
     */
    browse({ selectMultiple = true }) {
        return new Promise(resolve => {
            const options = { selectMultiple };
            eventBusInstance.trigger(new EventBusEvent(FileManagerEvent.BROWSE), {
                options,
                resolve
            });
        });
    }

    /**
     * Registers a browse() observer (used by the env)
     * @param {BrowseHandler} handler     browse handler invoked by @see browse()
     * @return {Function}                 dispose function to unregister observer
     */
    onBrowse(handler) {
        const event = new EventBusEvent(FileManagerEvent.BROWSE);
        return eventBusInstance.listen(event, (e, data) => handler(data));
    }
}
