<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Welcome" />
  <div style="text-align: center; margin-top: 100px">
    <h1>Welcome to Laravel + Inertia + CoreUI + Bootstrap Setup</h1>
    <div>
      <Link :href="route('login')">
        <CButton color="primary" class="mt-5"> Login Now! </CButton>
      </Link>
      <Link :href="route('register')">
        <CButton color="success" class="mt-5 ms-3"> Register Now! </CButton>
      </Link>
    </div>
  </div>
</template>
