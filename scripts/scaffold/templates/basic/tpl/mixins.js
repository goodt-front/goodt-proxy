[[#hasTransport]]
import { extractDescriptorPropMeta } from '@goodt-common/utils';
import {
    useApiServiceMixin, ApiServiceTypeDescriptor,
    useOrgStructureApiServiceMixin, OrgStructureApiServiceTypeDescriptor
} from './api';

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
 * Миксин для использования OrgStructureApiService вместе с компонентом
 * @type {import('@goodt-common/mixins').IApiServiceMixin}
 */
const OrgStructureApiServiceMixin = useOrgStructureApiServiceMixin({
    apiBaseURL() {
        const { options } = extractDescriptorPropMeta(this.descriptor, 'orgStructureApiUrl');
        return options.build(this.$c(this.props.orgStructureApiUrl));
    }
});

export const ApiMixins = [
    ApiServiceMixin,
    OrgStructureApiServiceMixin
];

export const ApiMixinsTypeDescriptor = {
    ...ApiServiceTypeDescriptor,
    ...OrgStructureApiServiceTypeDescriptor
};
[[/hasTransport]]

