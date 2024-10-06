import { PropType, ref } from 'vue';

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
export function useBorder(size : string | 'none' | 'sm' | 'md' | '' | 'lg' | 'xl' , style : string | 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none' | '') {
    const class_name = ref('border-');
    switch(size) {
        case 'none': {
            size = '0';
            break;
        }
        case 'sm': {
            size = '2';
            break;
        }
        case 'md': {
            size = '4';
            break;
        }
        case '': {
            size = '0';
            break;
        }
        case 'lg': {
            size = '6';
            break;
        }
        case 'xl': {
            size = '8';
            break;
        }
        default: {
            size = '0';
            break;
        }
    }
    class_name.value = class_name.value + size;
    if (style !== ''){
        class_name.value = class_name.value + '-' + style;
    }
        return class_name.value;
}
