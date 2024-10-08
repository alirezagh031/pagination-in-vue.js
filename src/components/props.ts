import { createBorderProp } from "@/composabless/BorderProps";
import { createRoundedProp } from "@/composabless/RoundedProps";
import { createSizeProp } from "@/composabless/SizeProps";

export const paginationProps = {
    pageSize: { type: Number, default: 20 },
    startCountPageShow: { type: Number, default: 2 },
    endCountPageShow: { type: Number, default: 2 },
    insideOfActivePageShow: { type: Number, default: 1 },
    modelValue: { type: Number, default: 1 },
    searchPage: { type: Number, default: undefined },
    enableSearchPage: { type: Boolean, default: true },
};

export const uiProps = {
    activeColor: { type: String, default: 'blue-grey-darken-4' },
    onActiveColor: { type: String, default: 'blue-lighten-5' },
    activeTextColor: { type: String, default: 'white' },
    onActiveTextColor: { type: String, default: 'black' },
    ...createRoundedProp(),
    ...createSizeProp(),
    ...createBorderProp(),
    modelValue: { type: Number, required: false },
    searchPage: { type: Number, required: false },
    rtl: { type: Boolean, default: true },
}
