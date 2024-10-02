import { PropType, ref } from 'vue';

export function createRoundedProp(defaultSize: string = 'md') {
    return {
        borderRadiusSize: {
            type: String as PropType<'none' | 'xs' | 'sm' | 'lg' | '' | 'md' | 'xl' | 'circle'>,
            default: defaultSize
        }
    };
}
export function useRounded(size : string | 'none' | 'xs' | 'sm' | 'lg' | '' | 'md' | 'xl' | 'circle') {
    const class_name = ref('roundedd-');
    class_name.value = class_name.value + size;
    return class_name.value;
}
