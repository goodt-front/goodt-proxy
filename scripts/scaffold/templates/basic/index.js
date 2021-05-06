const Template = require('../template.js');
const { Select } = require('enquirer');

const TRANSPORTS = {
    none: 'none (no transport)',
    http: 'http (no authorization)',
    httpAuth: 'http-auth (with authorization support)'
};

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }
    async build(options) {
        super.build(options);

        const transport = await new Select({
            message: 'Select rest-api transport',
            choices: Object.entries(TRANSPORTS).map(([value, message]) => ({ value, message }))
        }).run();

        const tplPath = `${__dirname}/tpl`;
        const tplBinds = {
            core: this.corePath,
            lib: this.corePath,
            path: this.widgetPath,
            name: this.widgetName,
            http: transport === 'http',
            httpAuth: transport === 'httpAuth',
            httpAny: ['http', 'httpAuth'].includes(transport),
            hasTransport: ['http', 'httpAuth'].includes(transport)
        };
        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        return this.createWidget({ elem, panel });
    }
};
