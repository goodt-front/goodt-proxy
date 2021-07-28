<script>
/**
 * @typedef {import('./[[{name}]]').IComponentOptions} IComponentOptions
 * @typedef {import('./[[{name}]]').IInstance} IInstance
 */
import Table, { COLUMN_RENDERS } from '[[{lib}]]/ElemDremioTable/ElemDremioTable.vue';
[[#pagination]]
import DemoPagination from './components/Pagination.vue';
[[/pagination]]
import DemoTableRow from './components/TableRow.vue';
import renders from './renders';
import { PaginationPanelAsync, [[{panelName}]]Async } from '[[{panelPath}]]';
import { descriptor, /* Vars */ } from './descriptor';

/**
 * @type {IInstance}
 */
export default {
    extends: Table,
    props: {
        columnRenders: {
            default() {
                return {...COLUMN_RENDERS, ...renders() };
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
    }
};
</script>
