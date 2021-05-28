import { buildDtoSafeResult } from '@/common/infra/utils';
import { BaseApiService, createApiServiceRequest } from '@goodt/common/services/ApiService';
import { PollInfoDto } from './dtos';

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
        const responseResult = await this.request(request);

        const { isFail, result: pollInfoDtoJson, error } = responseResult;
        if (isFail) {
            // some extra logic for error service specific transform
            console.error(error);
        }

        const pollInfoDtoSafeResult = buildDtoSafeResult(PollInfoDto, pollInfoDtoJson);
        return pollInfoDtoSafeResult;
    }
}

const create = (...args) => new ExampleApiService(...args);

export { ExampleApiService, create };
