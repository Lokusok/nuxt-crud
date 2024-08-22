<template>
  <div class="bg-slate-100 min-h-screen flex flex-col">
    <header class="bg-slate-800">
      <div class="relative container mx-auto px-4 py-6">
        <div class="absolute left-4 top-[50%] -translate-y-[50%]">
          <NuxtLink class="hover:opacity-50" to="/">
            <img src="~assets/logo.png" width="50" height="50" />
          </NuxtLink>
        </div>

        <nav>
          <AuthState v-slot="{ loggedIn }">
            <ul class="flex gap-x-5 justify-center">
              <li>
                <NuxtLink
                  to="/"
                  activeClass="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/users"
                  :class="{
                    'text-gray-400 pointer-events-none': !loggedIn
                  }"
                  activeClass="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  Users
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="{ name: 'create-user' }"
                  :class="{
                    'text-gray-400 pointer-events-none': !loggedIn
                  }"
                  activeClass="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  Create user
                </NuxtLink>
              </li>
            </ul>
          </AuthState>
        </nav>

        <div
          class="absolute right-4 top-[50%] -translate-y-[50%] text-white flex gap-x-3 items-center"
        >
          <template v-if="!userSession.loggedIn.value">
            <NuxtLink
              to="/login"
              activeClass="underline"
              class="text-white text-[20px] hover:opacity-70"
            >
              Login
            </NuxtLink>

            /

            <NuxtLink
              to="/register"
              activeClass="underline"
              class="text-white text-[20px] hover:opacity-70"
            >
              Register
            </NuxtLink>
          </template>

          <TheButton
            v-else
            variation="danger"  
            class="flex items-center gap-x-2"
            @click="logout"
          >
            <LogoutIcon />
            Logout
          </TheButton>
        </div>
      </div>
    </header>

    <div class="grow">
      <div class="container mx-auto py-3 px-3 my-3">
        <slot />
      </div>
    </div>

    <footer class="bg-slate-800 py-4">
      <div class="container mx-auto text-center">
        <span class="text-white text-sm">
          &copy; Lokusok Nuxt CRUD
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useUserSession } from '#imports';
import TheButton from '~/components/TheButton.vue';
import LogoutIcon from '~/assets/logout.svg'

const userSession = useUserSession()

function logout() {
  userSession.clear()
}
</script>