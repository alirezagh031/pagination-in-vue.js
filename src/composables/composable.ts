import { ref, computed } from 'vue';
export function createColorProp(defaultActiveColor: string = 'text-white', defaultOnActiveColor: string = 'text-black'){
    return {
        activeTextColor: {
            type: String,
            default: defaultActiveColor
        },
        onActiveTextColor: {
            type: String,
            default: defaultOnActiveColor
        }
    };
}

export function createBgColorProp(defaultBgActiveColor: string = 'bg-slate-950', defaultBgOnActiveColor: string = 'bg-slate-200'){
    return {
        BgActiveColor: {
            type: String,
            default: defaultBgActiveColor
        },
        BgOnActiveColor: {
            type: String,
            default: defaultBgOnActiveColor
        }
    };
}
export function colorClassName(props: {activeTextColor: string; onActiveTextColor: string}) {
    const className = computed(() => {
        return [`color-${props.activeTextColor}`, `color-${props.onActiveTextColor}`];
    })
    
    return className;
}

export function bgColorClassName(props: {BgactiveColor: string; BgonActiveColor: string}) {
    const className = computed(() => {
        return [`bg-${props.activeColor}`, `bg-${props.onActiveColor}`];
    })
    
    return className;
}
