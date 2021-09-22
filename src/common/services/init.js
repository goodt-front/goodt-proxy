import { setServiceFactories, setServiceOptions } from '@goodt-common/services/ServiceProvider';
import { ServiceFactoryMappingList } from '@goodt-common/services/config';

/**
 *
 * @param {Array<Array>} factories
 * @param settings
 */
export const initServices = ({ factories = ServiceFactoryMappingList, settings = [] }) => {
    setServiceFactories(factories);
    settings.forEach(({ name, options }) => {
        setServiceOptions(name, { ...options });
    });
};
