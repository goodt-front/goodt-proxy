const Template = require('../template.js');
const { TransportType } = require('../template.js');
const { Select } = require('enquirer');

const TRANSPORT_OPTION_TITLES = {
    [TransportType.NONE]: 'none (no Api Service)',
    [TransportType.HTTP_AUTH]: 'Auth Api Service'
};

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }

    get path() {
        return __dirname;
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

        const hasTransport = [TransportType.HTTP, TransportType.HTTP_AUTH].includes(transport);
        const tplBindings = {
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

        this.createWidget({
            tplBindings
        });

        if (hasTransport) {
            const servicePath = 'api';
            this.createWidgetDir(servicePath);
            this.buildWidgetFile(
                `${this.tplPath}/${servicePath}/ApiService.js`,
                `${servicePath}/ApiService.js`,
                tplBindings
            );
            this.buildWidgetFile(`${this.tplPath}/${servicePath}/index.js`, `${servicePath}/index.js`, tplBindings);
            this.buildWidgetFile(`${this.tplPath}/mixins.js`, `${servicePath}/mixins.js`, tplBindings);
        }

        return true;
    }
};
