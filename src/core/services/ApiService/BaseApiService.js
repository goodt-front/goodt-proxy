import { success, fail } from '@/core/utils/either';
import { ApiServiceError, ApiHttpClientError } from './error';
import { create as createApiHttpClient } from './ApiHttpClient';

class BaseApiService {
    _client = null;

    constructor({ client, transport }) {
        if (client) {
            this._client = client;
            return;
        }
        if (transport) {
            this._client = createApiHttpClient(transport);
        }
    }

    /**
     *
     * @param {import('./ApiServiceRequest')} request
     * @return {Promise<SafeResult>}
     */
    async request(request) {
        try {
            const result = await this._client.request(request);
            return success(result);
        } catch (error) {
            if (error instanceof ApiHttpClientError) {
                const { message, code, data, reason } = error;
                const serviceError = new ApiServiceError(message, { code, data, reason });
                return fail(serviceError);
            }
            throw error;
        }
    }

    /**
     *
     */
    dispose() {
        this._client.dispose();
    }
}

export { BaseApiService };
