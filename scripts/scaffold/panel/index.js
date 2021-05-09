const path = require('path');
const fs = require('fs');
const $ = require('jscodeshift');
const cloneDeep = require('lodash/cloneDeep');

const compiler = require('vue-template-compiler');
const VueAstEditor = require('vue-ast-editor');
const yargs = require('yargs');

const PANEL_TPL_PATH = 'SettingsPanel.vue';
const PANEL_TARGET_PATH = 'SettingsPanel.vue';
const REFERENCE_CONTROL_TAG_MATCHER = 'ui-input';
const DESCRIPTOR_TOKEN_MATCHER = {
    callee: {
        name: 'defineDescriptor'
    }
};

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

const argv = yargs(process.argv.slice(2))
    .option('source', {
        alias: 's',
        description: 'Source file of descriptor',
        type: 'string'
    })
    .help()
    .alias('help', 'h').argv;

/**
 *
 * @param source
 * @return {Promise<{controlTypes}>}
 */
async function buildPanelDataFromDescriptor(source) {
    const { CallExpression } = $;
    const sfcDescriptor = compiler.parseComponent(source);

    const root = $(sfcDescriptor.script.content);
    const nodePath = root.find(CallExpression, DESCRIPTOR_TOKEN_MATCHER).get(0);
    const props = nodePath.node.arguments[0].properties[0].value;

    const controlTypes = props.properties.reduce(
        (result, { key: { name }, value: { properties } }) => {
            const {
                value: { name: type }
            } = properties.find(({ key: { name } }) => name === 'type');
            const { value: { name: options = [] } = {} } =
                properties.find(({ key: { name } }) => name === 'options') ?? {};

            return [...result, { name, type, options }];
        },
        []
    );

    return { controlTypes };
}

function getTagName(type) {
    return TypeToComponentMap[type];
}

/**
 *
 * @param source
 * @param controlTypes
 * @return {Promise<{source: module.VueAstEditor.results.html}>}
 */
async function generatePanel(source, { controlTypes }) {
    const cmp = new VueAstEditor(source);
    await cmp.ready();
    const referenceNode = cmp.filterHAST({ tag: REFERENCE_CONTROL_TAG_MATCHER })[0];

    controlTypes.forEach(({ name, type, options }) => {
        const targetNode = cloneDeep(referenceNode);
        targetNode.tag = getTagName(type);
        targetNode.attrs = {
            ...targetNode.attrs,
            'v-model': `props.${name}`,
            '@change': `propChanged('${name}')`
        };
        cmp.insertBefore(targetNode, referenceNode);
    });

    cmp.removeNode(referenceNode);

    return { source: cmp.toString() };
}

/**
 *
 */
async function init() {
    const descriptorSourcePath = path.resolve(argv.source);
    const descriptorSource = fs.readFileSync(descriptorSourcePath, 'utf8');
    const { controlTypes } = await buildPanelDataFromDescriptor(descriptorSource);

    const panelPath = path.resolve(__dirname, PANEL_TPL_PATH);
    const panelSource = fs.readFileSync(panelPath, 'utf8');
    const { source } = await generatePanel(panelSource, { controlTypes });
    const targetPath = path.resolve(path.dirname(argv.source), PANEL_TARGET_PATH);
    fs.writeFileSync(targetPath, source);
}

init();

//module.exports = transform;
