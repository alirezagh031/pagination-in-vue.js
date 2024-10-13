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
              :class="[roundedClass, sizeClass, textColorClass[0], bgColorClass[0]]"
              :disabled="disabled"
            ></v-btn>
        </template>
        <template #prev="{disabled}">
          <slot name="prev" :disabled="disabled" :rtl="rtl"></slot>
            <v-btn 
              v-if="showDefaultPrev"
              :icon="'mdi-chevron-' + iconNameStart" 
              :class="[roundedClass, sizeClass, textColorClass[0], bgColorClass[0]]"
              :disabled="disabled"
            ></v-btn>
        </template>
        <template #default="{isCurrentPage, isActive, page}" >
          <slot name="default" :isCurrentPage="isCurrentPage" :isActive="isActive" :page="page"></slot>
          <div v-if="isCurrentPage && showDefaultPagination"
          class="cursor-pointer elevation-1"
          :class="[
            isActive ? 'currentPageNumber' : 'pageNumber',
            roundedClass,
            sizeClass,
            isActive ? bgColorClass[0] : bgColorClass[1],
            isActive ? textColorClass[0] : textColorClass[1],
            borderClass
          ]">
            {{ page }}
          </div>
          <span v-if="page === -1 && showDefaultPagination" class="dot mx-2" :class="textColorClass[1]">...</span>
        </template>
        <template #next="{disabled}">
          <slot name="next" :disabled="disabled" :rtl="rtl"></slot>
          <v-btn 
            v-if="showDefaultNext"
            :icon="'mdi-chevron-' + iconNameEnd"
            :class="[roundedClass, sizeClass, textColorClass[0], bgColorClass[0]]"
            :disabled="disabled"
          ></v-btn>
        </template>
        <template #superNext="{disabled}">
          <slot name="superNext" :disabled="disabled" :rtl="rtl"></slot>
          <v-btn 
            v-if="showDefaultSuperNext"
            :icon="'mdi-chevron-double-' + iconNameEnd"
            :class="[roundedClass, sizeClass, textColorClass[0], bgColorClass[0]]"
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
            :class="[roundedClass, sizeClass, textColorClass[1], bgColorClass[1], borderClass]"
          />
        </template>
        <template #searchPageBtn="{enabled}">
          <slot name="searchPageBtn" :enabled="enabled"></slot>
          <v-btn 
            v-if="showDefaultsearchPageBtn && enabled"
            :icon="'mdi-magnify'"
            :class="[roundedClass, sizeClass, textColorClass[0], bgColorClass[0], borderClass]"
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
  const slots = defineSlots<uiSlots>();
  const props = defineProps(uiProps);
  const sizeClass = useSize(props);
  const roundedClass = useRounded(props);
  const textColorClass = colorClassName(props);
  const bgColorClass = bgColorClassName(props);
  const borderClass = useBorder(props);
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
  
