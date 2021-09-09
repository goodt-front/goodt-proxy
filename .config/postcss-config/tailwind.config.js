const twIgnoredClasses = require('@goodt/postcss-config/tw-ignored-classes');

module.exports = {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    purge: {
        enabled: true,
        content: ['./src/**/*.vue', './src/**/*.js'],
        defaultExtractor(content) {
            const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
            return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        },
        options: {
            blocklist: [...twIgnoredClasses.classes.map((selector) => selector.replace('.', ''))]
        }
    }
};
