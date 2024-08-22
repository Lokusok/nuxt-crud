<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-center gap-y-2"
  >
    <div>
      <label class="flex flex-col gap-y-1">
        Name of user:
        <TheInput
          v-model="name"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="John"
        />
      </label>
    </div>

    <div>
      <label class="flex flex-col gap-y-1">
        Email of user:
        <TheInput
          v-model="email"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="john@example.com"
        />
      </label>
    </div>

    <div>
      <label class="flex flex-col gap-y-1">
        Avatar of user:
        <FileInput
          v-model="avatar"
          class="w-[235px]"
        />
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
import TheInput from './TheInput.vue';
import FileInput from './FileInput.vue';

const props = withDefaults(defineProps<{
  isSubmitButtonDisabled?: boolean,
  submitText?: string,
  defaultName?: string,
  defaultEmail?: string,
  defaultAvatar?: string
}>(), {
  isSubmitButtonDisabled: false,
  submitText: 'Submit',
  defaultName: '',
  defaultEmail: '',
  defaultAvatar: ''
})

const emit = defineEmits<{
  submit: [{ name: string, email: string, avatar: string | null }]
}>()

defineExpose({
  resetForm
})

const name = ref(props.defaultName)
const email = ref(props.defaultEmail)
const avatar = ref(props.defaultAvatar) 

const isSubmitDisabled = computed(() => {
  const isEmpty = name.value.length === 0 || email.value.length === 0
  const isOuterDisabled = props.isSubmitButtonDisabled
  const isEqualsAsDefault = (
    name.value.trim() === props.defaultName && 
    email.value.trim() === props.defaultEmail &&
    avatar.value.trim() === props.defaultAvatar
  )

  return isEmpty || isOuterDisabled || isEqualsAsDefault
})

function handleSubmit() {
  emit('submit', {
    name: name.value.trim(),
    email: email.value.trim(),
    avatar: avatar.value
  })
}

function resetForm() {
  name.value = ''
  email.value = ''
  avatar.value = ''
}
</script>