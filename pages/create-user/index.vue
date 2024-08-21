<template>
  <UserForm
    @submit="createUser"
    :is-submit-button-disabled="isSubmitButtonDisabled"
    ref="userFormRef"
    submit-text="Create new user"
  />

  <FadeTransition>
    <TheAlert
      v-if="displayedMessage.content"
      :variation="displayedMessage.variation"
    >
      <p>{{ displayedMessage.content }}</p>
      <NuxtLink
        v-if="prevCreatedUser"
        :to="`/users/${prevCreatedUser.id}`"
        class="text-blue-800 underline hover:text-blue-500 active:text-blue-300"
      >
        Visit him
      </NuxtLink>
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
const prevCreatedUser = ref<object | null>(null)

const message = ref('')
const error = ref('')
const userFormRef = ref<{ resetForm: () => void } | null>(null)

const displayedMessage = computed<{ content: string, variation: 'danger' | 'info' }>(() => {
  let variation = 'info'

  if (error.value) variation = 'danger'

  return {
    content: message.value || error.value,
    variation
  } as { content: string, variation: 'danger' | 'info' }
})

const isSubmitButtonDisabled = computed(() => {
  return isCreating.value
})

watch([message, error], (newValues) => {
  if ([newValues].some(Boolean)) {
    setTimeout(() => message.value = error.value = '', 3000)
  }
})

async function createUser({ name, email }: { name: string, email: string }) {
  isCreating.value = true

  try {
    const response = await $fetch<{ status: number, data: object }>('/api/users', {
      method: 'POST',
      body: {
        name,
        email
      }
    })
  
    prevCreatedUser.value = response.data
  
    if (response.status === 201) {
      message.value = 'User successfully created!'
    }
  } catch (e) {
    console.log('here')
    error.value = 'Error occured'
  } finally {
    isCreating.value = false
    userFormRef.value!.resetForm()
  }
}
</script>