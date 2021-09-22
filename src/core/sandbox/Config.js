import { mergeWith } from 'lodash';

class Config {
    /**
     * constructor
     */
    constructor() {
        /** @type {object} */
        this._config = null;
        /** @type {function(postfix: string): string} */
        this._configPath = (postfix) => `config${postfix}.json`;
    }

    /**
     * Loads config files
     * @return {Promise<object>}
     */
    load() {
        return Promise.all([this._loadConfig(), this._loadConfig('.local')]).then(([base, local]) => {
            this._config = this._mergeConfigs(base, local);
            return this._config;
        });
    }

    /**
     * @private Load concreate config file
     * @param {string} postfix  file name postfix
     * @return {Promise<object>}
     */
    _loadConfig(postfix = '') {
        return new Promise((resolve) => {
            const url = this._configPath(postfix);
            fetch(url)
                .then((r) => r.json())
                .then(resolve)
                .catch(() => resolve({}));
        });
    }

    /**
     * @private Performs deep merge of base, local configs
     * @param {object} base     base config
     * @param {object} local    local config to extend the base one
     * @return {object}     merged config
     */
    // eslint-disable-next-line class-methods-use-this
    _mergeConfigs(base, local) {
        return mergeWith(base, local, (objVal, srcVal) => (Array.isArray(srcVal) ? srcVal : undefined));
    }
}

export { Config };
