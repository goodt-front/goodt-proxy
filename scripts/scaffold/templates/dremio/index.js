const Template = require('../template.js');

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }
    async build(options) {
        super.build(options);

        const tplPath = `${__dirname}/tpl`;
        const tplBinds = {
            core: this.corePath,
            corePanels: this.corePanelsPath,
            coreMixins: this.coreMixinsPath,
            lib: this.widgetLibPath,
            path: this.widgetPath,
            name: this.widgetName,
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path
        };
        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const elemDT = this.compileTpl(`${tplPath}/elem.d.ts`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        const panelDT = this.compileTpl(`${tplPath}/panel.d.ts`, tplBinds);
        const panelsIndex = this.compileTpl(`${tplPath}/panels.index.js`, tplBinds);
        const descriptor = this.compileTpl(`${tplPath}/descriptor.js`, tplBinds);
        const readmeMd = this.compileTpl(`${tplPath}/README.MD`, tplBinds);

        return this.createWidget({
            elem,
            panel,
            elemDT,
            panelDT,
            panelsIndex,
            descriptor,
            readmeMd
        });
    }
};
