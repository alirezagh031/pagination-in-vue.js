<template>
  <div class="back">
    <Pagination
    :modelValue="currentPage" @update:modelValue="currentPage= $event"
    :search-page="searchPage" @update:search-page="searchPage= $event"
    :pageSize="size"
    :border-radius-size="'xl'"
    :size="'lg'"
    :enableSearchPage="true"
    class="mt-16">

    </pagination>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import Pagination from '@/components/UI.vue';
  const size = ref(30);
  const currentPage = ref();
  const searchPage = ref();
</script>
<style scoped>
  .back{
    background-color: rgb(255, 255, 255);
    padding: 60px;
    width: 100%;
    height: 100%;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(234, 248, 253);
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }
  .pageNumber:hover{
  background-color: rgb(216, 243, 255);
  }
  .v-btn {
    width: 40px; 
    height: 40px;
    border-radius: 50%; 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .currentPageNumber {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(39, 39, 39);
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .currentPageNumber:hover{
    background-color: rgb(54, 54, 54);
  }

  .dot{
    color: black;
    -webkit-user-select: none; 
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; 
  }

</style>
      <!-- <template #superPrev="{disabled, rtl}">
        <v-btn 
          :icon="'mdi-chevron-double-'+ iconNameStart(rtl)"
          :disabled="disabled"
        ></v-btn>
      </template>
      <template #prev="{disabled, rtl}">
        <v-btn 
          :rtl2="rtl"
          :icon="'mdi-chevron-' + iconNameStart(rtl)" 
          :disabled="disabled"
        ></v-btn>
      </template>
      <template #default="{isCurrentPage, isActive, page}" >
        <div v-if="isCurrentPage "
        class="cursor-pointer elevation-1"
        :class="isActive ? 'currentPageNumber' : 'pageNumber'">
          {{ page }}
        </div>
      <span v-if="page === -1" class="dot mx-2">...</span>
      </template>
      <template #next="{disabled, rtl}">
        <v-btn 
          :icon="'mdi-chevron-' + iconNameEnd(rtl)" 
          :disabled="disabled"
        ></v-btn>
      </template>
      <template #superNext="{disabled, rtl}">
        <v-btn 
          :icon="'mdi-chevron-double-' + iconNameEnd(rtl)" 
          :disabled="disabled"
        ></v-btn>
      </template> -->