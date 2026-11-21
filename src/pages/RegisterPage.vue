<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const form = reactive({ name: '', email: '', password: '', password_confirmation: '' })
const failed = ref(false)
const submitting = ref(false)

async function submit() {
  failed.value = false
  submitting.value = true
  try {
    await auth.register({ ...form })
    await router.push('/learn')
  } catch (error) {
    console.error('Account registration failed.', error)
    failed.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="bg-paper px-5 py-14 md:py-20">
    <div class="mx-auto max-w-lg rounded-xl border border-[#e5dfcd] bg-white p-6 shadow-sm md:p-8">
      <p class="text-sm font-bold uppercase tracking-[0.12em] text-brand">Courses &amp; Products</p>
      <h1 class="mt-3 text-3xl font-bold tracking-tight text-navy">Create an account</h1>
      <p class="mt-3 text-base leading-7 text-muted">Accounts will be available when courses and payments are launched.</p>
      <p v-if="failed" class="mt-5 rounded-lg border border-[#e3c88a] bg-[#fbf6e8] p-4 text-sm leading-6 text-navy" role="alert">
        We couldn’t create the account. Please try again later.
      </p>
      <form class="mt-6 space-y-5" @submit.prevent="submit">
        <label class="field-label">Name
          <input v-model="form.name" class="field-input" autocomplete="name" required maxlength="255" />
        </label>
        <label class="field-label">Email
          <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
        </label>
        <label class="field-label">Password
          <input v-model="form.password" class="field-input" type="password" autocomplete="new-password" required minlength="12" />
        </label>
        <label class="field-label">Confirm password
          <input v-model="form.password_confirmation" class="field-input" type="password" autocomplete="new-password" required />
        </label>
        <button class="flex min-h-12 w-full items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-bold text-white disabled:opacity-60" type="submit" :disabled="submitting">
          {{ submitting ? 'Creating account…' : 'Create account' }}
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
