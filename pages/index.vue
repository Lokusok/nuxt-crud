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

      <div class="flex flex-col mx-auto gap-y-3 px-3 max-w-[420px]">
        <NuxtLink
          v-for="user in users.data"
          :key="user.id"
          :to="`/users/${user.id}`"
          class="hover:opacity-70 active:opacity-50 bg-white border-[2px] border-slate-700 rounded px-4 py-4 flex flex-col gap-y-2"
        >
          <span class="text-xl">{{ user.name }}</span>
          <span class="text-gray-300 text-sm">{{ user.email }}</span>
        </NuxtLink>
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
import { useFetch, useRoute, useRouter, useSeoMeta, useState } from '#app';
import ThePagination from '~/components/ThePagination.vue';

const router = useRouter()
const route = useRoute()
const currentPage = useState('current-page', () => Number(route.query.page))

useSeoMeta({
  title: 'List of users'
})

const { data: users, status } = useFetch(`/api/users?page=${currentPage.value}`, {
  watch: [currentPage],
  onResponse: () => {
    router.push({ query: { page: currentPage.value } })
  }
})

function handlePaginationChange(page: number) {
  console.log({ page })
  currentPage.value = page
}
</script>