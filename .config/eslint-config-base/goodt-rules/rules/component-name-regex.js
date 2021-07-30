/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/250
 */
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('eslint-plugin-vue/lib/utils');
const casing = require('eslint-plugin-vue/lib/utils/casing');

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const allowedCaseOptions = ['PascalCase', 'kebab-case'];
const defaultCase = 'PascalCase';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'enforce specific regex pattern for the component naming style in template',
            categories: undefined,
            url:
                'https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-wcore/browse/CONTRIBUTING.md'
        },
        fixable: 'code',
        schema: [
            {
                enum: allowedCaseOptions
            },
            {
                type: 'object',
                properties: {
                    ignores: {
                        type: 'array',
                        items: { type: 'string' },
                        uniqueItems: true,
                        additionalItems: false
                    },
                    registeredComponentsOnly: {
                        type: 'boolean'
                    }
                },
                additionalProperties: false
            }
        ]
    },
    /** @param {RuleContext} context */
    create(context) {
        const [caseOption] = context.options;
        const options = context.options[1] || {};
        const caseType = allowedCaseOptions.includes(caseOption) ? caseOption : defaultCase;
        const registeredComponentsOnly = options.registeredComponentsOnly !== false;
        const tokens =
            context.parserServices.getTemplateBodyTokenStore &&
            context.parserServices.getTemplateBodyTokenStore();

        /** @type { string[] } */
        const registeredComponents = [];

        /**
         * Checks whether the given node is the verification target node.
         *
         * @param {VElement} node element node
         * @return {boolean} `true` if the given node is the verification target node.
         */
        let hasInvalidEOF = false;

        return utils.defineTemplateBodyVisitor(
            context,
            {
                VElement(node) {
                    // if (hasInvalidEOF) {
                    //    return;
                    // }
                    //
                    // if (!isVerifyTarget(node)) {
                    //    return;
                    // }

                    const name = node.rawName;
                    // if (!casing.getChecker(caseType)(name)) {
                    const { startTag } = node;
                    const open = tokens.getFirstToken(startTag);
                    const casingName = casing.getExactConverter(caseType)(name);
                    context.report({
                        node: open,
                        loc: open.loc,
                        message: 'Component name "{{name}}" is not start with "ui-" prefix.',
                        data: {
                            name,
                            caseType
                        },
                        *fix(fixer) {
                            yield fixer.replaceText(open, `<${casingName}`);
                            const { endTag } = node;

                            if (endTag) {
                                const endTagOpen = tokens.getFirstToken(endTag);
                                yield fixer.replaceText(endTagOpen, `</${casingName}`);
                            }
                        }
                    });
                    // }
                }
            },
            {
                Program(node) {
                    hasInvalidEOF = utils.hasInvalidEOF(node);
                },
                ...(registeredComponentsOnly
                    ? utils.executeOnVue(context, (object) => {
                          registeredComponents.push(
                              ...utils.getRegisteredComponents(object).map((n) => n.name)
                          );
                      })
                    : {})
            }
        );
    }
};
