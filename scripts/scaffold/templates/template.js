const fs = require('fs');
const mustache = require('mustache');
const merge = require('lodash.merge');
mustache.tags = ['[[', ']]'];

const cwd = process.cwd();
const DEFAULT_CONFIG = {
    path: {
        home: __dirname,
        project: {
            home: cwd,
            src: `${cwd}/src`,
            lib: `${cwd}/src/lib`
        }
    },
    panel: {
        name: 'SettingsPanel',
        path: './panels'
    }
};

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
                project: { lib, core }
            }
        } = this.config;
        this.libPath = lib;
        this.corePath = core;
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
     * @param {Object} tpl  compiled vue template files
     * @return {Boolean|Error}  true if success; else error
     */
    createWidget({ elem, panel, panelDT, elemDT, descriptor }) {
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
        if (elemDT) {
            this.createWidgetFile(`${this.widgetName}.d.ts`, elemDT);
        }
        if (descriptor) {
            this.createWidgetFile(`descriptor.js`, descriptor);
        }
        return true;
    }
    /**
     * Create a dir relative to the widget home dir
     * @param {String} [dirPathRel=null]   dir relative path @example 'components'
     * @return {Boolean|Error}
     */
    createWidgetDir(dirPathRel = null) {
        const path = dirPathRel ? `${this.widgetDirPath}/${dirPathRel}` : this.widgetDirPath;
        fs.mkdirSync(path, { recursive: true });
        return true;
    }
    /**
     * Create a file relative to the widget home dir
     * @param {String} pathRel   relative path @example 'components/readme.txt'
     * @return {Boolean|Error}
     */
    createWidgetFile(pathRel, data) {
        fs.writeFileSync(`${this.widgetDirPath}/${pathRel}`, data);
        return true;
    }
    /**
     * Checks whether widget home dir exists
     * @return {Boolean}
     */
    widgetExists() {
        return fs.existsSync(this.widgetDirPath);
    }
    /**
     * Compile
     * @param {String} path
     * @param {Object} binds
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
