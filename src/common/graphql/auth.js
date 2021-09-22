import { Managers } from '@goodt-wcore/core';

/**
 * @param {{ context: Record<string, any>}} [options]
 * @return {Promise<null|string>}
 */
export const getAuthToken = async (/* options */) => {
    const { adapter } = Managers.AuthManager.instance;
    try {
        if (adapter == null) {
            return null;
        }

        await adapter.init();
        await adapter.updateToken();
        const { token } = adapter;

        return token;
    } catch (error) {
        await adapter.login();

        return null;
    }
};
