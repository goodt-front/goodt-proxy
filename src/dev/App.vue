<script>
import { Sandbox } from '@goodt-wcore/core/sandbox';
import {
    setServiceOptions as provideService,
    init as initServiceProvider,
    ServiceFactoryMappingList
} from '@goodt-common/services';

export default {
    name: 'App',
    extends: Sandbox,
    watch: {
        config: 'initServiceProvider'
    },
    methods: {
        getComponentFactory() {
            return ({ type, name }) => import(`./test/${type}/${name}.vue`);
        },
        initServiceProvider() {
            initServiceProvider(ServiceFactoryMappingList);
            const { services } = this.config;
            services.forEach(({ name, options }) => {
                provideService(name, { ...options });
            });
        }
    }
};
</script>
