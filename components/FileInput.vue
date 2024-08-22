<template>
  <div
    v-bind="$attrs"
    class="relative h-[30px] bg-blue-800 rounded shadow-md cursor-pointer hover:bg-blue-700 hover:opacity-70"
  >
    <div class="flex gap-x-3 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <span class="text-white font-semibold">Upload file</span>
    </div>
  </div>

  <div
    v-if="imageUrl"
    class="flex justify-center"
  >
    <img
      :src="imageUrl"
      class="w-[200px] h-[150px] aspect-square object-cover"
    >
  </div>

  <input
    class="sr-only"
    type="file"
    accept="image/*"
    @change="handleUploadFile"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const imageUrl = ref('')
const fileAvatar = defineModel<File | null>()

function handleUploadFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.item(0)

  if (!file) return

  fileAvatar.value = file
  imageUrl.value = URL.createObjectURL(file)
}

watchEffect(() => {
  if (fileAvatar.value === null) {
    imageUrl.value = ''
  }
})
</script>