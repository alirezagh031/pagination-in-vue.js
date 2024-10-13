import { computed, PropType } from 'vue';

export function createRoundedProp(defaultSize: string = 'md') {
    return {
        borderRadiusSize: {
            type: String as PropType<'none' | 'xs' | 'sm' | 'lg' | '' | 'md' | 'xl' | 'circle'>,
            default: defaultSize
        }
    };
}
export function useRounded(props: {borderRadiusSize: string}) {
    const className = computed(() => {
        return `roundedd-${props.borderRadiusSize}`;
    });
    return className;
}
