import { OrgStructureApiService as OrgStructureApiServiceBase } from '@goodt-common/api';
[[#http]]
import { createTransport, HttpTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]
[[^http]]
import { createTransport, HttpAuthTransportSymbol } from '[[{coreNetPath}]]';
[[/http]]

/**
 * OrgStructureApiService class
 */
export class OrgStructureApiService extends OrgStructureApiServiceBase { }

/**
 * Service factory
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} options service options
 * @param {import('@goodt-wcore/net').ITransport} [transport] transport
 * @return {OrgStructureApiService} service instance
 */
export const createOrgStructureApiService = (options, transport) => {
    if (transport == null) {
        // eslint-disable-next-line no-param-reassign
        [[#http]]
        transport = createTransport(HttpTransportSymbol);
        [[/http]]
        [[^http]]
        transport = createTransport(HttpAuthTransportSymbol);
        [[/http]]
    }

    return new OrgStructureApiService({ transport, options });
};
