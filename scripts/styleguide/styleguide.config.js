const path = require('path');
const kebab = require('lodash.kebabcase');

module.exports = {
    components: '../../@goodt/core/components/panel-ui/[A-Z]*.vue',
    title: 'panel ui',
    version: require('../../@goodt/core/../../package.json').version,
    styleguideDir: 'docs/panel-ui/',
    require: ['goodt-framework-css'],
    copyCodeButton: true,
    simpleEditor: true,
    getComponentPathLine(componentPath) {
        const name = kebab(path.basename(componentPath, '.vue'));
        return `<ui-${name}></ui-${name}>`;
    },
    template: {
        head: {
            links: [
                {
                    rel: 'stylesheet',
                    href:
                        'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
                    crossorigin: 'anonymous'
                },
                {
                    rel: 'stylesheet',
                    href:
                        'https://materialdesignicons.com/cdn/light/0.2.63/css/materialdesignicons-light.min.css',
                    crossorigin: 'anonymous'
                }
            ]
        }
    }
};
