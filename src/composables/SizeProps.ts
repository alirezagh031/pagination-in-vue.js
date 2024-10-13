import { PropType, computed } from 'vue';

export function createSizeProp(defaultSize: string = 'md') {
    return {
        size: {
            type: String as PropType<'sm' | 'md' | '' | 'lg' | 'xl' | 'xs'>,
            default: defaultSize
        }
    };
}
export function useSize(props: { size: string }) {
    const className = computed(() => {
        return `size-${props.size}`;
    });
    
    return className;
}
