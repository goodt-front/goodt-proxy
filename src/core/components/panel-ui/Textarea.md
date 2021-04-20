```vue
<template>
    <div class="row">
        <div class="col">
            <ui-textarea v-model="model">textarea</ui-textarea>
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
        return { model: '' };
    }
};
</script>
```
