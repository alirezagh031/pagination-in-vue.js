<template>
  <div @click="superPrevPage">
    <slot name="superPrev" :disabled="modelValue === 1"></slot>
  </div>
  <div @click="prevPage">
    <slot name="prev" :disabled="modelValue === 1"></slot>
  </div>
  <template v-for="(page, index) in getPages" :key="index">
      <div @click="setModelValue(page)">
      <slot name="default" :isCurrentPage="typeof page === 'number' && page !== -1" :isActive="page === modelValue" :page="page"></slot>
      </div>
  </template>
  <div @click="nextPage" >
    <slot name="next" :disabled="modelValue === pageSize"></slot>
  </div>
  <div @click="superNextPage">
    <slot name="superNext" :disabled="modelValue === pageSize"></slot>
  </div>
  <div>
    <slot name="searchPageInput" :enabled="enableSearchPage"></slot>
  </div>
  <div @click="setSearchPage(searchPage)">
    <slot name="searchPageBtn" :enabled="enableSearchPage"></slot>
  </div>
</template>
  
<script setup lang="ts">
  import {
    defineEmits,
    withDefaults,
    computed,
    defineProps,
    defineSlots
  } from "vue";
  import { paginationSlots } from '@/components/slots';
  import { paginationProps } from "@/components/props";
  import { paginationEmits } from "@/components/emits";
  const props = defineProps({
    pageSize: { type: Number, default: 20 },
    startCountPageShow: { type: Number, default: 2 },
    endCountPageShow: { type: Number, default: 2 },
    insideOfActivePageShow: { type: Number, default: 1 },
    modelValue: { type: Number, default: 1 },
    searchPage: { type: Number, default: undefined },
    enableSearchPage: { type: Boolean, default: true },
  });
  
  const slots = defineSlots<paginationSlots>();
  const props = defineProps(paginationProps);
  
  const emit = defineEmits(paginationEmits);
  const prevPage = () => {
    if (props.modelValue > 1) {
      emit("update:modelValue", props.modelValue - 1);
    }
  };
  
  const nextPage = () => {
    if (props.modelValue < props.pageSize) {
      emit("update:modelValue", props.modelValue + 1);
    }
  };
  
  const superPrevPage = () => {
    if (props.modelValue > 1) {
      emit("update:modelValue", 1);
    }
  };
  
  const superNextPage = () => {
    if (props.modelValue < props.pageSize) {
      emit("update:modelValue", props.pageSize);
    }
  };
  
  const setModelValue = (temp: number) => {
    emit("update:modelValue", temp);
  };
  const setSearchPage = (searchnum: number) => {
    if(searchnum > 0 && searchnum <= props.pageSize){
      emit("update:modelValue", searchnum);
    }
    emit("update:searchPage", undefined);
    console.log(props.searchPage);
  };
  
  const getPages = computed(() => {
    let arrayBtn: number[] = [];
    for (let i = 1; i <= props.startCountPageShow; i++) {
      if (props.pageSize > i + 1 && props.modelValue > i + 1) arrayBtn.push(i);
    }
    if (props.pageSize > props.startCountPageShow + 2 && props.modelValue > props.startCountPageShow + 2)
      arrayBtn.push(-1);
    for (let i = props.insideOfActivePageShow; i > 0; i--) {
      if (props.modelValue - i > 0) arrayBtn.push(props.modelValue - i);
    }
    if (props.modelValue > 0) arrayBtn.push(props.modelValue);
    for (let i = 0; i < props.insideOfActivePageShow; i++) {
      if (props.modelValue + i + 1 <= props.pageSize)
        arrayBtn.push(props.modelValue + i + 1);
    }
    if (props.modelValue + props.endCountPageShow + 2 <= props.pageSize) arrayBtn.push(-1);
    for (let i = props.endCountPageShow - 1; i >= 0; i--) {
      if (props.modelValue + i + 2 <= props.pageSize)
        arrayBtn.push(props.pageSize - i);
    }
    return arrayBtn;
  });
</script>
