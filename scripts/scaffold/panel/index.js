const path = require('path');
const fs = require('fs');

const cloneDeep = require('lodash/cloneDeep');

const $ = require('jscodeshift');
const compiler = require('vue-template-compiler');
const VueAstEditor = require('vue-ast-editor');

const {
    TypeToComponentMap,
    PANEL_TARGET_PATH,
    PANEL_TPL_PATH,
    REFERENCE_CONTROL_TAG_MATCHER,
    DESCRIPTOR_TOKEN_MATCHER,
    DEFAULT_UI_CONTROL_ATTRS,
    getCliOptions,
    CliArgOptions
} = require('./config');

const argv = getCliOptions(process.argv.slice(2));

/**
 *
 * @param {string} srcFilePath
 * @return {string}
 */
const loadDescriptorSource = (srcFilePath = argv[CliArgOptions.DESCRIPTOR]) => {
    const descriptorSourcePath = path.resolve(srcFilePath);
    const descriptorSource = fs.readFileSync(descriptorSourcePath, 'utf8');

    if (descriptorSourcePath.endsWith('vue')) {
        const sfcDescriptor = compiler.parseComponent(source);
        return sfcDescriptor.script.content;
    }

    return descriptorSource;
};

/**
 *
 * @param {string} srcFilePath
 * @return {string}
 */
const loadPanelSource = (srcFilePath = argv[CliArgOptions.PANEL]) => {
    if (!srcFilePath) {
        srcFilePath = path.resolve(__dirname, PANEL_TPL_PATH);
    }
    const panelSource = fs.readFileSync(srcFilePath, 'utf8');

    return panelSource;
};

/**
 *
 */
const savePanelSource = ({ source }) => {
    const targetPath =
        argv[CliArgOptions.TARGET] ??
        argv[CliArgOptions.PANEL] ??
        path.resolve(path.dirname(argv[CliArgOptions.DESCRIPTOR]), PANEL_TARGET_PATH);

    fs.writeFileSync(targetPath, source);
};

/**
 *
 * @param source
 * @return {Promise<{controlTypes}>}
 */
async function buildPanelDataFromDescriptor(source) {
    const { ArrowFunctionExpression } = $;
    const root = $(source);
    const nodePaths = root.find(ArrowFunctionExpression);
    if (nodePaths.length === 0) {
        throw new Error(`No matching descriptor '${DESCRIPTOR_TOKEN_MATCHER.callee.name}' found.`);
    }
    const DescriptorObject = nodePaths.get(0).node.body;
    const props = DescriptorObject.properties[0].value;

    const controlTypes = props.properties.reduce(
        (result, { key: { name }, value: { properties } }) => {
            const {
                value: { name: type }
            } = properties.find(({ key: { name } }) => name === 'type');
            const hasOptions = properties.some(({ key: { name } }) => name === 'options') ?? {};

            return [...result, { name, type, hasOptions }];
        },
        []
    );

    return { controlTypes };
}

/**
 *
 * @param type
 * @return {*}
 */
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

    const rootNode = cmp.template.content.find(({ tag }) => tag !== undefined);
    if (!rootNode) {
        throw new Error('No root node detected in <template>...</template>');
    }
    const referenceNode = rootNode.content.find(({ tag }) => tag && tag.startsWith('ui-'));
    cmp.insertAfter('<!-- </generated code> -->', referenceNode);

    controlTypes.forEach(({ name, type, hasOptions }) => {
        const targetNode = cloneDeep(referenceNode);
        targetNode.tag = getTagName(type);
        targetNode.attrs = {
            ...targetNode.attrs,
            ...DEFAULT_UI_CONTROL_ATTRS,
            'v-model': `props.${name}`,
            '@change': `propChanged('${name}')`
        };
        if (hasOptions) {
            targetNode.attrs[':options'] = `descriptor.props.${name}.options`;
        }
        cmp.insertAfter(targetNode, referenceNode);
    });
    cmp.insertAfter('<!-- <generated code> -->', referenceNode);

    return { source: cmp.toString() };
}

/**
 *
 */
async function init() {
    const descriptorSource = loadDescriptorSource();
    const { controlTypes } = await buildPanelDataFromDescriptor(descriptorSource);

    const panelSource = loadPanelSource();
    const { source } = await generatePanel(panelSource, { controlTypes });

    savePanelSource({ source });
}

init();

//module.exports = transform;
