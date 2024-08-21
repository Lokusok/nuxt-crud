<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h2 class="text-red-500 text-[24px] font-bold">Error</h2>
    <div class="my-2">Status: {{ error.statusCode }}</div>
    <button
      @click="resetError"
      class="bg-blue-800 hover:bg-blue-500 px-4 py-2 text-white rounded"
    >
      Reset this error
    </button>
  </div>
</template>

<script setup lang="ts">
import { clearError, type NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

function resetError() {
  clearError({ redirect: '/' })
}
</script>