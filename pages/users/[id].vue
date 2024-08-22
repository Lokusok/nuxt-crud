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
    <template v-if="user.data">
      <div class="max-w-[400px] mx-auto flex flex-col justify-center items-center gap-y-2">
        <h2 class="text-xl font-bold">{{ user.data.name }}</h2>
        <p class="text-gray-600 text-sm">{{ user.data.email }}</p>
        <div class="flex gap-x-3">
          <TheButton @click="toggleEdit">
            {{ mode === 'show' ? 'Edit this user' : 'Stop edit' }}
          </TheButton>
          
          <TheButton
            @click="startDelete"
            variation="danger"
          >
            Delete user
          </TheButton>

          <Teleport to="#teleports">
            <FadeTransition>
              <TheModal
                v-if="isDeleting"
                @close="stopDelete"
              >
                <div class="pb-1 border-b-2 border-blue-800">
                  <h2 class="text-[20px] font-bold text-center">Delete user {{ user.data.name }}?</h2>
                </div>

                <div class="my-3">
                  <p class="text-center max-w-[300px]">
                    Are you sure in this action? <br> User not be recovered!
                  </p>
                </div>

                <div class="pt-4 border-t-2 border-blue-800 flex justify-end gap-x-3">
                  <TheButton
                    @click="stopDelete"
                    :disabled="isDeleteRequestNow"
                  >
                    Cancel
                  </TheButton>
                  <TheButton
                    @click="deleteUser"
                    :disabled="isDeleteRequestNow"
                    variation="danger"
                  >
                    Delete
                  </TheButton>
                </div>
              </TheModal>
            </FadeTransition>
          </Teleport>
        </div>
        
        <KeepAlive>
          <FadeTransition>
            <UserForm
              v-if="mode === 'edit'"
              :is-submit-button-disabled="isEditRequestNow"
              :default-name="user.data.name"
              :default-email="user.data.email"
              ref="userFormRef"
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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, useFetch, useSeoMeta } from '#app'
import ArrowLeftIcon from '~/assets/icons/arrow-left.svg'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue';
import TheModal from '~/components/TheModal.vue';
import FadeTransition from '~/components/FadeTransition.vue';

const router = useRouter()
const route = useRoute()
const { data: user, status, refresh } = useFetch(`/api/users/${route.params.id}`);

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

async function editUser({ name, email }: { name: string, email: string }) {
  isEditRequestNow.value = true

  try {
    const response = await $fetch<{ status: number }>(`/api/users/${route.params.id}`, {
      method: 'PATCH',
      body: {
        name,
        email
      }
    })

    if (response.status === 200) {
      message.value = 'User successfully updated!'
      refresh()
    }
  } catch (e) {
    error.value = 'Error occured'
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
    error.value = 'Error occured'
    stopDelete()
  }

  isDeleteRequestNow.value = false
}
</script>
