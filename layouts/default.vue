<template>
  <div class="bg-slate-100 min-h-screen flex flex-col">
    <header class="bg-slate-800">
      <div class="relative container mx-auto px-4 py-6">
        <div class="absolute left-4 top-[50%] -translate-y-[50%]">
          <NuxtLink class="hover:opacity-50" to="/">
            <img src="~assets/logo.png" width="50" height="50" >
          </NuxtLink>
        </div>

        <nav>
          <AuthState v-slot="{ loggedIn }">
            <ul class="flex gap-x-5 justify-center">
              <li>
                <NuxtLink
                  to="/"
                  active-class="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  {{ $t('nav.indexLink') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/users"
                  :class="{
                    '!text-gray-400 pointer-events-none': !loggedIn
                  }"
                  active-class="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  {{ $t('nav.usersLink') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  :to="{ name: 'create-user' }"
                  :class="{
                    '!text-gray-400 pointer-events-none': !loggedIn
                  }"
                  active-class="underline"
                  class="text-white text-[20px] hover:opacity-70"
                >
                  {{ $t('nav.createUserLink') }}
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
              active-class="underline"
              class="text-white text-[20px] hover:opacity-70"
            >
              {{ $t('nav.loginLink') }}
            </NuxtLink>

            /

            <NuxtLink
              to="/register"
              active-class="underline"
              class="text-white text-[20px] hover:opacity-70"
            >
              {{ $t('nav.registerLink') }}
            </NuxtLink>
          </template>

          <div v-else class="flex flex-col items-center">
            <NuxtLink
              to="/admin"
              active-class="underline pointer-events-none opacity-60"
              class="text-center text-white hover:opacity-90 hover:underline active:opacity-50"
            >
              {{ userSession.user.value?.name }}
            </NuxtLink>

            <TheButton
              variation="danger"  
              class="flex items-center gap-x-2"
              @click="startLogout"
            >
              <LogoutIcon />
              {{ $t('nav.logoutButton') }}
            </TheButton>

            <ConfirmModal
              :is-show="isLogoutNow"
              title="Logout?"
              body="Are you sure in this action?"
              cancel-text="Cancel"
              confirm-text="Confirm"
              @close="stopLogout"
              @confirm="logout"
            />
          </div>
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
import { ref } from 'vue'
import { useUserSession, useRouter } from '#imports';
import TheButton from '~/components/TheButton.vue';
import LogoutIcon from '~/assets/icons/logout.svg'
import ConfirmModal from '~/components/ConfirmModal.vue';

const userSession = useUserSession()
const router = useRouter()

const isLogoutNow = ref(false)

async function logout() {
  await userSession.clear()
  router.push('/login')
}

function startLogout() {
  isLogoutNow.value = true
}

function stopLogout() {
  isLogoutNow.value = false
}
</script>