<template>
  <Head title="Log in" />
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="submit" novalidate :validated="validationResponse">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username/Email"
                      autocomplete="username"
                      required
                      feedbackInvalid="This field is required"
                      v-model="form.email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                      feedbackInvalid="This field is required"
                      v-model="form.password"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CFormCheck id="flexCheckDefault" label="Remember me" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"> Forgot password? </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <Link :href="route('register')">
                    <CButton color="light" variant="outline" class="mt-3"> Register Now! </CButton>
                  </Link>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

defineProps<{
  canResetPassword?: boolean
  status?: string
}>()

const auth = useAuthStore()

const form = useForm({
  email: '',
  password: '',
  remember: false,
})

const validationResponse = ref(false)

const submit = (event: any) => {
  const formEvent = event.currentTarget
  if (formEvent.checkValidity() === false) {
    event.preventDefault()
    event.stopPropagation()
  }

  form.post(route('login'), {
    onFinish: () => {
      form.reset('password')
    },
  })
}
</script>
