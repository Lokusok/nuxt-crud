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
    v-if="base64Avatar"
    class="flex justify-center"
  >
    <img
      :src="base64Avatar"
      class="w-[200px] h-[150px] aspect-square object-cover"
    >
  </div>

  <input
    class="sr-only"
    type="file"
    accept="image/*"
    @change="handleUploadFile"
  >
</template>

<script setup lang="ts">
const base64Avatar = defineModel<string>()

function handleUploadFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.item(0)

  if (!file) return

  const fileReader = new FileReader()

  fileReader.onloadend = () => {
    base64Avatar.value = fileReader.result?.toString()
  }

  fileReader.readAsDataURL(file)
}
</script>