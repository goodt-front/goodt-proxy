<script>
import Table, { COLUMN_RENDERS } from '[[{lib}]]/ElemDremioTable/ElemDremioTable.vue';
[[#pagination]]
import DemoPagination from './components/Pagination.vue';
[[/pagination]]
import DemoTableRow from './components/TableRow.vue';
import renders from './renders';
import { descriptor, /* Vars */ } from './descriptor';
import { ElemInstanceTypeDescriptor } from './types';
import Panels, { PaginationPanelAsync } from '[[{panelPath}]]';


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
        descriptor: descriptor(),
        /* Vetur HACK */
        ...ElemInstanceTypeDescriptor
    }),
    created() {
        // to be implemented
    },
    methods: {
        getPanels() {
            const panels = this.super(Table).getPanels.call(this);
            return [
                ...panels,
                ...Panels
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
