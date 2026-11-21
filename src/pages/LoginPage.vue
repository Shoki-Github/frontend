<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const form = reactive({ email: '', password: '' })
const failed = ref(false)
const submitting = ref(false)

async function submit() {
  failed.value = false
  submitting.value = true
  try {
    await auth.login({ ...form })
    const redirect = route.query.redirect
    await router.push(typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/admin')
  } catch (error) {
    console.error('Staff sign-in failed.', error)
    failed.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="bg-paper px-5 py-14 md:py-20">
    <div class="mx-auto max-w-lg rounded-xl border border-[#e5dfcd] bg-white p-6 shadow-sm md:p-8">
      <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Staff area</p>
      <h1 class="mt-3 text-3xl font-bold tracking-tight text-navy">Staff sign in</h1>
      <p class="mt-3 text-base leading-7 text-muted">Sign in to manage consultations and approved website content.</p>
      <p v-if="failed" class="mt-5 rounded-lg border border-[#e3c88a] bg-[#fbf6e8] p-4 text-sm leading-6 text-navy" role="alert">
        We couldn’t sign you in. Check your details or contact the site administrator.
      </p>
      <form class="mt-6 space-y-5" @submit.prevent="submit">
        <label class="field-label">Email
          <input v-model="form.email" class="field-input" type="email" autocomplete="username" required />
        </label>
        <label class="field-label">Password
          <input v-model="form.password" class="field-input" type="password" autocomplete="current-password" required />
        </label>
        <button class="flex min-h-12 w-full items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting">
          {{ submitting ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-navy);
  font-size: 1rem;
  font-weight: 600;
}

.field-input {
  min-height: 3rem;
  border: 1px solid #d5cfbf;
  border-radius: 0.5rem;
  background: #fff;
  padding: 0.7rem 0.85rem;
  color: var(--color-navy);
  font-size: 1rem;
  font-weight: 400;
}

.field-input:focus {
  border-color: var(--color-brand);
  outline: 3px solid rgb(15 124 122 / 18%);
}
</style>
