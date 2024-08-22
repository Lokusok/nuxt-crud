<template>
  <UserForm
    ref="userFormRef"
    :is-submit-button-disabled="isSubmitButtonDisabled"
    submit-text="Create new user"
    @submit="createUser"
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
        Visit page
      </NuxtLink>
    </TheAlert>
  </FadeTransition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSeoMeta } from '#app'

import type { User } from '@prisma/client'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue'
import FadeTransition from '~/components/FadeTransition.vue'

useSeoMeta({
  title: 'Create user'
})

const isCreating = ref(false)
const prevCreatedUser = ref<User | null>(null)

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

async function createUser({ name, email, avatar }: { name: string, email: string, avatar: string | null }) {
  isCreating.value = true

  try {
    const response = await $fetch<{ status: number, data: User }>('/api/users', {
      method: 'POST',
      body: {
        name,
        email,
        avatar
      }
    })
  
    prevCreatedUser.value = response.data
  
    if (response.status === 201) {
      message.value = 'User successfully created!'
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = 'Error occured'
    }
  } finally {
    isCreating.value = false
    userFormRef.value!.resetForm()
  }
}
</script>