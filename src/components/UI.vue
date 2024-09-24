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
                :style="{ backgroundColor: activeColor || '',
                          color : activeTextColor || '',
                          width : getSize(size) + 'px',
                          height : getSize(size) + 'px',
                          fontSize : getSize(size) / 3 + 'px'}"
                :class="getBorderRadiusSize(borderRadiusSize)"
                :disabled="disabled"
              ></v-btn>
          </template>
          <template #prev="{disabled}">
            <slot name="prev" :disabled="disabled" :rtl="rtl"></slot>
              <v-btn 
                v-if="showDefaultPrev"
                :icon="'mdi-chevron-' + iconNameStart" 
                :style="{ backgroundColor: activeColor || '',
                          color : activeTextColor || '',
                          width : getSize(size) + 'px',
                          height : getSize(size) + 'px',
                          fontSize : getSize(size) / 3 + 'px'}"
                :class="getBorderRadiusSize(borderRadiusSize)"
                :disabled="disabled"
              ></v-btn>
          </template>
          <template #default="{isCurrentPage, isActive, page}" >
            <slot name="default" :isCurrentPage="isCurrentPage" :isActive="isActive" :page="page"></slot>
            <div v-if="isCurrentPage && showDefaultPagination"
            class="cursor-pointer elevation-1"
            :style="{ backgroundColor: isActive ? activeColor || '' : onActiveColor || '',
              color: isActive ? activeTextColor || '' : onActiveTextColor || '',
              
              width : getSize(size) + 'px',
              height : getSize(size) + 'px',
              fontSize : getSize(size) / 3 + 'px'
            }"
            :class="[
              isActive ? 'currentPageNumber' : 'pageNumber',
              getBorderRadiusSize(borderRadiusSize)
            ]">
              {{ page }}
            </div>
            <span v-if="page === -1 && showDefaultPagination" class="dot mx-2">...</span>
          </template>
          <template #next="{disabled}">
            <slot name="next" :disabled="disabled" :rtl="rtl"></slot>
            <v-btn 
              v-if="showDefaultNext"
              :icon="'mdi-chevron-' + iconNameEnd"
              :style="{ backgroundColor: activeColor || '',
                        color : activeTextColor || '',
                        width : getSize(size) + 'px',
                        height : getSize(size) + 'px',
                        fontSize : getSize(size) / 3 + 'px'}"
              :class="getBorderRadiusSize(borderRadiusSize)"
              :disabled="disabled"
            ></v-btn>
          </template>
          <template #superNext="{disabled}">
            <slot name="superNext" :disabled="disabled" :rtl="rtl"></slot>
            <v-btn 
              v-if="showDefaultSuperNext"
              :icon="'mdi-chevron-double-' + iconNameEnd"
              :style="{ backgroundColor: activeColor || '',
                        color : activeTextColor || '',
                        width : getSize(size) + 'px',
                        height : getSize(size) + 'px',
                        fontSize : getSize(size) / 3 + 'px'}"
              :class="getBorderRadiusSize(borderRadiusSize)"
              :disabled="disabled"
            ></v-btn>
          </template>
          <template #searchPageInput="{enabled}">
            <slot name="searchPageInput" :enabled="enabled"></slot>
            <input
              v-if="showDefaultsearchPageInput && enabled"
              :value="searchPage"
              @input="handleInput"
              :style="{ backgroundColor: onActiveColor || '',
                        color : onActiveTextColor || '',
                        width : getSize(size) + 'px',
                        height : getSize(size) + 'px',
                        fontSize : getSize(size) / 3 + 'px'}"
                        class="searchPage elevation-1"
              :class="getBorderRadiusSize(borderRadiusSize)"
            />
          </template>
          <template #searchPageBtn="{enabled}">
            <slot name="searchPageBtn" :enabled="enabled"></slot>
            <v-btn 
              v-if="showDefaultsearchPageBtn && enabled"
              :icon="'mdi-magnify'"
              :style="{ backgroundColor: activeColor || '',
                        color : activeTextColor || '',
                        width : getSize(size) + 'px',
                        height : getSize(size) + 'px',
                        fontSize : getSize(size) / 3 + 'px'}"
              :class="getBorderRadiusSize(borderRadiusSize)"
            ></v-btn>
          </template>
        </pagination>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
    import { computed, defineProps, withDefaults, useSlots, defineEmits, defineOptions } from 'vue';
    import pagination from '@/components/Pagination.vue';
    import { roundedClassName } from '@/composables/composable.ts'
    import '@/assets/rounded.scss'    

    export interface Props {
        // pageSize: number;
        // startCountPageShow?: number;
        // endCountPageShow?: number;
        // insideOfActivePageShow?: number;
        activeColor : string;
        onActiveColor : string;
        activeTextColor : string;
        onActiveTextColor : string;
        borderRadiusSize : 'sm' | 'lg' | 'xl' | 'circle';
        size : 'sm' | 'lg' | 'xl' ;
        modelValue?: number;
        searchPage? : number
        rtl: boolean;
      }

    const props = withDefaults(defineProps<Props>(), {
        rtl:true,
        activeColor : undefined,
        onActiveColor : undefined,
        activeTextColor : undefined,
        onActiveTextColor : undefined,
        borderRadiusSize : 'circle'
    });
    defineOptions({
      inheritAttrs: false
    });
    const emit = defineEmits(["update:modelValue", "update:searchPage"]);
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
    const getBorderRadiusSize = (size: 'sm' | 'lg' | 'xl' | 'circle'): string => {
      let class_name = roundedClassName(size);
      return class_name;
    };
  const getSize = (size: 'sm' | 'lg' | 'xl' ): number => {
    switch (size) {
      case 'sm':
        return 30;
      case 'lg':
        return 45;
      case 'xl':
        return 70;
    }
  };
  </script>

  <style scoped>
    @import '@/assets/rounded.scss';
    .searchPage {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      background-color: rgb(234, 248, 253);
      color: black;
      width: 48px;
      height: 48px;
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
      width: 48px;
      height: 48px;
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .currentPageNumber {
      width: 48px;
      height: 48px;
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
    
