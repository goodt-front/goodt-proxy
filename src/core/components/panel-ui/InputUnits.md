```vue
<template>
    <div class="row">
        <div class="col">
            <ui-input-units v-model="model" v-bind="options">
                label
            </ui-input-units>
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
        return {
            model: '100px',
            options: {
                units: ['px', 'rem', 'em'],
                options: ['small', 'normal', 'large'].map((value) => ({ value, label: value }))
            }
        };
    }
};
</script>
```
