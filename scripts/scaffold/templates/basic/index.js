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
            coreNetPath: this.coreNetPath,
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
        const servicePath = 'api';

        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const elemTypesDT = this.compileTpl(`${tplPath}/elem.types.d.ts`, tplBinds);
        const elemDT = this.compileTpl(`${tplPath}/elem.d.ts`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        const panelTypesDT = this.compileTpl(`${tplPath}/panel.types.d.ts`, tplBinds);
        const panelDT = this.compileTpl(`${tplPath}/panel.d.ts`, tplBinds);
        const panelsIndex = this.compileTpl(`${tplPath}/panels.index.js`, tplBinds);
        const descriptor = this.compileTpl(`${tplPath}/descriptor.js`, tplBinds);
        const style = this.compileTpl(`${tplPath}/style.less`, tplBinds);
        const readmeMd = this.compileTpl(`${tplPath}/README.MD`, tplBinds);
        const serviceMain = this.compileTpl(`${tplPath}/${servicePath}/service.js`, tplBinds);
        const serviceUtils = this.compileTpl(`${tplPath}/${servicePath}/utils.js`, tplBinds);
        const widgetCreated = this.createWidget({
            elem,
            panel,
            elemDT,
            elemTypesDT,
            panelDT,
            panelTypesDT,
            panelsIndex,
            descriptor,
            readmeMd
        });
        this.createWidgetDir(servicePath);
        this.createWidgetFile(`style.less`, style);
        this.createWidgetFile(`${servicePath}/service.js`, serviceMain);
        this.createWidgetFile(`${servicePath}/utils.js`, serviceUtils);

        return widgetCreated;
    }
};
