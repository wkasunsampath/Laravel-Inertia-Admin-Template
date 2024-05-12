import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usePage } from '@inertiajs/vue3'

export const useAuthStore = defineStore('auth', () => {
  const page = usePage()
  const loggedUser = computed(() => page.props.auth.user)
  const isLoggedIn = computed(() => !!loggedUser.value)

  return { isLoggedIn, loggedUser }
})
