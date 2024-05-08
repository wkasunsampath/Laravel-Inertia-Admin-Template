import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const loggedUser = ref<{ name: string; email: string }>()

  const login = (user: { name: string; email: string }) => {
    isLoggedIn.value = true
    loggedUser.value = user
  }

  const logout = () => {
    isLoggedIn.value = false
    loggedUser.value = undefined
  }

  return { isLoggedIn, loggedUser, login, logout }
})
