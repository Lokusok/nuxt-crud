<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h2 class="text-red-500 text-[24px] font-bold">Error</h2>
    <div class="mt-2">Status: {{ props.error!.statusCode }}</div>
    <div class="my-2 text-sm text-gray-700">
      {{ props.error!.message }}
    </div>

    <div class="flex items-center gap-x-3">
      <TheButton
        class="font-bold"
        variation="success"
        to="/"
      >
        Go home
      </TheButton>

      <TheButton
        class="font-bold"
        @click="resetError"
      >
        Reset this error
      </TheButton>
    </div>
  </div>

  {{ error }}
</template>

<script setup lang="ts">
import { clearError, type NuxtError } from '#app'
import TheButton from './components/TheButton.vue';

const props = defineProps({
  error: Object as () => NuxtError
})

function resetError() {
  clearError({ redirect: '/' })
}
</script>