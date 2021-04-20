```vue
<template>
    <div class="row">
        <div class="col">
            <p>
                <ui-select v-model="model" :options="options">select</ui-select>
            </p>
            <p>
                <ui-select v-model="modelMultiple" :options="options" multiple>select</ui-select>
            </p>
        </div>
        <div class="col">
            <pre>{{ model }}</pre>
            <pre>{{ modelMultiple }}</pre>
        </div>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui },
    data() {
        return {
            model: '',
            modelMultiple: [],
            options: [
                { value: 1, label: 'option1' },
                { value: 2, label: 'option2' },
                { value: 3, label: 'option3' }
            ]
        };
    }
};
</script>
```
