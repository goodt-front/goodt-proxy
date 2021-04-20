```vue
<template>
    <div>
        <ui-panel
            :groups="[
                { name: 'Group1', slot: 'group1' },
                { name: 'Group2', slot: 'group2' }
            ]"
        >
            <template #group1>Group1 content</template>
            <template #group2>Group2 content</template>
        </ui-panel>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui }
};
</script>
```
