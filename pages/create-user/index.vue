<template>
  <UserForm
    @submit="createUser"
    :is-submit-button-disabled="isSubmitButtonDisabled"
    ref="userFormRef"
    submit-text="Create new user"
  />

  <FadeTransition>
    <TheAlert v-if="message.length">
      {{ message }}
    </TheAlert>
  </FadeTransition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSeoMeta } from '#app'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue';
import FadeTransition from '~/components/FadeTransition.vue';

useSeoMeta({
  title: 'Create user'
})

const isCreating = ref(false)

const message = ref('')
const userFormRef = ref<{ resetForm: () => void } | null>(null);

const isSubmitButtonDisabled = computed(() => {
  return isCreating.value
})

watch(message, (newValue) => {
  if (newValue) {
    setTimeout(() => message.value = '', 3000)
  }
})

async function createUser({ name, email }: { name: string, email: string }) {
  isCreating.value = true

  const response = await $fetch<{ status: number }>('/api/users', {
    method: 'POST',
    body: {
      name,
      email
    }
  })

  if (response.status === 201) {
    message.value = 'User successfully created!'
  } else {
    message.value = 'Error occured'
  }

  setTimeout(() => message.value = '', 3000);

  isCreating.value = false

  userFormRef.value!.resetForm()
}
</script>