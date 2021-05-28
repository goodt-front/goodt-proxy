import { success, fail } from '@/common/utils/either';
import { create as createApiHttpClient } from './ApiHttpClient';
import { processError } from './utils';
import { ApiServiceError, ApiServiceErrorCode } from './error';

/**
 * @type {import('./BaseApiService').IService}
 */
class BaseApiService {
    /**
     * @private
     * @type {import('./ApiHttpClient').ApiHttpClient}
     */
    _client;

    /**
     *
     * @param client
     * @param transport
     * @throws ApiServiceError
     */
    constructor({ client, transport }) {
        if (client) {
            this._client = client;
            return;
        }
        if (transport) {
            this._client = createApiHttpClient(transport);
            return;
        }

        throw new ApiServiceError(
            'Neither `client` nor `transport` was specified in constructor options',
            { code: ApiServiceErrorCode.INTERNAL }
        );
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
            const processedError = processError(error);
            processedError.captureStackTrace(this.request);
            return fail(processedError);
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
