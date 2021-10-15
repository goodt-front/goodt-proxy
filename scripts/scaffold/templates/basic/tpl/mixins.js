[[#hasTransport]]
import { extractDescriptorPropMeta } from '@goodt-common/utils';
import { useOrgStructureApiServiceMixin } from '@goodt-common/api';
import { useApiServiceMixin } from './api';

/**
 * Миксин для использования ApiService вместе с компонентом
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const ApiServiceMixin = useApiServiceMixin({
    apiBaseURL() {
        const { options } = extractDescriptorPropMeta(this.descriptor, 'apiBaseUrl');
        return options.build(this.$c(this.props.apiBaseUrl));
    }
});
/**
 * @type {{  apiService: import('./api/ApiService').ApiService }}
 */
export const ApiServiceMixinTypeDescriptor = undefined;

/**
 * Миксин для использования OrgStructureApiService вместе с компонентом
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const OrgStructureApiServiceMixin = useOrgStructureApiServiceMixin({
    apiBaseURL() {
        const { options } = extractDescriptorPropMeta(this.descriptor, 'orgStructureApiUrl');
        return options.build(this.$c(this.props.orgStructureApiUrl));
    }
});
/**
 * Это "пустой" вспомогательный объект с JSDOc аннотацией
 * для примешивания информации о сервисе
 * в структуру инстанса компонента и типах
 * исключительно для Vetur
 *
 * @type {{  orgStructureApiService: import('@goodt-common/api').OrgStructureApiService }}
 */
export const OrgStructureApiServiceMixinTypeDescriptor = undefined;


export const ApiMixins = [
    ApiServiceMixin,
    OrgStructureApiServiceMixin
];

export const ApiMixinsTypeDescriptor = {
    ...ApiServiceMixinTypeDescriptor,
    ...OrgStructureApiServiceMixinTypeDescriptor
};
[[/hasTransport]]

