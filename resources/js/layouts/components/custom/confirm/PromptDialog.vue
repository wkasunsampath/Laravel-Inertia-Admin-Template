<template>
  <CModal
    :visible="showModal"
    @close="
      () => {
        emits('close')
        showModal = false
      }
    "
    aria-labelledby="ToggleBetweenModalsExample1"
    backdrop="static"
  >
    <CModalHeader>
      <CModalTitle id="ToggleBetweenModalsExample1">Confirmation</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <p>{{ props.message ?? 'Do you want to save this data? This action cannot be undone.' }}</p>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            emits('close')
            showModal = false
          }
        "
      >
        Cancel
      </CButton>
      <CButton
        color="primary"
        @click="
          () => {
            emits('confirm')
            showModal = false
          }
        "
      >
        Yes, I do
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup lang="ts">
import { CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton } from '@coreui/vue'
import { onMounted, ref } from 'vue'

const showModal = ref(false)
const props = defineProps(['message'])
const emits = defineEmits(['close', 'confirm'])

onMounted(() => setTimeout(() => (showModal.value = true), 50))
</script>
