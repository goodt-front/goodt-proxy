```vue
<template>
    <div class="row">
        <div class="col">
            <ui-input-auto v-model="model" :options="['aa', 'ab', 'abb', 'abba']">
                input
            </ui-input-auto>
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
