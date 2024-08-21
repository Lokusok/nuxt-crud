<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-center gap-y-2"
  >
    <div>
      <label class="flex flex-col gap-y-1">
        Name of user:
        <input
          v-model="name"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="John"
        >
      </label>
    </div>

    <div>
      <label class="flex flex-col gap-y-1">
        Email of user:
        <input
          v-model="email"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="john@example.com"
        >
      </label>
    </div>

    <TheButton
      :disabled="isSubmitDisabled"
      type="submit"
    >
      {{ props.submitText }}
    </TheButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  isSubmitButtonDisabled?: boolean,
  submitText?: string,
  defaultName?: string,
  defaultEmail?: string
}>(), {
  isSubmitButtonDisabled: false,
  submitText: 'Submit',
  defaultName: '',
  defaultEmail: ''
})

const emit = defineEmits<{
  submit: [{ name: string, email: string }]
}>()

defineExpose({
  resetForm
})

const name = ref(props.defaultName)
const email = ref(props.defaultEmail)

const isSubmitDisabled = computed(() => {
  return props.isSubmitButtonDisabled || name.value.length === 0 || email.value.length === 0
})

function handleSubmit() {
  emit('submit', {
    name: name.value.trim(),
    email: email.value.trim()
  })
}

function resetForm() {
  name.value = ''
  email.value = ''
}
</script>