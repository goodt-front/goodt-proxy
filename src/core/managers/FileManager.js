import { EventBus, EventBusEvent } from './EventBus';

/**
 * @typedef {Object} FileManagerOptions
 * @property {Boolean} selectEnabled       доступен ли выбор файла
 * @property {Boolean} selectMultiple      доступен ли выбор нескольких файлов
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
let eventBusInstance = new EventBus();

const FileManagerEvent = {
    OPEN: 'open',
    CLOSE: 'close',
    SELECT: 'select'
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
        /** @type {FileInfo[]} */
        this._files = [];
        /** @type {Function} */
        this._closeDispose = null;
        /** @type {Function} */
        this._selectDispose = null;
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
     * Invoke file browse
     * @param {FileManagerOptions} options
     * @return {Promise.<FileInfo[]>}
     */
    browse({ selectEnabled = true, selectMultiple = true }) {
        /**
         * @param {FileInfo[]} files
         * @param {Function} resolve
         */
        let onSelectFile = (files, resolve) => {
            this._files = files;
            this._selectDispose = null;
            this._closeDispose();
            this._closeDispose = null;
            resolve(files);
        };
        /**
         * @param {Function} resolve
         */
        let onCloseFileManager = resolve => {
            this._closeDispose = null;
            this._selectDispose();
            this._selectDispose = null;
            resolve([]);
        };

        const promise = new Promise(resolve => {
            this._closeDispose = eventBusInstance.listen(
                new EventBusEvent(FileManagerEvent.CLOSE),
                () => onCloseFileManager(resolve),
                true
            );
            this._selectDispose = eventBusInstance.listen(
                new EventBusEvent(FileManagerEvent.SELECT),
                (e, files) => onSelectFile(files, resolve),
                true
            );
        });
        eventBusInstance.trigger(new EventBusEvent(FileManagerEvent.OPEN), {
            selectEnabled,
            selectMultiple
        });
        return promise;
    }
    /**
     * Register a route change handler
     * @param {Function} handler    handler
     * @return {Function}           dispose function to unregister handler
     */
    onBrowse(handler) {
        return eventBusInstance.listen(new EventBusEvent(FileManagerEvent.OPEN), handler, false);
    }
    /**
     * Trigger close selection
     */
    close() {
        eventBusInstance.trigger(new EventBusEvent(FileManagerEvent.CLOSE));
    }
    /**
     * Trigger file selection
     * @param {FileInfo[]} files
     */
    select(files) {
        eventBusInstance.trigger(new EventBusEvent(FileManagerEvent.SELECT), files);
    }
}
