<template>
  <div
    class="z-[100] overflow-y-auto fixed left-0 top-0 w-[100%] h-[100%] bg-black/50 flex py-2"
    @click.self="$emit('close')"
  >
    <div class="max-w-[700px] relative bg-white px-8 py-8 rounded shadow-xl m-auto">
      <button
        @click="$emit('close')"
        class="absolute right-[5px] top-[5px] p-[10px] hover:opacity-80 active:opacity-50"
      >
        X
      </button>

      <div class="overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>