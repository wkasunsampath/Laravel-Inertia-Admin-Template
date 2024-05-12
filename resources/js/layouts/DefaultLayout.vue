<script setup lang="ts">
import UserLayout from './UserLayout.vue'
import GuestLayout from './GuestLayout.vue'
import { useAuthStore } from '../stores/auth'
import { onBeforeMount } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useThemeStore } from '@/stores/theme'

const auth = useAuthStore()
const { isColorModeSet, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
const currentTheme = useThemeStore()

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
  <component :is="auth.isLoggedIn ? UserLayout : GuestLayout">
    <slot />
  </component>
</template>
