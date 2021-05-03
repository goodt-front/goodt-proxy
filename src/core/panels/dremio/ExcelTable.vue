<template>
    <table class="table table-borders table-hover table-vmid w-100 h-100">
        <thead>
            <tr class="table-row-sticky">
                <slot name="header-cell-summary">
                    <th>
                        <div class="text-center">
                            <i class="mdi mdi-table mdi-18px" />
                        </div>
                    </th>
                </slot>
                <slot
                    v-for="(item, i) in headerFull"
                    v-bind="{
                        item,
                        colIndex: i,
                        numCols,
                        letter: toColumnName(i + 1)
                    }"
                    name="header-cell"
                >
                    <th :key="`header-${i}`">
                        <div>{{ toColumnName(i + 1) }}</div>
                        <div>{{ item }}</div>
                    </th>
                </slot>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in bodyFull" :key="`row-${i}`">
                <td class="table-col-sticky">
                    <div class="text-center text-small">
                        {{ i + 1 }}
                    </div>
                </td>
                <td v-for="(item, j) in headerFull" :key="`col-${j}`">
                    <slot name="data-cell" v-bind="{ row, col: item, colIndex: j, rowIndex: i }">
                        <div class="text-right">
                            {{ row }}
                        </div>
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style lang="less" scoped>
.table {
    th,
    td {
        border: 1px solid var(--color-border);
    }
    .table-row-sticky {
        position: sticky;
        top: 0;
        z-index: 1;
        height: 1%;
        th {
            position: relative;
            vertical-align: top;
        }
    }
    .table-col-sticky {
        position: sticky;
        left: 0;
    }
    .table-row-sticky th,
    .table-col-sticky {
        background: #edf4fe;
        &:before {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-right: 1px solid var(--color-grey-light);
            border-bottom: 1px solid var(--color-grey-light);
            pointer-events: none;
            content: '';
        }
    }
}
</style>
<script>
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export default {
    props: {
        header: {
            type: Array,
            default() {
                return [];
            }
        },
        body: {
            type: Array,
            default() {
                return [];
            }
        },
        minCols: {
            type: Object,
            default() {
                return { min: 4, max: 10 };
            }
        },
        minRows: {
            type: Number,
            default: 10
        }
    },
    computed: {
        headerFull() {
            const arr = [...this.header];
            const n = this.numCols - arr.length;
            for (let i = 0; i < n; i++) {
                arr.push(null);
            }
            return arr;
        },
        bodyFull() {
            const arr = [...this.body];
            const n = this.minRows - arr.length;
            for (let i = 0; i < n; i++) {
                arr.push(null);
            }
            return arr;
        },
        numCols() {
            const { min, max } = this.minCols;
            const l = this.header.length;
            if (l < min) {
                return min;
            }
            return l < max ? l : max;
        }
    },
    methods: {
        toColumnName(num) {
            const n = alphabet.length;
            let ret = '';
            for (let a = 1, b = n; (num -= a) >= 0; a = b, b *= n) {
                ret = alphabet[parseInt((num % b) / a)] + ret;
            }
            return ret;
        }
    }
};
</script>
