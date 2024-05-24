import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<{ text: string; type: 'error' | 'warning' | 'success'; id: number }[]>([])

  const setToast = (text: string, type: 'error' | 'warning' | 'success' = 'success', timeoutInSeconds: number = 4) => {
    const id = Math.random()
    toasts.value.push({ text, type, id })

    setTimeout(() => {
      toasts.value = toasts.value.filter((el) => el.id !== id)
    }, timeoutInSeconds * 1000)
  }

  return { toasts, setToast }
})
