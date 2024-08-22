<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <template v-else>
    <TheAlert
      v-if="users.status !== 200"
      variation="danger"
    >
      Error!
    </TheAlert>

    <template v-else>
      <div class="flex justify-center mb-[20px]">
        <h2 class="text-center text-[30px] font-bold">
          List of users
        </h2>
      </div>

      <div
        v-if="users.data.length"
        class="flex flex-col mx-auto gap-y-3 px-3 max-w-[420px]"
      >
        <NuxtLink
          v-for="user in users.data"
          :key="user.id"
          :to="`/users/${user.id}`"
          class="hover:opacity-70 active:opacity-50 bg-white border-[2px] border-slate-700 rounded px-4 py-4 flex justify-between items-end"
        >
          <div class="flex flex-col gap-y-2">
            <span class="text-xl">{{ user.name }}</span>
            <span class="text-gray-300 text-sm">{{ user.email }}</span>
          </div>

          <div class="text-gray-500 text-[13px]">
            {{ formatDate(user.createdAt) }}
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center flex flex-col gap-y-4">
        <p class="text-[20px] text-gray-500">...&nbsp;Users empty&nbsp;...</p>

        <div class="flex justify-center">
          <TheButton :to="{ name: 'create-user' }">
            <span class="flex gap-x-2 font-bold">
              <UserPlusIcon class="text-[20px]" />
              Create here
            </span>
          </TheButton>
        </div>
      </div>

      <div class="flex justify-center pt-[20px]">
        <ThePagination
          :current-page="currentPage"
          :max-page="users.max_page"
          @change="handlePaginationChange"
        />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useFetch, useRoute, useRouter, useSeoMeta } from '#app'
import ThePagination from '~/components/ThePagination.vue'
import formatDate from '~/utils/format-date'

import UserPlusIcon from '~/assets/icons/user-plus.svg'

useSeoMeta({
  title: 'List of users'
})

const router = useRouter()
const route = useRoute()
const currentPage = ref(Number(route.query.page ?? 1))

const { data: users, status } = useFetch(() => `/api/users?page=${currentPage.value}`, {
  watch: [currentPage]
})

watchEffect(() => {
  if (status.value !== 'pending' && users.value?.data?.length === 0) {
    currentPage.value = 1
    return router.replace({ path: '/users', query: {} })
  }

  router.push({ path: '/users', query: { page: currentPage.value } })
})

function handlePaginationChange(page: number) {
  currentPage.value = page
}
</script>