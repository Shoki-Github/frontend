<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import ServiceFaq from '../components/ServiceFaq.vue'
import { serviceFaqs, brand } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'
import { apiRequest } from '../services/api'

const AI_SERVICE = 'AI Solutions'
const organisationTypes = ['Government', 'Development partner', 'NGO', 'Private sector', 'Individual']
const errors = ref({})
const failure = ref(false)
const submitted = ref(false)
const submitting = ref(false)
const form = reactive({
  name: '',
  organisation: '',
  organisation_type: '',
  email: '',
  phone: '',
  service_of_interest: '',
  preferred_language: 'English',
  message: '',
  company_website: '',
})

// Pre-fill from links such as /contact?service=...&course=... (Learn page).
const route = useRoute()
const requestedService = typeof route.query.service === 'string' ? route.query.service : ''
if (serviceLines.some((service) => service.title === requestedService) || requestedService === AI_SERVICE) {
  form.service_of_interest = requestedService
}
if (typeof route.query.course === 'string' && route.query.course.length <= 200) {
  form.message = `I would like to know more about the course "${route.query.course}".`
} else if (typeof route.query.topic === 'string' && route.query.topic.length <= 200) {
  form.message = `I would like to discuss: ${route.query.topic}.`
}

async function submit() {
  errors.value = {}
  failure.value = false
  submitted.value = false
  submitting.value = true

  try {
    await apiRequest('/contact-messages', {
      method: 'POST',
      body: { ...form, subject: 'Consultation request' },
    })
    submitted.value = true
    Object.assign(form, {
      name: '',
      organisation: '',
      organisation_type: '',
      email: '',
      phone: '',
      service_of_interest: '',
      preferred_language: 'English',
      message: '',
      company_website: '',
    })
  } catch (requestError) {
    console.error('Unable to submit the consultation request.', requestError)
    failure.value = true
    errors.value = requestError.errors || {}
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <PageBanner title="Request a Consultation" breadcrumb="Contact" subtitle="Tell us briefly what you need. We reply within two working days." large />

    <section class="bg-white px-5 py-14 md:py-16 lg:px-8">
      <div class="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-navy md:text-4xl">Start a conversation</h2>
          <p class="mt-4 max-w-xl text-base leading-7 text-muted">
            Share a little about your organisation, the work you are planning and what you need to measure.
          </p>

          <address class="mt-8 space-y-4 border-t border-[#e5dfcd] pt-6 text-base not-italic leading-7 text-muted">
            <p class="font-semibold text-navy">{{ brand.address }}</p>
            <p v-for="phone in brand.phoneNumbers" :key="phone">
              <a class="font-semibold text-brand hover:text-brand-dark" :href="`tel:${phone.replaceAll(' ', '')}`">{{ phone }}</a>
            </p>
            <p><a class="font-semibold text-brand hover:text-brand-dark" :href="`mailto:${brand.email}`">{{ brand.email }}</a></p>
          </address>

          <a
            class="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
            href="https://wa.me/255765785383?text=Hello%20CLM%20Consultants%2C%20I%20would%20like%20to%20discuss%E2%80%A6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>

        <form class="rounded-xl border border-[#e5dfcd] bg-white p-5 shadow-[0_12px_36px_rgba(27,42,74,0.07)] md:p-8" @submit.prevent="submit">
          <p v-if="submitted" class="mb-6 rounded-lg border border-[#a7d6ca] bg-[#edf7f3] p-4 text-base leading-6 text-navy" role="status">
            Thank you — we’ll be in touch within two working days.
          </p>
          <p v-if="failure" class="mb-6 rounded-lg border border-[#e3c88a] bg-[#fbf6e8] p-4 text-base leading-6 text-navy" role="alert">
            We couldn’t send your request just now. Please email <a class="font-semibold underline" :href="`mailto:${brand.email}`">{{ brand.email }}</a>.
          </p>

          <div class="grid gap-5 sm:grid-cols-2">
            <label class="field-label">Full name <span aria-hidden="true">*</span>
              <input v-model="form.name" class="field-input" autocomplete="name" required maxlength="200" />
              <span v-if="errors.name" class="field-error">{{ errors.name[0] }}</span>
            </label>
            <label class="field-label">Organisation <span aria-hidden="true">*</span>
              <input v-model="form.organisation" class="field-input" autocomplete="organization" required maxlength="200" />
              <span v-if="errors.organisation" class="field-error">{{ errors.organisation[0] }}</span>
            </label>
            <label class="field-label">Email <span aria-hidden="true">*</span>
              <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
              <span v-if="errors.email" class="field-error">{{ errors.email[0] }}</span>
            </label>
            <label class="field-label">Phone / WhatsApp
              <input v-model="form.phone" class="field-input" type="tel" autocomplete="tel" maxlength="40" />
              <span v-if="errors.phone" class="field-error">{{ errors.phone[0] }}</span>
            </label>
            <label class="field-label">Organisation type <span aria-hidden="true">*</span>
              <select v-model="form.organisation_type" class="field-input" required>
                <option disabled value="">Select an organisation type</option>
                <option v-for="type in organisationTypes" :key="type" :value="type">{{ type }}</option>
              </select>
              <span v-if="errors.organisation_type" class="field-error">{{ errors.organisation_type[0] }}</span>
            </label>
            <label class="field-label">Service of interest <span aria-hidden="true">*</span>
              <select v-model="form.service_of_interest" class="field-input" required>
                <option disabled value="">Select a service</option>
                <option v-for="service in serviceLines" :key="service.slug" :value="service.title">{{ service.title }}</option>
                <option :value="AI_SERVICE">{{ AI_SERVICE }}</option>
                <option value="Other">Other</option>
              </select>
              <span v-if="errors.service_of_interest" class="field-error">{{ errors.service_of_interest[0] }}</span>
            </label>
            <label class="field-label">Preferred language <span aria-hidden="true">*</span>
              <select v-model="form.preferred_language" class="field-input" required>
                <option>English</option>
                <option>Kiswahili</option>
              </select>
              <span v-if="errors.preferred_language" class="field-error">{{ errors.preferred_language[0] }}</span>
            </label>
            <label class="field-label sm:col-span-2">Message <span aria-hidden="true">*</span>
              <textarea v-model="form.message" class="field-input min-h-36 resize-y" required minlength="10" maxlength="5000"></textarea>
              <span v-if="errors.message" class="field-error">{{ errors.message[0] }}</span>
            </label>
          </div>

          <label class="honeypot" aria-hidden="true">
            Leave this field empty
            <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
          </label>

          <button class="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60" type="submit" :disabled="submitting">
            {{ submitting ? 'Sending…' : 'Send request' }}
          </button>
          <p class="mt-4 text-sm leading-6 text-muted">We’ll use your information to respond to this request. Please don’t include passwords or sensitive personal information.</p>
        </form>
      </div>
    </section>

    <section class="bg-paper px-5 py-14 md:py-16 lg:px-8">
      <ServiceFaq :items="serviceFaqs" />
    </section>
  </div>
</template>

<style scoped>
.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: var(--color-navy);
  font-size: 1rem;
  font-weight: 600;
}

.field-label > span:first-child,
.field-label > span[aria-hidden] {
  color: inherit;
}

.field-input {
  width: 100%;
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

.field-error {
  color: #8d2b24;
  font-size: 0.875rem;
  font-weight: 500;
}

.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
