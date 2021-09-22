import { InfrastructureError } from '@goodt-common/errors';

let ServiceFactoryMap = new Map();
/**
 * @type {Map<symbol, Function>}
 */
const ServiceBuilderContainer = new Map();

/**
 *
 * @type {Map<symbol, object>}
 */
const ServiceContainer = new Map();

/**
 *
 * @param serviceFactoryList
 */
export const setServiceFactories = (serviceFactoryList) => {
    ServiceFactoryMap = new Map(serviceFactoryList);
};

/**
 *
 * @param serviceId
 * @param options
 */
const provide = (serviceId, options) => {
    const createService = ServiceFactoryMap.get(serviceId);
    if (createService == null) {
        throw new InfrastructureError(
            `Service Factory for specified service identifier '${serviceId.toString()}' does not exist.`
        );
    }

    ServiceBuilderContainer.set(serviceId, () => createService(options));
};

/**
 *
 * @param serviceId
 * @return {Object|*}
 */
export const inject = (serviceId) => {
    if (ServiceContainer.has(serviceId)) {
        return ServiceContainer.get(serviceId);
    }

    const buildService = ServiceBuilderContainer.get(serviceId);
    if (buildService == null) {
        throw new InfrastructureError(
            `Service Builder for specified service identifier '${serviceId.toString()}' does not exist.`
        );
    }

    const service = buildService();
    ServiceContainer.set(serviceId, service);

    return service;
};

/**
 *
 * @param serviceId
 * @param options
 */
export const setServiceOptions = (serviceId, options) => {
    if (typeof serviceId === 'string') {
        // eslint-disable-next-line no-param-reassign
        serviceId = Symbol.for(serviceId);
    }
    provide(serviceId, options);
    if (ServiceContainer.has(serviceId)) {
        ServiceContainer.get(serviceId).setOptions(options);
    }
};
