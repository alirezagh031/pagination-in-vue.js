import { computed, PropType } from 'vue';

export function createBorderProp(defaultSize: string = '', defaultStyle: string = 'solid') {
    return {
        borderSize: {
            type: String as PropType<'none' | 'sm' | 'md' | '' | 'lg' | 'xl'>,
            default: defaultSize
        },
        borderStyle: {
            type: String as PropType<'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none' | ''>,
            default: defaultStyle
        }
    };
}
export function useBorder(props: { borderSize: string; borderStyle: string }) {
    const class_name = computed(() => {
        let size = '';
        switch (props.borderSize) {
            case 'none':
                size = '0';
                break;
            case 'sm':
                size = '2';
                break;
            case 'md':
                size = '4';
                break;
            case '':
                size = '0';
                break;
            case 'lg':
                size = '6';
                break;
            case 'xl':
                size = '8';
                break;
            default:
                size = '0';
                break;
        }
        return `border-${size}${props.borderStyle ? '-' + props.borderStyle : ''}`;
    });
    
    return class_name;
}
