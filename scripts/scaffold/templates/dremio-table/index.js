const Template = require('../template.js');
const { Toggle } = require('enquirer');

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }
    async build(options) {
        super.build(options);

        const paginationEnabled = await new Toggle({
            message: 'Use custom pagination component?',
            enabled: 'yes',
            disabled: 'no'
        }).run();

        const tplPath = `${__dirname}/tpl`;
        const tplBinds = {
            core: this.corePath,
            lib: this.widgetLibPath,
            path: this.widgetPath,
            name: this.widgetName,
            pagination: paginationEnabled,
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path
        };
        const elem = this.compileTpl(`${tplPath}/elem.vue`, tplBinds);
        const elemDT = this.compileTpl(`${tplPath}/elem.d.ts`, tplBinds);
        const panel = this.compileTpl(`${tplPath}/panel.vue`, tplBinds);
        const panelDT = this.compileTpl(`${tplPath}/panel.d.ts`, tplBinds);
        const descriptor = this.compileTpl(`${tplPath}/descriptor.js`, tplBinds);

        this.createWidget({ elem, panel, elemDT, panelDT, descriptor });
        // render
        const render = this.compileTpl(`${tplPath}/renders/render.vue`, tplBinds);
        this.createWidgetDir('renders');
        this.createWidgetFile('renders/Render.vue', render);
        // table-row
        const tableRow = this.compileTpl(`${tplPath}/components/table-row.vue`, tplBinds);
        this.createWidgetFile('components/TableRow.vue', tableRow);
        // pagination
        if (paginationEnabled) {
            const pagination = this.compileTpl(`${tplPath}/components/pagination.vue`, tplBinds);
            const paginationPanel = this.compileTpl(
                `${tplPath}/panels/pagination-panel.vue`,
                tplBinds
            );
            this.createWidgetFile('components/Pagination.vue', pagination);
            this.createWidgetFile('panels/PaginationPanel.vue', paginationPanel);
        }

        return true;
    }
};
