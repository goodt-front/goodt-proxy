<script>
import { getDescriptorDefaultProps } from '[[{core}]]';
import Table, { COLUMN_RENDERS } from '[[{lib}]]/ElemDremioTable/ElemDremioTable.vue';
import DemoRender from './renders/Render.vue';
[[#pagination]]
import DemoPagination from './components/Pagination.vue';
[[/pagination]]
import DemoTableRow from './components/TableRow.vue';

const renders = {
    ...COLUMN_RENDERS,
    DEMO_RENDER: {
        name: 'demo render',
        component: DemoRender
    }
};

const descriptor = () => ({
    props: {
        [[#pagination]]
        // pagination settings
        pagination: {
            type: Object,
            default() {
                return {
                    showArrows: true
                };
            }
        }
        [[/pagination]]
    },
    vars: {}
});

export default {
    extends: Table,
    props: {
        props: {
            default() {
                return getDescriptorDefaultProps(descriptor());
            }
        },
        columnRenders: {
            default() {
                return renders;
            }
        },
        [[#pagination]]
        paginationRender: {
            default() {
                return DemoPagination;
            }
        },
        [[/pagination]]
        rowRender: {
            default() {
                return DemoTableRow;
            }
        }
    },
    data() {
        return {
            descriptor: descriptor()
        };
    },
    computed: {
        // to be implemented
    },
    created() {
        // to be implemented
    },
    mounted() {
        // to be implemented
    },
    destroyed() {
        // to be implemented
    },
    methods: {
        getPanels() {
            const panels = this.super(Table).getPanels.call(this);
            return [...panels, import('./panels/SettingsPanel.vue')];
        },
        [[#pagination]]
        getPaginationPanel() {
            return import('./panels/PaginationPanel.vue');
        },
        [[/pagination]]
        subscribe() {
            /*
            this.eventBusWrapper.listenStateChange((e, state) => {
                console.log(this.type, 'subscribe()', 'listenStateChange()', e, state);
            });
            */
        }
    }
};
</script>
