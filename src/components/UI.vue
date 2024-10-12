<template>
  <div class="pagination-container" :style="rtl ? 'direction: rtl;' : 'direction: ltr;'">
    <div class="pagination-controls">
      <pagination 
      :modelValue="modelValue" 
      @update:modelValue="handlePageChange" 
      :searchPage="searchPage"
      @update:searchPage="handleSearchPage"
      v-bind="$attrs">
        <template #superPrev="{disabled}">
          <slot name="superPrev" :disabled="disabled" :rtl="rtl"></slot>
            <v-btn 
              v-if="showDefaultSuperPrev"
              :icon="'mdi-chevron-double-'+ iconNameStart"
              :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(activeTextColor), getBgColor(activeColor)]"
              :disabled="disabled"
            ></v-btn>
        </template>
        <template #prev="{disabled}">
          <slot name="prev" :disabled="disabled" :rtl="rtl"></slot>
            <v-btn 
              v-if="showDefaultPrev"
              :icon="'mdi-chevron-' + iconNameStart" 
              :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(activeTextColor), getBgColor(activeColor)]"
              :disabled="disabled"
            ></v-btn>
        </template>
        <template #default="{isCurrentPage, isActive, page}" >
          <slot name="default" :isCurrentPage="isCurrentPage" :isActive="isActive" :page="page"></slot>
          <div v-if="isCurrentPage && showDefaultPagination"
          class="cursor-pointer elevation-1"
          :class="[
            isActive ? 'currentPageNumber' : 'pageNumber',
            getBorderRadiusSize(borderRadiusSize),
            getSize(size),
            getBgColor(isActive ? activeColor : onActiveColor),
            getColor(isActive ? activeTextColor : onActiveTextColor),
            getBorder(borderSize, borderStyle)
          ]">
            {{ page }}
          </div>
          <span v-if="page === -1 && showDefaultPagination" class="dot mx-2" :class="getColor(activeColor)">...</span>
        </template>
        <template #next="{disabled}">
          <slot name="next" :disabled="disabled" :rtl="rtl"></slot>
          <v-btn 
            v-if="showDefaultNext"
            :icon="'mdi-chevron-' + iconNameEnd"
            :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(activeTextColor), getBgColor(activeColor)]"
            :disabled="disabled"
          ></v-btn>
        </template>
        <template #superNext="{disabled}">
          <slot name="superNext" :disabled="disabled" :rtl="rtl"></slot>
          <v-btn 
            v-if="showDefaultSuperNext"
            :icon="'mdi-chevron-double-' + iconNameEnd"
            :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(activeTextColor), getBgColor(activeColor)]"
            :disabled="disabled"
          ></v-btn>
        </template>
        <template #searchPageInput="{enabled}">
          <slot name="searchPageInput" :enabled="enabled"></slot>
          <input
            v-if="showDefaultsearchPageInput && enabled"
            :value="searchPage"
            @input="handleInput"
            class="searchPage "
            :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(onActiveTextColor), getBgColor(onActiveColor), getBorder(borderSize, borderStyle)]"
          />
        </template>
        <template #searchPageBtn="{enabled}">
          <slot name="searchPageBtn" :enabled="enabled"></slot>
          <v-btn 
            v-if="showDefaultsearchPageBtn && enabled"
            :icon="'mdi-magnify'"
            :class="[getBorderRadiusSize(borderRadiusSize), getSize(size), getColor(activeTextColor), getBgColor(activeColor), getBorder(borderSize, borderStyle)]"
          ></v-btn>
        </template>
      </pagination>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, defineProps, useSlots, defineEmits, defineOptions, onMounted } from 'vue';
  import pagination from '@/components/Pagination.vue';
  import { colorClassName, bgColorClassName } from '@/composables/composable'
  import { createSizeProp, useSize } from '@/composabless/SizeProps'
  import { createRoundedProp, useRounded } from '@/composabless/RoundedProps'
  import { applyDynamicClass } from '@/assets/border/borderWidth';
  import { createBorderProp, useBorder } from '@/composabless/BorderProps';
  import { uiSlots } from '@/components/Slots'
  import { uiProps } from '@/components/Props';
  import { paginationEmits } from '@/components/Emits';
  
  const props = defineProps({
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
  });
  const slots = defineSlots<uiSlots>();
  const props = defineProps(uiProps);
  defineOptions({
    inheritAttrs: false
  });
  const emit = defineEmits(PaginationEmits);
  const iconNameStart = computed(() => props.rtl ? 'right' : 'left');
  const iconNameEnd = computed(() => props.rtl ? 'left' : 'right');
  const slots = useSlots();
  const showDefaultPagination = computed(() => !slots.default);
  const showDefaultPrev = computed(() => !slots.prev);
  const showDefaultNext = computed(() => !slots.next);
  const showDefaultSuperPrev = computed(() => !slots.superPrev);
  const showDefaultSuperNext = computed(() => !slots.superNext);
  const showDefaultsearchPageInput = computed(() => !slots.superPrev);
  const showDefaultsearchPageBtn = computed(() => !slots.superNext);
  const handlePageChange = (newValue: number) => {
    emit('update:modelValue', newValue);
  };
  const handleSearchPage = (newValue: number) => {
    emit('update:searchPage', newValue);
  };
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      const value = target.value;
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue && Number(numericValue) >= 0) {
        emit('update:searchPage', Number(numericValue));
      }
      target.value = numericValue;
    }
  };
  const getBorderRadiusSize = (size: 'none' | 'xs' | 'sm' | 'lg' | '' | 'md' | 'xl' | 'circle'): string => {
    let class_name = useRounded(size);
    return class_name;
  };
  const getSize = (size: 'sm' | 'md' | '' | 'lg' | 'xl' | 'xs'): string => {
    let class_name = useSize(size);
    return class_name;
  };
  const getColor = (color: string ): string => {
    let class_name = colorClassName(color);
    return class_name;
  };
  const getBgColor = (color: string ): string => {
    let class_name = bgColorClassName(color);
    return class_name;
  };
  const getBorder = (borderSize : string | 'none' | 'sm' | 'md' | '' | 'lg' | 'xl', borderStyle : string | 'solid' | 'dashed' | 'dotted' | 'double' | 'hidden' | 'none'): string => {
    let class_name = useBorder(borderSize, borderStyle);
    return class_name;
  };
  onMounted(() => {
    applyDynamicClass();
  })
  
</script>

<style scoped>
  .searchPage {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  }
  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .pageNumber{
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    
  }
  .v-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .currentPageNumber {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  } 

  .dot{
    -webkit-user-select: none; 
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
  }

</style>
  
