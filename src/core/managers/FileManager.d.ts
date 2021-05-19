export default class FileManager {
    /**
     * @return {FileManager}
     */
    static instance: FileManager;
    /**
     * Constructor
     *
     * @param {symbol} enforcer  singleton enforcer
     */
    constructor(enforcer: symbol);
    /**
     * Invokes env file manager's browse method for file selection
     *
     * @param {FileManagerOptions} options
     * @return {Promise<FileInfo[]>}
     */
    browse({ selectMultiple }: FileManagerOptions): Promise<FileInfo[]>;
    /**
     * Registers a browse() observer (used by the env)
     *
     * @param {BrowseHandler} handler     browse handler invoked by @see browse()
     * @return {Function}                 dispose function to unregister observer
     */
    onBrowse(handler: BrowseHandler): Function;
}

export type BrowseHandler = (options: {
    options: FileManagerOptions;
    resolve: FileResolver;
}) => any;

export type FileResolver = (files: FileInfo[]) => any;
export type FileManagerOptions = {
    /**
     * multiple file selection mode
     */
    selectMultiple: boolean;
};

export type FileInfo = {
    /**
     * url
     */
    url: string;
    /**
     * name
     */
    name: string;
    /**
     * mime-type
     */
    type: string;
    /**
     * size in bytes
     */
    size: number;
    /**
     * file hash
     */
    hash: string;
};
