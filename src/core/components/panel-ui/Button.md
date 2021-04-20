```vue
<template>
    <div>
        <p>
            <ui-button>Button</ui-button>
        </p>
        <p>
            <ui-button type="outline">Button</ui-button>
        </p>
        <p>
            <ui-button inline>Button</ui-button>
        </p>
        <p>
            <ui-button icon>
                <i class="mdi mdi-account"></i>
            </ui-button>
        </p>
    </div>
</template>
<script>
import ui from './index.js';

export default {
    components: { ...ui }
};
</script>
```
