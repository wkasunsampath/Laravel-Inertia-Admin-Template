<template>
  <Head title="Register" />
  <div class="bwrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm @submit.prevent="submit" novalidate :validated="validationResponse">
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    aria-describedby="name"
                    id="name"
                    placeholder="Username"
                    v-model="form.name"
                    :feedbackInvalid="getError('name', 'Username field is required')"
                    :invalid="!validationResponse && !!getError('name')"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="email"
                    aria-describedby="email"
                    placeholder="Email"
                    v-model="form.email"
                    autocomplete="email"
                    id="email"
                    :invalid="!validationResponse && !!getError('email')"
                    :feedbackInvalid="getError('email', 'Email field is required')"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    aria-describedby="password"
                    type="password"
                    placeholder="Password"
                    v-model="form.password"
                    autocomplete="new-password"
                    id="password"
                    required
                    :invalid="!validationResponse && !!getError('password')"
                    :feedbackInvalid="getError('password', 'Password field is required')"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    aria-describedby="password_confirmation"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    id="new-password"
                    feedbackInvalid="Password retype field is required"
                    required
                    v-model="form.password_confirmation"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="primary" type="submit">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

const form = useForm('register-form', {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const formErrors = ref<Record<string, string>>({})

const getError = (key: string, defaultFeedback?: string): string | undefined => {
  return formErrors.value[key] ?? defaultFeedback
}

const validationResponse = ref(false)

const submit = (event: any) => {
  const formEvent = event.currentTarget
  if (formEvent.checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
    validationResponse.value = true
  } else {
    form.post(route('register'), {
      onFinish: () => {
        form.reset('password', 'password_confirmation')
      },
      onError: (error) => {
        formErrors.value = error
        validationResponse.value = false
      },
    })
  }
}
</script>
