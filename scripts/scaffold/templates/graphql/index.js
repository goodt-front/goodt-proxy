const { MultiSelect } = require('enquirer');
const Template = require('../template.js');
const camelCase = require('lodash.camelcase');
const path = require('path');

const TPL_PATH = `${__dirname}/tpl`;
const SERVICE_PATH = `${TPL_PATH}/api`;
const SERVICE_PATH_REL = path.relative(TPL_PATH, SERVICE_PATH);

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }

    async build(options) {
        super.build(options);

        const selectedServices = await new MultiSelect({
            name: 'value',
            message: 'Select GraphQL API service',
            choices: this.config.services,
            result(names) {
                return this.map(names);
            }
        }).run();

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
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path,
            services: Object.entries(selectedServices).map(([description, servicePrefix]) => {
                return {
                    description,
                    prefixCapital: servicePrefix,
                    prefixCamel: camelCase(servicePrefix)
                };
            })
        };

        const elem = this.compileTpl(`${TPL_PATH}/elem.vue`, tplBinds);
        const elemTypesDT = this.compileTpl(`${TPL_PATH}/elem.types.d.ts`, tplBinds);
        const elemDT = this.compileTpl(`${TPL_PATH}/elem.d.ts`, tplBinds);
        const panel = this.compileTpl(`${TPL_PATH}/panel.vue`, tplBinds);
        const panelTypesDT = this.compileTpl(`${TPL_PATH}/panel.types.d.ts`, tplBinds);
        const panelDT = this.compileTpl(`${TPL_PATH}/panel.d.ts`, tplBinds);
        const panelsIndex = this.compileTpl(`${TPL_PATH}/panels.index.js`, tplBinds);
        const descriptor = this.compileTpl(`${TPL_PATH}/descriptor.js`, tplBinds);
        const readmeMd = this.compileTpl(`${TPL_PATH}/README.MD`, tplBinds);

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

        /* Services */
        this.createWidgetDir(SERVICE_PATH_REL);

        Object.entries(selectedServices).forEach(([description, servicePrefix]) => {
            const prefixCapital = servicePrefix;
            const prefixCamel = camelCase(servicePrefix);

            const localTplBinds = {
                ...tplBinds,
                description,
                prefixCapital,
                prefixCamel
            };
            const GqlServiceConsumer = this.compileTpl(`${SERVICE_PATH}/GqlServiceConsumer.js`, localTplBinds);
            this.createWidgetFile(`${SERVICE_PATH_REL}/${prefixCapital}Consumer.js`, GqlServiceConsumer);
        });

        const indexFile = this.compileTpl(`${SERVICE_PATH}/index.js`, tplBinds);
        this.createWidgetFile(`${SERVICE_PATH_REL}/index.js`, indexFile);

        /* Styles */
        const style = this.compileTpl(`${TPL_PATH}/style.less`, tplBinds);
        this.createWidgetFile(`style.less`, style);

        return widgetCreated;
    }
};
