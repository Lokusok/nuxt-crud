<template>
  <form
    class="flex flex-col items-center gap-y-2"
    @submit.prevent="handleSubmit"
  >
    <div>
      <label class="flex flex-col gap-y-1">
        {{ $t('components.userForm.name.label') }}:
        <TheInput
          v-model="name"
          v-bind="nameAttrs"
          :placeholder="$t('components.userForm.name.placeholder')"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
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
        {{ $t('components.userForm.email.label') }}:
        <TheInput
          v-model="email"
          v-bind="emailAttrs"
          :placeholder="$t('components.userForm.email.placeholder')"
          class="px-2 py-1 rounded border-2 border-blue-800"
          type="text"
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
        {{ $t('components.userForm.avatar.label') }}:
        <FileInput
          v-model="avatar"
          :text="$t('components.userForm.avatar.text')"
          class="w-[235px]"
        />
      </label>
    </div>

    <TheButton
      :disabled="isSubmitDisabled"
      type="submit"
      class="font-bold"
    >
      {{ props.submitText }}
    </TheButton>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '#imports'
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

const { t } = useI18n()

const emit = defineEmits<{
  submit: [{ name: string, email: string, avatar: string | null }]
}>()

defineExpose({
  resetForm
})

const formSchema = yup.object({
  name: yup.string().required(t('components.userForm.name.errors.required')).min(2, t('components.userForm.name.errors.minLength')),
  email: yup.string().required(t('components.userForm.email.errors.required')).email(t('components.userForm.email.errors.notEmail'))
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