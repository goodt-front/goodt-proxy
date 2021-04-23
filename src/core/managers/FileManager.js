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
 * @property {Boolean} selectEnabled        file selection enabled
 * @property {Boolean} selectMultiple       multiple file selection mode
 */
/**
 * @typedef {Object} FileInfo
 * @property {String} url   url
 * @property {String} name  name
 * @property {String} type  mime-type
 * @property {Number} size  size in bytes
 * @property {String} hash  file hash
 */
let fileManager = null;
let fileManagerEnforcer = Symbol();
let eventBusInstance = new EventBusBase();

const FileManagerEvent = {
    BROWSE: 'browse'
};

export default class FileManager {
    /**
     * Constructor
     * @param {Symbol} enforcer  singleton enforcer
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
     * @return {Promise.<FileInfo[]>}
     */
    browse({ selectEnabled = true, selectMultiple = true }) {
        return new Promise(resolve => {
            const options = { selectEnabled, selectMultiple };
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
