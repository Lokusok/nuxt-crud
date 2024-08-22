<template>
  <div class="flex flex-col items-center gap-y-2">
    <span class="text-[20px] font-semibold">Search user</span>
    <form
      class="flex items-center gap-x-3"
      @submit.prevent="handleSubmit"
    >
      <TheInput
        v-model="query"
        placeholder="Enter name or email"
        :disabled="props.isLoading"
      />
      <TheButton
        :disabled="isButtonDisabled"
        :is-loading="props.isLoading"
        class="font-bold"
      >
        Search
      </TheButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import debounce from 'lodash.debounce'

const props = withDefaults(defineProps<{
  isLoading?: boolean
}>(), {
  isLoading: false
})

const model = defineModel<string>()

const emit = defineEmits<{
  submit: [query: string]
}>()

const query = ref(model.value ?? '')

const isButtonDisabled = computed(() => {
  return props.isLoading || query.value.length === 0
})

const debouncedEmitQuery = debounce(updateQuery, 3500)

watch(query, () => {
  if (!query.value.length) {
    updateQuery()
    debouncedEmitQuery.cancel()
  } else {
    debouncedEmitQuery()
  }
})

function updateQuery() {
  emit('submit', query.value)
  model.value = query.value
}

function handleSubmit() {
  updateQuery()
  debouncedEmitQuery.cancel()
}
</script>