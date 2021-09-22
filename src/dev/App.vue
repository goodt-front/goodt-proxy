<script>
import { Sandbox } from '@goodt-wcore/core/sandbox';
import { initServices } from '@goodt-common/services';

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
            const { services: settings } = this.config;
            initServices({ settings });
        }
    }
};
</script>
