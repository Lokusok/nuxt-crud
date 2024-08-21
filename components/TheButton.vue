<template>
  <button
    :class="{
      'bg-red-800 hover:bg-red-500': props.variation === 'danger',
      'bg-green-800 hover:bg-green-500': props.variation === 'success',
      'bg-blue-800 hover:bg-blue-500': props.variation === 'info'
    }"
    :disabled="props.isLoading"
    class="disabled:pointer-events-none disabled:opacity-50 active:opacity-80 flex items-center gap-x-3 px-4 py-2 text-white rounded"
  >
    <TheSpinner
      v-if="props.isLoading"
      :size="20"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variation?: 'info' | 'danger' | 'success',
  isLoading?: boolean
}>(), {
  variation: 'info',
  isLoading: false
})
</script>
