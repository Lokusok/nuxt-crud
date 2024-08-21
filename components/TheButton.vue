<template>
  <button
    :class="{
      'bg-red-800 hover:bg-red-500': props.type === 'danger',
      'bg-green-800 hover:bg-green-500': props.type === 'success'
    }"
    class="disabled:pointer-events-none disabled:opacity-50 bg-blue-800 hover:bg-blue-500 active:opacity-80 px-4 py-2 text-white rounded"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'default' | 'danger' | 'success'
}>(), {
  type: 'default'
})
</script>
