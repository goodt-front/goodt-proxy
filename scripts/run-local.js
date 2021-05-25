#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const isLocalInstall = fs.existsSync(path.resolve(__dirname, '../package-lock.json'));
if (isLocalInstall === false) {
    process.exit(0);
}
const scripts = process.argv.splice(-1);
if (scripts.length === 0) {
    process.exit(0);
}
// we need to run our script, so we need to run a new process
const npm = require('npm-commands');
scripts.forEach((scriptName) => {
    npm()
        .cwd(path.resolve(__dirname, '..'))
        .runAsync(scriptName);
});
