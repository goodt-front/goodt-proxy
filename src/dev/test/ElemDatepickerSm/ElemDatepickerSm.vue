<template>
    <div class="d-inline-block" :class="cssClass" :style="cssStyle">
        <input class="input d-block w-100" type="date" :value="date" @change="onDatePick" />
    </div>
</template>
<script>
import { Elem } from '../../../core/index';

const descriptor = () => ({
    props: {},
    vars: {
        date: {
            description: 'Defines the datepicker date'
        }
    }
});

export default {
    extends: Elem,
    data() {
        return {
            descriptor: descriptor(),
            date: null
        };
    },
    watch: {
        $state(val) {
            if (val.date !== undefined) {
                this.date = val.date;
            }
        }
    },
    methods: {
        isChildAllowed() {
            return false;
        },
        getSlotNames() {
            return [];
        },
        onDatePick(e) {
            this.date = e.target.value;
            this.$storeCommit({ date: this.date });
        }
    }
};
</script>
