/**
 * @author Yosuke Ota
 * issue https://github.com/vuejs/eslint-plugin-vue/issues/250
 */
// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('eslint-plugin-vue/lib/utils');
const casing = require('eslint-plugin-vue/lib/utils/casing');
const { toRegExp } = require('eslint-plugin-vue/lib/utils/regexp');

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const defaultPattern = /^(ui|w)-.+/;

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
                type: 'object',
                properties: {
                    pattern: {
                        type: 'string'
                    },
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
        const options = context.options[0] || {};

        /** @type {RegExp[]} */
        const rePattern = options.pattern ? toRegExp(options.pattern) : defaultPattern;
        const ignores = (options.ignores || []).map(toRegExp);
        const registeredComponentsOnly = options.registeredComponentsOnly !== false;
        const tokens =
            context.parserServices.getTemplateBodyTokenStore &&
            context.parserServices.getTemplateBodyTokenStore();

        /** @type { string[] } */
        const registeredComponents = [];

        /**
         * Checks whether the given node is the verification target node.
         * @param {VElement} node element node
         * @returns {boolean} `true` if the given node is the verification target node.
         */
        function isTargetNode(node) {
            const { rawName } = node;
            if (casing.isPascalCase(rawName)) {
                return false;
            }

            // ignore
            if (ignores.some((re) => re.test(rawName))) {
                return false;
            }

            if (registeredComponentsOnly === false) {
                // If the user specifies registeredComponentsOnly as false, it checks all component tags.
                const isTargetNode =
                    (!utils.isHtmlElementNode(node) && !utils.isSvgElementNode(node)) ||
                    utils.isHtmlWellKnownElementName(rawName) ||
                    utils.isSvgWellKnownElementName(rawName);

                return isTargetNode;
            }

            // We only verify the components registered in the component.
            const isTargetNode = registeredComponents.includes(casing.pascalCase(rawName));
            return isTargetNode;
        }

        let hasInvalidEOF = false;

        return utils.defineTemplateBodyVisitor(
            context,
            {
                VElement(node) {
                    const { rawName: name } = node;

                    if (hasInvalidEOF) {
                        return;
                    }

                    if (!isTargetNode(node)) {
                        return;
                    }

                    if (rePattern.test(name)) {
                        return;
                    }

                    const { startTag } = node;
                    const open = tokens.getFirstToken(startTag);
                    const clearedRe = rePattern.toString().replace(/[/^.+]/g, '');
                    const fixedComponentName = `${clearedRe}${name}`;

                    context.report({
                        node: open,
                        loc: open.loc,
                        message: 'Component tag name "{{name}}" should be "{{pattern}}".',
                        data: {
                            name,
                            pattern: fixedComponentName
                        },

                        *fix(fixer) {
                            yield fixer.replaceText(open, `<${fixedComponentName}`);
                            const { endTag } = node;

                            if (endTag) {
                                const endTagOpen = tokens.getFirstToken(endTag);
                                yield fixer.replaceText(endTagOpen, `</${fixedComponentName}`);
                            }
                        }
                    });
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
