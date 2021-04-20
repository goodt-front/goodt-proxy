```vue
<template>
    <div>
        <ui-has-two-columns>
            <template #left>Left</template>
            <template #right>Right</template>
        </ui-has-two-columns>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui }
};
</script>
```
