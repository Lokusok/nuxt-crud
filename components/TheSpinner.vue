<template>
  <div class="spinner"/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: string | number
  }>(),
  {
    size: '3em'
  }
)

const bindedSize = computed(() => {
  if (typeof props.size === 'string') return props.size
  return props.size + 'px'
})
</script>

<style scoped>
.spinner {
  border: 3px solid hsla(185, 100%, 62%, 0.2);
  border-top-color: #3cefff;
  border-radius: 50%;
  width: v-bind(bindedSize);
  height: v-bind(bindedSize);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>