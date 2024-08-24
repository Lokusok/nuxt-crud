<template>
  <div>
    <TheButton
      class="flex gap-x-1 items-center"
      @click="() => $router.go(-1)"
    >
      <ArrowLeftIcon />
      Go back
    </TheButton>
  </div>
  
  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <template v-else>
    <template v-if="user && user.data">
      <div class="pt-4 max-w-[540px] mx-auto flex flex-col justify-center items-center gap-y-4">
        <div class="flex flex-col gap-y-4 sm:flex-row gap-x-4 items-center">
          <div>
            <img
              :src="user.data.avatar || 'https://placehold.co/280x160'"
              :alt="user.data.name"
              class="w-[280px] h-[160px] object-cover rounded"
            >
          </div>

          <div class="flex flex-col gap-y-2 text-center sm:text-left">
            <h2 class="text-xl">
              Name: <span class="font-bold">{{ user.data.name }}</span>
            </h2>
            <p class="text-gray-600 text-sm">
              Email: {{ user.data.email }}
            </p>
            <p class="text-gray-600 text-sm">
              Created: {{ formatDate(user.data.createdAt) }}
            </p>
            <p class="text-gray-600 text-sm">
              Last update: {{ formatDate(user.data.updatedAt) }}
            </p>
          </div>
        </div>

        <div class="flex gap-x-3">
          <TheButton @click="toggleEdit">
            {{ mode === 'show' ? 'Edit this user' : 'Stop edit' }}
          </TheButton>
          
          <TheButton
            variation="danger"
            @click="startDelete"
          >
            Delete user
          </TheButton>

          <ConfirmModal
            :is-show="isDeleting"
            :title="`Delete user ${user.data.name}?`"
            body="Are you sure in this action? User not be recovered!"
            cancel-text="Cancel"
            confirm-text="Delete"
            @close="stopDelete"
            @confirm="deleteUser"
          />
        </div>
        
        <KeepAlive>
          <FadeTransition>
            <UserForm
              v-if="mode === 'edit'"
              ref="userFormRef"
              :is-submit-button-disabled="isEditRequestNow"
              :default-name="user.data.name"
              :default-email="user.data.email"
              :default-avatar="user.data.avatar ?? ''"
              @submit="editUser"
            />
          </FadeTransition>
        </KeepAlive>

        <TheAlert
          v-if="displayedMessage.content.length"
          :variation="displayedMessage.variation"
        >
          {{ displayedMessage.content }}
        </TheAlert>
      </div>
    </template>

    <TheAlert
      v-else
      variation="danger"
    >
      Error occured...
    </TheAlert>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter, useFetch, useSeoMeta, createError } from '#app'
import ArrowLeftIcon from '~/assets/icons/arrow-left.svg'
import formatDate from '~/utils/format-date'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue'
import FadeTransition from '~/components/FadeTransition.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'

const router = useRouter()
const route = useRoute()
const { data: user, status, refresh } = useFetch(`/api/users/${route.params.id}`);

watchEffect(() => {
  if (status.value !== 'pending' && !user.value) {
    throw createError({
      status: 404,
      message: 'User not found',
      fatal: true
    })
  }
})

useSeoMeta({
  title: () => {
    if (!user.value?.data) return 'User page'
    else return `User ${user.value.data.name} page`
  }
})

const isEditRequestNow = ref(false)
const isDeleteRequestNow = ref(false)

const mode = ref<'show' | 'edit'>('show')
const message = ref('')
const error = ref('')
const isDeleting = ref(false)

const userFormRef = ref<{ resetForm: () => void } | null>()

const displayedMessage = computed<{ content: string, variation: 'danger' | 'info' }>(() => {
  let variation = 'info'

  if (error.value) variation = 'danger'

  return {
    content: message.value || error.value,
    variation
  } as { content: string, variation: 'danger' | 'info' }
})

watch([message, error], (newValues) => {
  if ([newValues].some(Boolean)) {
    setTimeout(() => message.value = error.value = '', 3000)
  }
})

function toggleEdit() {
  mode.value = mode.value === 'show' ? 'edit' : 'show'
}

async function editUser({ name, email, avatar }: { name: string, email: string, avatar: string | null }) {
  isEditRequestNow.value = true

  try {
    const response = await $fetch<{ status: number }>(`/api/users/${route.params.id}`, {
      method: 'PATCH',
      body: {
        name,
        email,
        avatar
      }
    })

    if (response.status === 200) {
      message.value = 'User successfully updated!'
      refresh()
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = 'Error occured'
    }
  } finally {
    isEditRequestNow.value = false
    mode.value = 'show'
  }

}

function startDelete() {
  isDeleting.value = true
}

function stopDelete() {
  isDeleting.value = false
}

async function deleteUser() {
  isDeleteRequestNow.value = true

  try {
    const response = await $fetch<{ status: number }>(`/api/users/${route.params.id}`, {
      method: 'DELETE'
    })

    if (response.status === 200) {
      router.go(-1)
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = 'Error occured'
      stopDelete()
    }
  }

  isDeleteRequestNow.value = false
}
</script>
