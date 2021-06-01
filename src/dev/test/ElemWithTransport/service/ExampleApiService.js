import { buildDtoSafeResult } from '@goodt/common/infra/utils';
import { createTransport, HttpAuthTransportSymbol } from '@goodt/core/net';
import {
    BaseApiService,
    createApiServiceRequest,
    ApiServiceRequestType
} from '@goodt/common/services/ApiService';
import { SafeResult } from '@goodt/common/utils';
import { PollInfoDto } from './dtos';

const API_ENDPOINTS_PATH = {
    POLL_STRUCT: '/poll/:id/struct',
    CREATE_ITEM: '/item',
    UPDATE_ITEM: '/item/:id',
    DELETE_ITEM: '/item/:id'
};

class ExampleApiService extends BaseApiService {
    /**
     * Получить опрос по id
     * @param {number} pollId
     * @return {Promise<SafeResult>}
     */
    async getPollInfo(pollId) {
        const url = API_ENDPOINTS_PATH.POLL_STRUCT.replace(':id', String(pollId));
        const request = createApiServiceRequest(url);
        const responseResult = await this.request(request);

        const { isFail, result: pollInfoDtoJson, error } = responseResult;
        if (isFail) {
            // some extra logic for error service specific transform
            console.error(error);
            return responseResult;
        }

        const pollInfoDtoSafeResult = buildDtoSafeResult(PollInfoDto, pollInfoDtoJson);
        return pollInfoDtoSafeResult;
    }

    async createItem(dto) {
        const createItemRequest = createApiServiceRequest(
            API_ENDPOINTS_PATH.CREATE_ITEM,
            dto,
            ApiServiceRequestType.CREATE
        );
        const itemDtoJsonResult = await this.request(createItemRequest);
        // ...
    }

    async updateItem(id, dto) {
        const updateItemRequest = createApiServiceRequest(
            API_ENDPOINTS_PATH.UPDATE_ITEM.replace(
                ':id',
                String(id),
                dto,
                ApiServiceRequestType.UPDATE
            )
        );
        const itemDtoJsonResult = await this.request(updateItemRequest);
        // ...
    }

    async deleteItem(id) {
        const deleteItemRequest = createApiServiceRequest(
            API_ENDPOINTS_PATH.DELETE_ITEM.replace(':id', String(id)),
            null,
            ApiServiceRequestType.DELETE
        );
        const deleteResult = await this.request(deleteItemRequest);
        // ...
    }
}

const create = ({ options }) => {
    const transport = createTransport(HttpAuthTransportSymbol);
    const apiService = new ExampleApiService({ transport, options });

    return apiService;
};

export { ExampleApiService, create };
