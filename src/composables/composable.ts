import { ref } from 'vue';
export function roundedClassName(borderRadiusSize : string) {
    const class_name = ref('roundedd-');
    class_name.value = class_name.value + borderRadiusSize;
    return class_name.value;
}
