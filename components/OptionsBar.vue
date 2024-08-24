<template>
  <div class="relative max-w-[450px] mx-auto">
    <div class="h-[120px]">
      <FadeTransition mode="out-in">
        <SearchBar
          v-if="props.option === 'search'"
          v-model="searchModel"
          :is-loading="props.isLoading"
          class="mb-[30px]"
        />

        <div
          v-if="props.option === 'layouts'"
          class="flex gap-x-3 justify-center items-center h-[80px]"
        >
          <TheButton
            :disabled="props.mode === 'flex'"
            class="font-bold"
            @click="changeActiveMode('flex')"
          >
            {{ $t('users.columnOption') }}
          </TheButton>

          <TheButton
            :disabled="props.mode === 'grid'"
            class="font-bold"
            @click="changeActiveMode('grid')"
          >
            {{ $t('users.gridOption') }}
          </TheButton>
        </div>
      </FadeTransition>
    </div>

    <div class="absolute right-0 top-[30%] -translate-y-[50%] flex flex-col gap-y-[15px]">
      <button
        :class="{
          'pointer-events-none bg-blue-600 opacity-50': props.option === 'search'
        }"
        class="bg-blue-800 text-white w-[30px] h-[30px] rounded-full flex justify-center items-center transition-colors"
        @click="changeActiveOption('search')"
      >
        <SearchIcon class="pl-[1.5px] pt-[1.5px] text-[23px]" />
      </button>

      <button
        :class="{
          'pointer-events-none bg-blue-600 opacity-50': props.option === 'layouts'
        }"
        class="bg-blue-800 text-white w-[30px] h-[30px] rounded-full flex justify-center items-center transition-colors"
        @click="changeActiveOption('layouts')"
      >
        <GridIcon class="-pl-[4.5px] pt-[1.5px] text-[23px]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/SearchBar.vue'

import GridIcon from '~/assets/icons/grid.svg'
import SearchIcon from '~/assets/icons/search.svg'

import type { TMode, TOption } from '~/types/users';

const props = withDefaults(defineProps<{
  option?: TOption
  mode?: TMode
  isLoading?: boolean
}>(), {
  option: 'search',
  mode: 'flex',
  isLoading: false
})

const emit = defineEmits<{
  changeMode: [TMode]
  changeOption: [TOption]
}>()

const searchModel = defineModel<string>()

function changeActiveMode(value: TMode) {
  emit('changeMode', value)
}

function changeActiveOption(value: TOption) {
  emit('changeOption', value)
}
</script>