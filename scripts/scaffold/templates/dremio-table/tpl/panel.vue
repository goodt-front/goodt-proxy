<template>
    <div>
        <!-- your panel goes here -->
    </div>
</template>
<script>
import { Panel } from '[[{core}]]';
import [[{name}]] from './../[[{name}]].vue';

const { descriptor } = [[{name}]].data();

export default {
    extends: Panel,
    data() {
        return {
            $meta: { name: 'SettingsPanel', icon: '' },
            descriptor
        };
    }
};
</script>
