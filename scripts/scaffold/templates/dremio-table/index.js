const Template = require('../template.js');
const { Toggle } = require('enquirer');

module.exports = class extends Template {
    constructor(widgetName, config) {
        super(widgetName, config);
    }

    get path() {
        return __dirname;
    }

    async build(options) {
        super.build(options);

        const paginationEnabled = await new Toggle({
            message: 'Use custom pagination component?',
            enabled: 'yes',
            disabled: 'no'
        }).run();

        const tplBindings = {
            core: this.corePath,
            corePanels: this.corePanelsPath,
            coreMixins: this.coreMixinsPath,
            lib: this.widgetLibPath,
            path: this.widgetPath,
            name: this.widgetName,
            panelName: this.config.panel.name,
            panelPath: this.config.panel.path,
            pagination: paginationEnabled
        };

        this.createWidget({
            tplBindings
        });

        const render = this.compileTpl(`${this.tplPath}/renders/render.vue`, tplBindings);
        const rendersIndex = this.compileTpl(`${this.tplPath}/renders/index.js`, tplBindings);
        this.createWidgetDir('renders');
        this.createWidgetFile('renders/Render.vue', render);
        this.createWidgetFile('renders/index.js', rendersIndex);
        // table-row
        const tableRow = this.compileTpl(`${this.tplPath}/components/table-row.vue`, tplBindings);
        this.createWidgetFile('components/TableRow.vue', tableRow);
        // pagination
        if (paginationEnabled) {
            const pagination = this.compileTpl(`${this.tplPath}/components/pagination.vue`, tplBindings);
            const paginationPanel = this.compileTpl(`${this.tplPath}/panels/pagination-panel.vue`, tplBindings);
            this.createWidgetFile('components/Pagination.vue', pagination);
            this.createWidgetFile('panels/PaginationPanel.vue', paginationPanel);
        }

        return true;
    }
};
