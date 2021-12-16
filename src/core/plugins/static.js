export default {
    install: (App) => {
        const strategies = App.config.optionMergeStrategies;
        strategies.static = strategies.methods;
        App.mixin({
            beforeCreate() {
                // eslint-disable-next-line better-mutation/no-mutating-functions
                if (typeof this.$options.static === 'object') {
                    Object.assign(this, this.$options.static);
                }
            }
        });
    }
};
