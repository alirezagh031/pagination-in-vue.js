import { ref, computed } from 'vue';

export function colorClassName(props: {activeTextColor: string; onActiveTextColor: string}) {
    const className = computed(() => {
        return [`color-${props.activeTextColor}`, `color-${props.onActiveTextColor}`];
    })
    
    return className;
}

export function bgColorClassName(props: {activeColor: string; onActiveColor: string}) {
    const className = computed(() => {
        return [`bg-${props.activeColor}`, `bg-${props.onActiveColor}`];
    })
    
    return className;
}
