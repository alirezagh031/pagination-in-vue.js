export interface paginationSlots {
    superPrev(props: { disabled: boolean }): any,
    prev(props: { disabled: boolean }): any,
    default(props: { isCurrentPage: boolean, isActive: boolean, page: number }): any,
    next(props: { disabled: boolean }): any,
    superNext(props: { disabled: boolean }): any,
    searchPageInput(props: { enabled: boolean }): any,
    searchPageBtn(props: { enabled: boolean }): any
}

export interface uiSlots {
    superPrev(props: { disabled: boolean, rtl: boolean }): any,
    prev(props: { disabled: boolean, rtl: boolean }): any,
    default(props: { isCurrentPage: boolean, isActive: boolean }): any,
    next(props: { disabled: boolean, rtl: boolean }): any,
    superNext(props: { disabled: boolean, rtl: boolean }): any,
    searchPageInput(props: { enabled: boolean }): any,
    searchPageBtn(props: { enabled: boolean }): any
}
