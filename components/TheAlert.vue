<template>
  <div
  :class="{
    'border-red-500': props.variation === 'danger',
    'border-green-500': props.variation === 'success',
    'border-blue-800': props.variation === 'info'
    }"
    class="max-w-[300px] text-center mx-auto my-4 text-lg border-2 rounded p-4"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variation: 'info' | 'danger' | 'success'
}>(), {
  variation: 'info'
})
</script>
