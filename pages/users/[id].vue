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
      <h2 class="text-xl font-bold">{{ user.name }}</h2>
      <p class="text-gray-600 text-sm">{{ user.email }}</p>
      <div class="flex gap-x-3">
        <TheButton @click="toggleEdit">
          {{ mode === 'show' ? 'Edit this user' : 'Stop edit' }}
        </TheButton>
        
        <TheButton
          @click="startDelete"
          type="danger"
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
                <h2 class="text-[20px] font-bold">Delete user Leane Grahham?</h2>
              </div>

              <div class="my-3">
                <p class="text-center max-w-[300px]">
                  Are you sure in this action? <br> User not be recovered!
                </p>
              </div>

              <div class="pt-4 border-t-2 border-blue-800 flex justify-end gap-x-3">
                <TheButton @click="stopDelete">Cancel</TheButton>
                <TheButton
                  @click="deleteUser"
                  type="danger"
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
            :isSubmitButtonDisabled="isEditRequestNow"
            :defaultName="user.name"
            :defaultEmail="user.email"
            ref="userFormRef"
            @submit="editUser"
          />
        </FadeTransition>
      </KeepAlive>

      <TheAlert v-if="message.length">
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
const { data: user, status } = useFetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}`);

useSeoMeta({
  title: () => {
    if (!user.value) return 'User page'
    else return `User ${user.value.name} page`
  }
})

const isEditRequestNow = ref(false)
const mode = ref<'show' | 'edit'>('show')
const message = ref('')
const isDeleting = ref(false)

const userFormRef = ref<{ resetForm: () => void } | null>()

function toggleEdit() {
  mode.value = mode.value === 'show' ? 'edit' : 'show'
}

async function editUser({ name, email }: { name: string, email: string }) {
  isEditRequestNow.value = true

  const response = await $fetch<{ id: number }>(`https://jsonplaceholder.typicode.com/users/${route.params.id}`, {
    method: 'PATCH',
    body: {
      name,
      email
    }
  })

  if (response.id) {
    message.value = 'User successfully updated!'
  } else {
    message.value = 'Error occured'
  }

  setTimeout(() => message.value = '', 3000)

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
  const response = await $fetch(`https://jsonplaceholder.typicode.com/users/${route.params.id}`, {
    method: 'DELETE'
  })

  if (response) {
    router.replace('/')
  }

  console.log(response)
}
</script>
