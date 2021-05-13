<script>
/**
 * @typedef {import('./[[{name}]]').IComponentOptions} IComponentOptions
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import Table, { COLUMN_RENDERS } from '[[{lib}]]/ElemDremioTable/ElemDremioTable.vue';
import DemoRender from './renders/Render.vue';
[[#pagination]]
import DemoPagination from './components/Pagination.vue';
[[/pagination]]
import DemoTableRow from './components/TableRow.vue';
import { PaginationPanelAsync, [{{panelName}}]Async } from '[{{panelPath}}]';
import { descriptor } from './descriptor';


const renders = {
    ...COLUMN_RENDERS,
    DEMO_RENDER: {
        name: 'demo render',
        component: DemoRender
    }
};

/**
 * @type {IComponentOptions}
 */
export default ({
    extends: Table,
    props: {
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
    data: () => ({
        descriptor: descriptor()
    }),
    // @todo: DELETE UNUSED STUFF
    /*
    watch: {
        $storeState(state, prevState) {
            // to be implement watch
        },
        $routeCurrent(route, prevRoute) {
            // to be implement watch
        },
    },
    */
    /**
     * @todo: DELETE UNUSED STUFF
     * @this {IInstance}
     */
    created() {
        // to be implemented
    },
    methods: {
        getPanels() {
            const panels = this.super(Table).getPanels.call(this);
            return [
                ...panels,
                [[{panelName}]]Async
            ];
        },
        [[#pagination]]
        getPaginationPanel() {
            return PaginationPanelAsync;
        },
        [[/pagination]]
        // @todo: DELETE UNUSED STUFF
        /*
        sampleStoreCommitMethod() {
           // ...
           this.$storeCommit(updatedState);
        },
        sampleRouteNavigateMethod() {
           // ...
           this.$routeNavigate({ path, query });
        },
        */
    }
});
</script>
