```vue
<template>
    <div class="row">
        <div class="col">
            <ui-input-tags v-model="model">input</ui-input-tags>
        </div>
        <div class="col">
            <pre>{{ model }}</pre>
        </div>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui },
    data() {
        return { model: [] };
    }
};
</script>
```
