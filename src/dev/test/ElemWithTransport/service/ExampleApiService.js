import { buildDtoSafeResult } from '@/common/infra/utils';
import { useApiService } from '@goodt/common/mixins';
import { createTransport, HttpAuthTransportSymbol } from '@goodt/core/net';
import { BaseApiService } from '@goodt/common/services/ApiService';
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
     * @return {Promise<{PollInfoDto}>}
     */
    async getPollInfo(pollId) {
        const responseResult = await this.request({
            url: API_ENDPOINTS_PATH.POLL_STRUCT.replace(':id', String(pollId))
        });

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
        const itemDtoJsonResult = await this.request({
            url: API_ENDPOINTS_PATH.CREATE_ITEM,
            params: dto,
            options: { method: 'post' }
        });
        // ...
        // const itemSafeResult = buildDtoSafeResult(ItemDto, itemDtoJsonResult);
        //
        // return itemSafeResult;
    }

    async updateItem(id, dto) {
        const itemDtoJsonResult = await this.request({
            url: API_ENDPOINTS_PATH.UPDATE_ITEM.replace(':id'),
            params: dto,
            options: { method: 'put' }
        });
        // ...
        // const itemSafeResult = buildDtoSafeResult(ItemDto, itemDtoJsonResult);
        //
        // return itemSafeResult;
    }

    async deleteItem(id) {
        // ...
        const deleteResult = await this.request({
            url: API_ENDPOINTS_PATH.DELETE_ITEM.replace(':id', String(id)),
            options: { method: 'delete' }
        });
    }
}

const create = ({ options }) => {
    const transport = createTransport(HttpAuthTransportSymbol);
    const apiService = new ExampleApiService({ transport, options });

    return apiService;
};

/**
 *
 * @return {IApiServiceMixin}
 */
const useApiServiceMixin = ({ name, apiBaseURL }) => {
    const { mixin: ServiceMixin } = useApiService(create, {
        name,
        apiBaseURL
    });

    return ServiceMixin;
};

/**
 *
 */
export { create, useApiServiceMixin };
