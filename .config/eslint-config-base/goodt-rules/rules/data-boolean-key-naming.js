/**
 * @fileoverview Prevent overwrite reserved keys
 * @author Armano
 */
'use strict';

const utils = require('eslint-plugin-vue/lib/utils');

/**
 * @typedef {import('eslint-plugin-vue/lib/utils').GroupName} GroupName
 */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/** @type {GroupName[]} */
const GROUP_NAMES = ['data'];
const PREFIXES = ['is', 'has', 'can', 'should'];

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'checks "data" keys name for prefix',
            categories: ['goodt-rules'],
            url: 'https://goodt-git.goodt.me/projects/GOOD/repos/goodteditor-wcore/browse/CONTRIBUTING.md'
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    prefixes: {
                        type: 'array'
                    },
                    groups: {
                        type: 'array'
                    }
                },
                additionalProperties: false
            }
        ],
        messages: {
            shouldStartsWithPrefix:
                'Key "data.{{name}}" should starts with one of prefix "{{prefixes}}" (as it has boolean value).'
        }
    },
    /** @param {RuleContext} context */
    create(context) {
        const options = context.options[0] ?? {};
        const groups = new Set(GROUP_NAMES.concat(options.groups ?? []));
        const prefixes = options.prefixes ?? PREFIXES;

        const isPrefixRequired = ({ property, name }) => {
            const {
                value: { type, value }
            } = property;

            const isBoolean = type === 'Literal' && typeof value === 'boolean';
            if (isBoolean === false) {
                return false;
            }

            const isNameStartsWithRequiredPrefix = prefixes.some((prefix) =>
                name.startsWith(prefix)
            );

            if (isNameStartsWithRequiredPrefix) {
                return false;
            }

            return true;
        };
        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

        return utils.compositingVisitors(
            utils.executeOnVue(context, (obj) => {
                const properties = utils.iterateProperties(obj, groups);
                for (const { node, name, property } of properties) {
                    if (isPrefixRequired({ property, name }) === false) {
                        continue;
                    }
                    context.report({
                        node,
                        messageId: 'shouldStartsWithPrefix',
                        data: {
                            name,
                            prefixes: prefixes.join('|')
                        }
                    });
                }
            })
        );
    }
};
