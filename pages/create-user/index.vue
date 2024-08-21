<template>
  <UserForm
    @submit="createUser"
    :isSubmitButtonDisabled="isSubmitButtonDisabled"
    ref="userFormRef"
    submitText="Create new user"
  />

  <TheAlert v-if="message.length">
    {{ message }}
  </TheAlert>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSeoMeta } from '#app'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue';

useSeoMeta({
  title: 'Create user'
})

const isCreating = ref(false)

const message = ref('')
const userFormRef = ref<{ resetForm: () => void } | null>(null);

const isSubmitButtonDisabled = computed(() => {
  return isCreating.value
})

async function createUser({ name, email }: { name: string, email: string }) {
  isCreating.value = true

  const response = await $fetch<{ id: number }>('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: {
      name,
      email
    }
  })

  if (response.id) {
    message.value = 'User successfully created!'
  } else {
    message.value = 'Error occured'
  }

  setTimeout(() => message.value = '', 3000);

  isCreating.value = false

  userFormRef.value!.resetForm()
}
</script>