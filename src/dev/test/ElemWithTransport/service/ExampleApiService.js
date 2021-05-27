import { BaseApiService, createApiServiceRequest } from '@goodt/common/services/ApiService';

const API_ENDPOINTS_PATH = {
    POLL_STRUCT: '/poll/:id/struct'
};

class ExampleApiService extends BaseApiService {
    /**
     * Получить опрос по id
     * @param {number} pollId
     * @return {Promise<{PollInfoDto}>}
     */
    async getPollInfoDto(pollId) {
        const url = API_ENDPOINTS_PATH.POLL_STRUCT.replace(':id', String(pollId));
        const request = createApiServiceRequest(url);
        const response = await this.request(request);

        const { isFail, error } = response;
        if (isFail) {
            // some extra logic for error service specific transform
            console.error(error);
        }

        return response;
    }
}

const create = (...args) => new ExampleApiService(...args);

export { ExampleApiService, create };
