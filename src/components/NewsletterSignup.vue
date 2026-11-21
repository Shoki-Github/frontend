<script setup>
import { reactive, ref, useId } from 'vue'
import { RouterLink } from 'vue-router'
import { apiRequest } from '../services/api'

const props = defineProps({
  source: { type: String, default: 'home' },
})

const id = useId()
const form = reactive({ name: '', email: '', organisation: '', consent: false, company_website: '' })
const errors = ref({})
const submitting = ref(false)
const submitted = ref(false)
const failure = ref(false)

async function subscribe() {
  errors.value = {}
  failure.value = false
  submitting.value = true
  try {
    await apiRequest('/newsletter-subscriptions', {
      method: 'POST',
      body: { ...form, source: props.source },
    })
    submitted.value = true
  } catch (requestError) {
    console.error('Unable to subscribe to the newsletter.', requestError)
    errors.value = requestError.errors || {}
    failure.value = !Object.keys(errors.value).length
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="bg-navy px-5 py-14 text-white md:py-16 lg:px-8" :aria-labelledby="`${id}-heading`">
    <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
      <div>
        <p class="text-sm font-bold uppercase tracking-wide text-[#c9a227]">Stay in the loop</p>
        <h2 :id="`${id}-heading`" class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Practical MEL insights, in your inbox.</h2>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-200">New toolkit guides, training dates and lessons from our work in Tanzania. Occasional emails, no spam, unsubscribe at any time.</p>
      </div>

      <div v-if="submitted" class="rounded-xl bg-white/10 p-6" role="status">
        <h3 class="text-xl font-bold">Thank you for subscribing.</h3>
        <p class="mt-2 text-base leading-7 text-slate-200">We will be in touch with our next update.</p>
      </div>

      <form v-else class="grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="subscribe">
        <label class="grid gap-1.5 text-sm font-semibold">
          First name
          <input v-model="form.name" class="nl-input" type="text" autocomplete="given-name" maxlength="200" />
        </label>
        <label class="grid gap-1.5 text-sm font-semibold">
          Email <span class="sr-only">(required)</span>
          <input v-model="form.email" class="nl-input" type="email" autocomplete="email" required maxlength="255" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? `${id}-email-error` : undefined" />
          <span v-if="errors.email" :id="`${id}-email-error`" class="text-sm font-normal text-[#ffd7d7]">{{ errors.email[0] }}</span>
        </label>
        <label class="grid gap-1.5 text-sm font-semibold sm:col-span-2">
          Organisation
          <input v-model="form.organisation" class="nl-input" type="text" autocomplete="organization" maxlength="200" />
        </label>
        <label class="nl-honeypot" aria-hidden="true">
          Leave this field empty
          <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
        </label>
        <div class="sm:col-span-2">
          <label class="flex items-start gap-3 text-sm leading-6 text-slate-200">
            <input v-model="form.consent" class="mt-1 h-5 w-5 shrink-0 accent-[#0f766e]" type="checkbox" required :aria-invalid="!!errors.consent" />
            <span>I agree to receive email updates from CLM Consultants Limited. See our <RouterLink class="font-semibold text-white underline underline-offset-2" to="/privacy">privacy notice</RouterLink>.</span>
          </label>
          <p v-if="errors.consent" class="mt-1 text-sm text-[#ffd7d7]">{{ errors.consent[0] }}</p>
        </div>
        <div class="sm:col-span-2">
          <button class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-60" type="submit" :disabled="submitting">
            {{ submitting ? 'Subscribing…' : 'Subscribe' }}
          </button>
          <p v-if="failure" class="mt-3 text-sm text-[#ffd7d7]" role="alert">We couldn’t subscribe you right now. Please try again later.</p>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.nl-input {
  min-height: 2.9rem;
  border: 1px solid rgb(255 255 255 / 30%);
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 8%);
  padding: 0.6rem 0.8rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
}

.nl-input:focus {
  outline: 2px solid #c9a227;
  outline-offset: 1px;
}

.nl-honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
