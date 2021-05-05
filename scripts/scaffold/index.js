#!/usr/bin/env node

const signale = require('signale');
const { Input, Select } = require('enquirer');
const fs = require('fs');
const figlet = require('figlet');
const BasicTemplate = require('./templates/basic/index.js');
const DremioTemplate = require('./templates/dremio/index.js');
const DremioTableTemplate = require('./templates/dremio-table/index.js');

const cwd = process.cwd();
const config = {
    path: {
        home: __dirname,
        project: {
            home: cwd,
            src: `${cwd}/src`,
            lib: `${cwd}/src/lib`,
            core: `goodt-wcore`
        }
    }
};
const templates = [
    {
        name: 'widget basic',
        descr: 'basic widget (optional rest-api datasource)',
        class: BasicTemplate
    },
    {
        name: 'widget dremio',
        descr: 'widget with dremio datasource (uses dremio mixin)',
        class: DremioTemplate
    },
    {
        name: 'widget dremio table',
        descr: 'table widget with dremio datasource (extends DremioTable)',
        class: DremioTableTemplate
    }
];

const logo = () => {
    return new Promise((resolve) => {
        figlet('Scaffold', function(err, data) {
            console.clear();
            console.log(data);
            resolve();
        });
    });
};
(async () => {
    await logo();

    let widget = {
        name: '',
        template: ''
    };
    widget.template = await new Select({
        message: 'Select widget template',
        choices: templates.map(({ name, descr }, i) => ({
            message: `[${i + 1}] ${name} - ${descr}`,
            value: name
        }))
    }).run();

    widget.name = await new Input({
        message: 'Widget name (example: MySpace/ElemMyWidget)',
        validate(val) {
            let path = val.split('/').map((v) => v.trim());
            let name = path.pop();
            let ns = path;

            if (!ns.length) {
                return 'Name must contain a namespace with at least one "/"';
            }
            if (ns[0].toLowerCase() == 'core') {
                return '"Core" namespace is reserved';
            }
            if (ns[0].match(/^[a-z]/)) {
                return 'Namespace must start with a capital letter';
            }
            if (name.indexOf('Elem') !== 0) {
                return 'Name must start with "Elem" prefix';
            }
            if (name.toLowerCase() == 'elem') {
                return 'Name can not be just "Elem"';
            }
            if (fs.existsSync(`${config.path.project.lib}/${val}`)) {
                return 'Already exists';
            }
            return true;
        }
    }).run();

    let tpl = templates.find(({ name }) => name == widget.template);
    let result = await new tpl.class(widget.name, config).build();
    if (result === true) {
        signale.log('------------------------------------------------');
        signale.success(`widget created: ${widget.name}`);
        signale.log('------------------------------------------------');
    } else {
        signale.fatal(result);
    }
})();
