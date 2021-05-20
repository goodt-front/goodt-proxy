#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const isLocalInstall = fs.existsSync(path.resolve(__dirname, '../package-lock.json'));
if (isLocalInstall === false) {
    process.exit(1);
}
const scripts = process.argv.slice(2);
if (scripts.length === 0) {
    process.exit(1);
}
// we need to run our script, so we need to run a new process
const npm = require('npm-commands');
scripts.forEach((scriptName) => {
    npm().runAsync(scriptName);
});
