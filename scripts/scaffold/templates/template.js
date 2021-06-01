const fs = require('fs');
const mustache = require('mustache');
const merge = require('lodash.merge');
mustache.tags = ['[[', ']]'];

const DEFAULT_CONFIG = {};

module.exports = class {
    /**
     * Constructor
     * @param {string} widgetNameFull   widget name @example 'MyCompany/Project/ElemTest'
     * @param {object} config           [config={}]
     */
    constructor(widgetNameFull, config = {}) {
        this.config = merge(DEFAULT_CONFIG, config);
        const {
            path: {
                project: { lib },
                core: { root: coreRootPath, panels: corePanelsPath, mixins: coreMixinsPath },
                common: { mixins: commonMixinsPath, utils: commonUtilsPath }
            }
        } = this.config;
        this.libPath = lib;
        this.corePath = coreRootPath;
        this.corePanelsPath = corePanelsPath;
        this.coreMixinsPath = coreMixinsPath;
        this.commonUtilsPath = commonUtilsPath;
        this.commonMixinsPath = commonMixinsPath;

        this.widgetPath = widgetNameFull;
        this.widgetName = widgetNameFull.substring(
            widgetNameFull.lastIndexOf('/') + 1,
            widgetNameFull.length
        );
        this.widgetDirPath = `${this.libPath}/${this.widgetPath}`;
        this.widgetLibPath =
            './' +
            widgetNameFull
                .split('/')
                .map(() => '..')
                .join('/');
    }
    /**
     * Build options
     * @param {Object} options
     * @return {Boolean|Error}  true if success; else error
     */
    async build(options) {
        if (this.widgetExists()) {
            return new Error(`${this.widgetPath} already exists`);
        }
        return true;
    }
    /**
     * Create widget files (elem, panel, dirs)
     * @param {object} tpl  compiled vue template files
     * @return {boolean|Error}  true if success; else error
     */
    createWidget({ elem, panel, panelDT, elemDT, descriptor, panelsIndex, readmeMd }) {
        this.createWidgetDir();
        const { path: panelPath, name: panelName } = this.config.panel;
        ['components', panelPath, `${panelPath}/components`].forEach((dir) =>
            this.createWidgetDir(dir)
        );
        this.createWidgetFile(`${this.widgetName}.vue`, elem);
        this.createWidgetFile(`${panelPath}/${panelName}.vue`, panel);

        if (panelDT) {
            this.createWidgetFile(`${panelPath}/${panelName}.d.ts`, panelDT);
        }
        if (panelsIndex) {
            this.createWidgetFile(`${panelPath}/index.js`, panelsIndex);
        }
        if (elemDT) {
            this.createWidgetFile(`${this.widgetName}.d.ts`, elemDT);
        }
        if (descriptor) {
            this.createWidgetFile(`descriptor.js`, descriptor);
        }
        if (readmeMd) {
            this.createWidgetFile(`README.MD`, readmeMd);
        }
        return true;
    }
    /**
     * Create a dir relative to the widget home dir
     * @param {?string} [dirPathRel=null]   dir relative path @example 'components'
     * @return {boolean|Error}
     */
    createWidgetDir(dirPathRel = null) {
        const path = dirPathRel ? `${this.widgetDirPath}/${dirPathRel}` : this.widgetDirPath;
        fs.mkdirSync(path, { recursive: true });
        return true;
    }
    /**
     * Create a file relative to the widget home dir
     * @param {string} pathRel   relative path @example 'components/readme.txt'
     * @return {boolean|Error}
     */
    createWidgetFile(pathRel, data) {
        fs.writeFileSync(`${this.widgetDirPath}/${pathRel}`, data);
        return true;
    }
    /**
     * Checks whether widget home dir exists
     * @return {boolean}
     */
    widgetExists() {
        return fs.existsSync(this.widgetDirPath);
    }
    /**
     * Compile
     * @param {string} path
     * @param {object} binds
     */
    compileTpl(path, binds) {
        const tpl = fs.readFileSync(path, 'utf8');
        return mustache.render(tpl, binds);
    }
};

/**
 *
 * @type {{DREMIO: string, HTTP_AUTH: string, HTTP: string}}
 */
module.exports.TransportType = Object.freeze({
    NONE: 'none',
    HTTP: 'http',
    HTTP_AUTH: 'httpAuth',
    DREMIO: 'http'
});
