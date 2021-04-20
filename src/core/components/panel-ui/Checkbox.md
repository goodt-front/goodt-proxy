```vue
<template>
    <div class="row">
        <div class="col">
            <ui-checkbox v-model="model">checkbox</ui-checkbox>
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
        return { model: false };
    }
};
</script>
```
