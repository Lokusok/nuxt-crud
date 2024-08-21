<template>
  <div class="container mx-auto px-3 my-3">
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
        <TheButton @click="toggleEdit">
          {{ mode === 'show' ? 'Edit this user' : 'Stop edit' }}
        </TheButton>
        
        <KeepAlive>
          <UserForm
            v-if="mode === 'edit'"
            :isSubmitButtonDisabled="isEditRequestNow"
            :defaultName="user.name"
            :defaultEmail="user.email"
            ref="userFormRef"
            @submit="editUser"
          />
        </KeepAlive>

        <TheAlert v-if="message.length">
          {{ message }}
        </TheAlert>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useFetch, useSeoMeta, useHead } from '#app'

import UserForm from '~/components/UserForm.vue'
import TheAlert from '~/components/TheAlert.vue';

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
</script>