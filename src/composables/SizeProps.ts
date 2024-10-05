import { PropType, ref } from 'vue';

export function createSizeProp(defaultSize: string = 'md') {
    return {
        size: {
            type: String as PropType<'sm' | 'md' | '' | 'lg' | 'xl' | 'xs'>,
            default: defaultSize
        }
    };
}
export function useSize(size : string | 'sm' | 'md' | '' | 'lg' | 'xl' | 'xs') {
    const class_name = ref('size-');
    class_name.value = class_name.value + size;
    return class_name.value;
}
