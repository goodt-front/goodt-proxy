import { BaseApiService } from '@goodt-common/api';
import { fail, success } from '@goodt-common/utils';

const API_ENDPOINTS_PATH = {
    FETCH_ITEM_BY_ID: '/some/item/:id'
};

class [[{name}]]Service extends BaseApiService {
    /**
     * @param {number} itemId
     * @return {Promise<{IItemDto}>}
     */
    async getItemById(itemId) {
        const url = API_ENDPOINTS_PATH.FETCH_ITEM_BY_ID.replace(':id', String(itemId));
        const request = createRequest(url);
        try {
            const response = await this.request(request);
            const { isSuccess, result } = response;
            if (isSuccess) {
                // validate json structure
            }
            return response;
        } catch (error) {
            return fail(error);
        }
    }
}

const create = (...args) => new [[{name}]]Service(...args);

export { [[{name}]]Service, create };
