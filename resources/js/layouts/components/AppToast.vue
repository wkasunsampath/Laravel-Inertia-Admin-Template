<template>
  <CToaster placement="top-end" class="p-4">
    <CToast
      :autohide="false"
      visible
      v-for="(t, id) of toast.toasts"
      :key="id"
      :color="getColor(t.type)"
      :class="[t.type === 'warning' ? 'text-dark' : 'text-white', 'align-items-center']"
    >
      <div class="d-flex">
        <CToastBody>{{ t.text }}</CToastBody>
        <CToastClose class="me-2 m-auto" :white="t.type !== 'warning'" />
      </div>
    </CToast>
  </CToaster>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

const getColor = (type: string) => {
  switch (type) {
    case 'error':
      return 'danger'
    case 'warning':
      return 'warning'
    default:
      return 'success'
  }
}
</script>

<style scoped></style>
