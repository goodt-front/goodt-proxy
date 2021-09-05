function makeRuleMeta(memberName) {
    if (typeof memberName === 'string') {
        return { name: memberName };
    }
    if (memberName != null && memberName.use && memberName.name) {
        return memberName;
    }
    throw new Error('Unsupported type of argument ' + JSON.stringify(memberName));
}

const astUtils = require('eslint/lib/rules/utils/ast-utils');

module.exports = {
    meta: {
        docs: {
            description: 'forbid some func names'
        }
    },
    create: function create(context) {
        const ruleMetaList = context.options.map(makeRuleMeta).reduce(
            (acc, importObj) => ({
                ...acc,
                [importObj.name]: importObj
            }),
            {}
        );

        return {
            MemberExpression: function MemberExpression(node) {
                let ruleMeta;
                let target;

                const isObjectIdentifier = node.object && node.object.type === 'Identifier';
                if (isObjectIdentifier) {
                    const isPropertyIdentifier =
                        node.property && node.property.type === 'Identifier';
                    if (!isPropertyIdentifier) return;
                    ruleMeta = ruleMetaList[node.object.name + '.' + node.property.name];
                    target = node.property;
                }

                const subExprStr =
                    ruleMetaList[node.property?.name] ??
                    ruleMetaList[node.object?.property?.name + '.' + node.property?.name];
                if (subExprStr) {
                    ruleMeta = subExprStr;
                    target = node.property;
                }

                if (!ruleMeta || typeof ruleMeta === 'function') {
                    return;
                }

                const errorMsg = [
                    'Member expression ' + ruleMeta.name + ' is deprecated.',
                    ...[ruleMeta.use ? ' Use ' + ruleMeta.use + ' instead' : '']
                ].join('');
                console.dir(ruleMeta);

                context.report({ node: target, message: errorMsg });
            },
            NewExpression(node) {
                const variable = astUtils.getVariableByName(context.getScope(), node.callee.name);
                if (variable == null || (variable && ruleMetaList[variable.name] == null)) {
                    return;
                }

                const ruleMeta = ruleMetaList[variable.name];

                const message = [
                    'Class "' + ruleMeta.name + '" construction is deprecated.',
                    ...[ruleMeta.use ? ' Use ' + ruleMeta.use + ' instead' : '']
                ].join('');

                context.report({
                    node,
                    message
                });
            }
        };
    }
};
