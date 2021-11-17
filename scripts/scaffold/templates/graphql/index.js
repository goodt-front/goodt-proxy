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

    get path() {
        return __dirname;
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

        this.createWidget({
            tplBindings
        });

        /* Services */
        this.createWidgetDir(SERVICE_PATH_REL);

        Object.entries(selectedServices).forEach(([description, servicePrefix]) => {
            const prefixCapital = servicePrefix;
            const prefixCamel = camelCase(servicePrefix);

            const localTplBindings = {
                ...tplBindings,
                description,
                prefixCapital,
                prefixCamel
            };

            this.buildWidgetFile(
                `${SERVICE_PATH}/GqlServiceConsumer.js`,
                `${SERVICE_PATH_REL}/${prefixCapital}Consumer.js`,
                localTplBindings
            );
        });

        this.buildWidgetFile(`${SERVICE_PATH}/index.js`, `${SERVICE_PATH_REL}/index.js`, tplBindings);

        return true;
    }
};
