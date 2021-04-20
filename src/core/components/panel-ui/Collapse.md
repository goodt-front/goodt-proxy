```vue
<template>
    <div>
        <ui-collapse>
            <template #header>My collapse</template>
            <h3>Title</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, maxime?
        </ui-collapse>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui }
};
</script>
```
