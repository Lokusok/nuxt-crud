<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <template v-else>
    <div>
      <TheButton @click="$router.go(-1)">
        Go back
      </TheButton>
    </div>
  
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
                <h2 class="text-[20px] font-bold">Delete user {{ user.data.name }}?</h2>
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
                >Cancel</TheButton>
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
        v-if="message.length"
        variation="danger"
      >
        {{ message }}
      </TheAlert>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, useFetch, useSeoMeta } from '#app'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue';
import TheModal from '~/components/TheModal.vue';
import FadeTransition from '~/components/FadeTransition.vue';

const router = useRouter()
const route = useRoute()
const { data: user, status } = useFetch(`/api/users/${route.params.id}`);

useSeoMeta({
  title: () => {
    if (!user.value) return 'User page'
    else return `User ${user.value.data.name} page`
  }
})

const isEditRequestNow = ref(false)
const isDeleteRequestNow = ref(false)

const mode = ref<'show' | 'edit'>('show')
const message = ref('')
const isDeleting = ref(false)

const userFormRef = ref<{ resetForm: () => void } | null>()

watch(message, (newValue) => {
  if (newValue) {
    setTimeout(() => message.value = '', 3000)
  }
})

function toggleEdit() {
  mode.value = mode.value === 'show' ? 'edit' : 'show'
}

async function editUser({ name, email }: { name: string, email: string }) {
  isEditRequestNow.value = true

  const response = await $fetch<{ status: number }>(`/api/users/${route.params.id}`, {
    method: 'PATCH',
    body: {
      name,
      email
    }
  })

  if (response.status === 200) {
    message.value = 'User successfully updated!'
  } else {
    message.value = 'Error occured'
  }

  isEditRequestNow.value = false

  mode.value = 'show'
}

function startDelete() {
  isDeleting.value = true
}

function stopDelete() {
  isDeleting.value = false
}

async function deleteUser() {
  isDeleteRequestNow.value = true

  const response = await $fetch<{ status: number }>(`/api/users/${route.params.id}`, {
    method: 'DELETE'
  })

  if (response.status === 200) {
    router.replace('/')
  } else {
    message.value = 'Error occured'
    stopDelete()
  }

  isDeleteRequestNow.value = false
}
</script>
