<template>
  <form
    class="flex flex-col items-center gap-y-2"
    @submit.prevent="handleSubmit"
  >
    <div>
      <label class="flex flex-col gap-y-1">
        Name of user:
        <TheInput
          v-model="name"
          v-bind="nameAttrs"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="John"
        />

        <span
          v-show="errors.name"
          class="text-red-500"
        >
          {{ errors.name }}
        </span>
      </label>
    </div>

    <div>
      <label class="flex flex-col gap-y-1">
        Email of user:
        <TheInput
          v-model="email"
          v-bind="emailAttrs"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
          placeholder="john@example.com"
        />
      </label>

      <span
        v-show="errors.email"
        class="text-red-500"
      >
        {{ errors.email }}
      </span>
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
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'

import * as yup from 'yup'

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

const formSchema = yup.object({
  name: yup.string().required('Required field!').min(2, '2 letters minimum!'),
  email: yup.string().required('Required field!').email('Must be email!')
})

const { defineField, errors, isFieldValid } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.defaultName,
    email: props.defaultEmail,
  }
})

const isFormValid = computed(() => {
  const fields = ['name', 'email']
  let isValid = true
  
  for (const field of fields) {
    if (!isFieldValid(field as 'name' | 'email')) {
      isValid = false
    }
  }

  return isValid
})

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
  validateOnBlur: true
})
const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
  validateOnBlur: true
})

const avatar = ref(props.defaultAvatar) 

const isSubmitDisabled = computed(() => {
  const isEmpty = name.value.length === 0 || email.value.length === 0
  const isOuterDisabled = props.isSubmitButtonDisabled
  const isEqualsAsDefault = (
    name.value.trim() === props.defaultName && 
    email.value.trim() === props.defaultEmail &&
    avatar.value.trim() === props.defaultAvatar
  )

  return !isFormValid.value || isEmpty || isOuterDisabled || isEqualsAsDefault
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