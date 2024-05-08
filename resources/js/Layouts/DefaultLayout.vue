<script setup>
import UserLayout from './UserLayout.vue'
import GuestLayout from './GuestLayout.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>

<template>
  <component :is="auth.isLoggedIn ? UserLayout : GuestLayout">
    <slot />
  </component>
</template>
