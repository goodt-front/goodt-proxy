module.exports = {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./src/**/*.vue', './src/**/*.js'],
        defaultExtractor(content) {
            const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
            return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
        }
    }
};
