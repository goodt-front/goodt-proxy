```vue
<template>
    <div class="row">
        <div class="col">
            <ui-input-units v-model="model" :units="['px', 'rem', 'em']"> input </ui-input-units>
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
