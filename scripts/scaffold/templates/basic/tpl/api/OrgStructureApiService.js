import { OrgStructureApiService as OrgStructureApiServiceBase } from '@goodt-common/api';
import { useApiService } from '@goodt-common/mixins';
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

/**
 *
 * @param {import('@goodt-common/services/api/types').IApiServiceOptions} serviceOptions
 * @param {import('@goodt-common/mixins').IApiServiceMixinOptions} [mixinOptions]
 * @return {import('@goodt-common/mixins').IApiServiceMixin}
 */
export const useOrgStructureApiServiceMixin = (
    { apiBaseURL = 'orgStructureApiUrl' } = {},
    { name = 'orgStructureApi' } = {}
) => {
    const { mixin: ServiceMixin } = useApiService(createOrgStructureApiService, { apiBaseURL }, { name });

    return ServiceMixin;
};

/**
 * Это "пустой" вспомогательный объект с JSDOc аннотацией
 * для примешивания информации о сервисе
 * в структуру инстанса компонента и типах
 * исключительно для Vetur
 *
 * @type {{ orgStructureApiUrl: string, orgStructureApi: OrgStructureApiService }}
 */
export const OrgStructureApiServiceTypeDescriptor = undefined;
