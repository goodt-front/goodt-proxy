const fs = require('fs');
const path = require('path');
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
                core: { root: coreRootPath, panels: corePanelsPath, mixins: coreMixinsPath, net: coreNetPath },
                common: { mixins: commonMixinsPath, utils: commonUtilsPath }
            }
        } = this.config;
        this.libPath = lib;
        this.corePath = coreRootPath;
        this.corePanelsPath = corePanelsPath;
        this.coreMixinsPath = coreMixinsPath;
        this.coreNetPath = coreNetPath;
        this.commonUtilsPath = commonUtilsPath;
        this.commonMixinsPath = commonMixinsPath;

        this.widgetPath = widgetNameFull;
        this.widgetName = widgetNameFull.substring(widgetNameFull.lastIndexOf('/') + 1, widgetNameFull.length);
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
    createWidget({ tplBindings, tplPath = this.tplPath }) {
        this.createWidgetDir();
        const { path: panelPath, name: panelName } = this.config.panel;
        const { path: typesPath } = this.config.types;

        ['components', panelPath, `${panelPath}/components`, 'types'].forEach((dir) => this.createWidgetDir(dir));
        this.buildWidgetFile(`${tplPath}/elem.vue`, `${this.widgetName}.vue`, tplBindings);
        this.buildWidgetFile(`${tplPath}/elem.types.d.ts`, `${typesPath}/${this.widgetName}.d.ts`, tplBindings);
        this.buildWidgetFile(`${tplPath}/panel.vue`, `${panelPath}/${panelName}.vue`, tplBindings);
        this.buildWidgetFile(`${tplPath}/panel.types.d.ts`, `${typesPath}/${panelName}.d.ts`, tplBindings);
        this.buildWidgetFile(`${tplPath}/panels.index.js`, `${panelPath}/index.js`, tplBindings);
        this.buildWidgetFile(`${tplPath}/descriptor.js`, `descriptor.js`, tplBindings);
        this.buildWidgetFile(`${tplPath}/README.MD`, `README.MD`, tplBindings);
        this.buildWidgetFile(`${tplPath}/style.less`, `style.less`, tplBindings);
        this.createWidgetFile(`constants.js`, '/* place constant values, magic number semantic explanations here */');
        this.createWidgetFile(
            `config.js`,
            '/* place render data: texts, ui control settings, options lists, css class and styles map here */'
        );
        this.createWidgetFile(`utils.js`, '/* place utility functions here */');

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
     * Build file from source and place relative to the widget home dir
     * @param {string} sourcePathAbs   absolute source path
     * @param {string} targetPathRel   relative path @example 'components/readme.txt'
     * @param {object} bindings
     * @return {boolean|Error}
     */
    buildWidgetFile(sourcePathAbs, targetPathRel, bindings) {
        const data = this.compileTpl(sourcePathAbs, bindings);
        fs.writeFileSync(`${this.widgetDirPath}/${targetPathRel}`, data);
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
     * @param {string} sourcePathAbs absolute source path
     * @param {object} bindings
     */
    compileTpl(sourcePathAbs, bindings) {
        const tpl = fs.readFileSync(sourcePathAbs, 'utf8');
        return mustache.render(tpl, bindings);
    }

    /**
     *
     * @return {string}
     */
    get path() {
        return __dirname;
    }
    /**
     *
     * @return {string}
     */
    get tplPath() {
        return path.resolve(this.path, this.config.path.templates);
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
    DREMIO: 'http',
    GQL: 'graphql'
});
