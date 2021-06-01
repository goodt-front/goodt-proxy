import { ApiServiceRequestType } from './ApiServiceRequest';
import { ApiClientMethod } from './ApiHttpClient';

const Type2MethodMap = {
    [ApiServiceRequestType.READ]: ApiClientMethod.GET,
    [ApiServiceRequestType.CREATE]: ApiClientMethod.POST,
    [ApiServiceRequestType.UPDATE]: ApiClientMethod.POST,
    [ApiServiceRequestType.DELETE]: ApiClientMethod.DELETE
};

/**
 *
 * @param {string} type
 */
export const getMethodByType = (type) => Type2MethodMap[type];
