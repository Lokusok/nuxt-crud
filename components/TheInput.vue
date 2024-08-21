<template>
  <input
    v-model="model"
    class="px-2 py-1 rounded border-2 border-blue-800"
  >
</template>

<script setup lang="ts">
const model = defineModel()
</script>