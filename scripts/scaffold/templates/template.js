const fs = require('fs');
const mustache = require('mustache');
mustache.tags = ['[[', ']]'];

module.exports = class {
    /**
     * Constructor
     * @param {String} widgetNameFull   widget name @example 'MyCompany/Project/ElemTest'
     * @param {Object} config           config
     */
    constructor(widgetNameFull, config) {
        this.config = config;
        this.libPath = config.path.project.lib;
        this.corePath = config.path.project.core;
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
    createWidget({ elem, panel }) {
        this.createWidgetDir();
        ['components', 'panels', 'panels/components'].forEach((dir) => this.createWidgetDir(dir));
        this.createWidgetFile(`${this.widgetName}.vue`, elem);
        this.createWidgetFile(`panels/SettingsPanel.vue`, panel);
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
