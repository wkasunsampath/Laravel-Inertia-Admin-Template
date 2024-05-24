<script setup lang="ts">
import UserLayout from './UserLayout.vue'
import GuestLayout from './GuestLayout.vue'
import AppToast from './components/AppToast.vue'
import { useAuthStore } from '../stores/auth'
import { onBeforeMount } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useThemeStore } from '@/stores/theme'
import { usePage } from '@inertiajs/vue3'
import { computed, watch } from 'vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const auth = useAuthStore()
const { isColorModeSet, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
const currentTheme = useThemeStore()
const page = usePage()

const flashMessages = computed(() => page.props.flash as { message?: string; error?: string; warning?: string })

watch(flashMessages, () => {
  if (flashMessages.value.message) {
    toast.setToast(flashMessages.value.message, 'success')
  }
  if (flashMessages.value.error) {
    toast.setToast(flashMessages.value.error, 'error')
  }
  if (flashMessages.value.warning) {
    toast.setToast(flashMessages.value.warning, 'warning')
  }
})

onBeforeMount(() => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  let theme = urlParams.get('theme')

  if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
    theme = theme.match(/^[A-Za-z0-9\s]+/)![0]
  }

  if (theme) {
    setColorMode(theme)
    return
  }

  if (isColorModeSet()) {
    return
  }

  setColorMode(currentTheme.theme)
})
</script>

<template>
  <AppToast />
  <div id="prompt"></div>
  <component :is="auth.isLoggedIn ? UserLayout : GuestLayout">
    <slot />
  </component>
</template>
