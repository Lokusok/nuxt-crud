<template>
  <ul class="flex gap-3 flex-wrap">
    <li v-for="page in props.maxPage" :key="page">
      <button
        :class="{
          'bg-blue-300 pointer-events-none opacity-50': props.currentPage === page
        }"
        class="flex justify-center items-center w-[30px] h-[30px] rounded text-white bg-blue-800 hover:bg-blue-500 active:opacity-80"
        @click="$emit('change', page)"
      >
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  maxPage: number
}>()
</script>