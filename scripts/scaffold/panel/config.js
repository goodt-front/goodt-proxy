const yargs = require('yargs');

const TypeToComponentMap = Object.freeze({
    String: 'ui-input',
    Boolean: 'ui-checkbox',
    InputString: 'ui-input',
    TextareaString: 'ui-input',
    FileString: 'ui-input-browse',
    CheckboxBoolean: 'ui-checkbox',
    SwitchBoolean: 'ui-switch',
    SelectString: 'ui-select',
    TimeString: 'ui-input-tp'
});

const DEFAULT_UI_CONTROL_ATTRS = {
    class: 'p'
};

const PANEL_TPL_PATH = 'SettingsPanel.vue';
const PANEL_TARGET_PATH = './panels/SettingsPanel.vue';
const REFERENCE_CONTROL_TAG_MATCHER = 'ui-input';

const CliArgOptions = Object.freeze({
    DESCRIPTOR: 'descriptor',
    PANEL: 'panel',
    TARGET: 'target'
});

const getCliOptions = (argv) =>
    yargs(argv)
        .showHelpOnFail(true, 'Specify --help for available options')
        .alias('h', 'help')
        .help('help')
        .usage('Usage: $0 panel -d path/to/descriptor/file')
        .command('panel', 'Generates widget panel component by descriptor')
        .option(CliArgOptions.DESCRIPTOR, {
            nargs: 1,
            demand: 'descriptor file is required',
            alias: CliArgOptions.DESCRIPTOR[0],
            description: 'Descriptor file path',
            type: 'string'
        })
        .option(CliArgOptions.PANEL, {
            alias: CliArgOptions.PANEL[0],
            description: 'Panel template file path',
            type: 'string'
        })
        .option(CliArgOptions.TARGET, {
            alias: CliArgOptions.TARGET[0],
            description: 'Generated panel target file path',
            type: 'string'
        }).argv;

module.exports = {
    getCliOptions,
    TypeToComponentMap,
    PANEL_TARGET_PATH,
    PANEL_TPL_PATH,
    REFERENCE_CONTROL_TAG_MATCHER,
    DEFAULT_UI_CONTROL_ATTRS,
    CliArgOptions
};
