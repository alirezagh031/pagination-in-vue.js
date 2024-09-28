import { ref } from 'vue';
export function roundedClassName(borderRadiusSize : string | 'none' | 'xs' | 'sm' | 'lg' | '' | 'md' | 'xl' | 'circle') {
    const class_name = ref('roundedd-');
    class_name.value = class_name.value + borderRadiusSize;
    return class_name.value;
}

export function sizeClassName(size : string | 'sm' | 'md' | '' | 'lg' | 'xl' | 'xs') {
    const class_name = ref('size-');
    class_name.value = class_name.value + size;
    return class_name.value;
}

export function colorClassName(color : string) {
    const class_name = ref('text-');
    class_name.value = class_name.value + color;
    return class_name.value;
}

export function bgColorClassName(bg_color : string) {
    const class_name = ref('bg-');
    class_name.value = class_name.value + bg_color;
    return class_name.value;
}
