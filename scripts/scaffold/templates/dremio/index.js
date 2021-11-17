const Template = require('../template.js');

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }

    get path() {
        return __dirname;
    }

    async build(options) {
        super.build(options);

        const tplBindings = {
            core: this.corePath,
            corePanels: this.corePanelsPath,
            coreMixins: this.coreMixinsPath,
            lib: this.widgetLibPath,
            path: this.widgetPath,
            name: this.widgetName,
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path
        };

        return this.createWidget({
            tplBindings
        });
    }
};
