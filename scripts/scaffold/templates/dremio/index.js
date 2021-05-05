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
            lib: this.widgetLibPath,
            path: this.widgetPath,
            name: this.widgetName
        };
        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        return this.createWidget({ elem, panel });
    }
};
