const Template = require('../template.js');
const { TransportType } = require('../template.js');
const { Select } = require('enquirer');

const TRANSPORT_OPTION_TITLES = {
    [TransportType.NONE]: 'none (no transport)',
    [TransportType.HTTP]: 'http (no authorization)',
    [TransportType.HTTP_AUTH]: 'http-auth (with authorization support)'
};

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }
    async build(options) {
        super.build(options);

        const transport = await new Select({
            message: 'Select rest-api transport',
            choices: Object.entries(TRANSPORT_OPTION_TITLES).map(([value, message]) => ({
                value,
                message
            }))
        }).run();
        const tplPath = `${__dirname}/tpl`;
        const hasTransport = [TransportType.HTTP, TransportType.HTTP_AUTH].includes(transport);
        const tplBinds = {
            core: this.corePath,
            corePanels: this.corePanelsPath,
            coreMixins: this.coreMixinsPath,
            commonMixins: this.commonMixinsPath,
            commonUtils: this.commonUtilsPath,
            lib: this.libPath,
            path: this.widgetPath,
            name: this.widgetName,
            http: transport === TransportType.HTTP,
            httpAuth: transport === TransportType.HTTP_AUTH,
            httpAny: hasTransport,
            hasTransport: hasTransport,
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path
        };
        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const elemDT = this.compileTpl(`${tplPath}/elem.d.ts`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        const panelDT = this.compileTpl(`${tplPath}/panel.d.ts`, tplBinds);
        const panelsIndex = this.compileTpl(`${tplPath}/panels.index.js`, tplBinds);
        const descriptor = this.compileTpl(`${tplPath}/descriptor.js`, tplBinds);

        //
        const service = this.compileTpl(`${tplPath}/api/service.js`, tplBinds);
        this.createWidgetDir('api');
        this.createWidgetFile(`api/${this.widgetName}Service.js`, service);

        return this.createWidget({
            elem,
            panel,
            elemDT,
            panelDT,
            panelsIndex,
            descriptor,
            service
        });
    }
};
