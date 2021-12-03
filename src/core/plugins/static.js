export default {
    install: (App) => {
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
