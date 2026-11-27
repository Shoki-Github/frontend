<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageBanner from '../components/PageBanner.vue'
import ServiceFaq from '../components/ServiceFaq.vue'
import { serviceFaqs, brand } from '../data/siteContent'
import { serviceLines } from '../data/serviceLines'

const AI_SERVICE = 'AI Solutions'
const WHATSAPP_NUMBER = '255765785383'
const organisationTypes = ['Government', 'Development partner', 'NGO', 'Private sector', 'Individual']
const sent = ref('')
const failed = ref(false)
const submitting = ref(false)
const errors = ref({})
const emptyForm = {
  name: '',
  organisation: '',
  organisation_type: '',
  email: '',
  phone: '',
  service_of_interest: '',
  preferred_language: 'English',
  message: '',
  company_website: '',
}
const form = reactive({ ...emptyForm })

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

// The form is sent to /api/contact, which emails it to the CLM inbox.
// WhatsApp (or email, if sending fails) hands the request to the visitor's
// own app, already filled in with what they typed.
function composeText() {
  return [
    'Consultation request',
    '',
    `Name: ${form.name}`,
    `Organisation: ${form.organisation} (${form.organisation_type})`,
    `Email: ${form.email}`,
    form.phone ? `Phone / WhatsApp: ${form.phone}` : null,
    `Service of interest: ${form.service_of_interest}`,
    `Preferred language: ${form.preferred_language}`,
    '',
    form.message,
  ].filter((line) => line !== null).join('\n')
}

function openWhatsApp() {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(composeText())}`, '_blank', 'noopener')
  sent.value = 'whatsapp'
}

function openEmail() {
  const subject = `Consultation request: ${form.service_of_interest}`
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeText())}`
  sent.value = 'email'
}

async function sendRequest() {
  errors.value = {}
  failed.value = false
  sent.value = ''
  submitting.value = true
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    const payload = await response.json().catch(() => ({}))
    if (response.status === 422) {
      errors.value = payload.errors || {}
      return
    }
    if (!response.ok) throw new Error(payload.message || `Status ${response.status}`)
    sent.value = 'server'
    Object.assign(form, emptyForm)
  } catch (error) {
    console.error('Unable to send the consultation request.', error)
    failed.value = true
  } finally {
    submitting.value = false
  }
}

function submit(event) {
  if (event.submitter?.value === 'whatsapp') openWhatsApp()
  else sendRequest()
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
          <p v-if="sent === 'server'" class="mb-6 rounded-lg border border-[#a7d6ca] bg-[#edf7f3] p-4 text-base leading-6 text-navy" role="status">
            Thank you, your request has been sent. We’ll be in touch within two working days.
          </p>
          <p v-else-if="sent" class="mb-6 rounded-lg border border-[#a7d6ca] bg-[#edf7f3] p-4 text-base leading-6 text-navy" role="status">
            Your {{ sent === 'whatsapp' ? 'WhatsApp' : 'email app' }} should now be open with your request filled in. Press send there to reach us. If nothing opened, email <a class="font-semibold underline" :href="`mailto:${brand.email}`">{{ brand.email }}</a> directly.
          </p>
          <div v-if="failed" class="mb-6 rounded-lg border border-[#e3c88a] bg-[#fbf6e8] p-4 text-base leading-6 text-navy" role="alert">
            We couldn’t send your request just now. Your details are still in the form, so you can send them another way:
            <div class="mt-3 flex flex-wrap gap-3">
              <button class="inline-flex min-h-10 items-center rounded-md bg-brand px-4 text-sm font-bold text-white hover:bg-brand-dark" type="button" @click="openEmail">Send by email instead</button>
              <button class="inline-flex min-h-10 items-center rounded-md border border-brand px-4 text-sm font-bold text-brand hover:bg-brand hover:text-white" type="button" @click="openWhatsApp">Send on WhatsApp</button>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <label class="field-label">Full name <span aria-hidden="true">*</span>
              <input v-model="form.name" class="field-input" autocomplete="name" required maxlength="200" />
            </label>
            <label class="field-label">Organisation <span aria-hidden="true">*</span>
              <input v-model="form.organisation" class="field-input" autocomplete="organization" required maxlength="200" />
            </label>
            <label class="field-label">Email <span aria-hidden="true">*</span>
              <input v-model="form.email" class="field-input" type="email" autocomplete="email" required maxlength="255" />
            </label>
            <label class="field-label">Phone / WhatsApp
              <input v-model="form.phone" class="field-input" type="tel" autocomplete="tel" maxlength="40" />
            </label>
            <label class="field-label">Organisation type <span aria-hidden="true">*</span>
              <select v-model="form.organisation_type" class="field-input" required>
                <option disabled value="">Select an organisation type</option>
                <option v-for="type in organisationTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </label>
            <label class="field-label">Service of interest <span aria-hidden="true">*</span>
              <select v-model="form.service_of_interest" class="field-input" required>
                <option disabled value="">Select a service</option>
                <option v-for="service in serviceLines" :key="service.slug" :value="service.title">{{ service.title }}</option>
                <option :value="AI_SERVICE">{{ AI_SERVICE }}</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label class="field-label">Preferred language <span aria-hidden="true">*</span>
              <select v-model="form.preferred_language" class="field-input" required>
                <option>English</option>
                <option>Kiswahili</option>
              </select>
            </label>
            <label class="field-label sm:col-span-2">Message <span aria-hidden="true">*</span>
              <textarea v-model="form.message" class="field-input min-h-36 resize-y" required minlength="10" maxlength="5000"></textarea>
            </label>
          </div>

          <p v-if="Object.keys(errors).length" class="mt-5 text-sm font-medium text-[#8d2b24]" role="alert">
            <span v-for="(messages, field) in errors" :key="field" class="block">{{ messages[0] }}</span>
          </p>

          <label class="honeypot" aria-hidden="true">
            Leave this field empty
            <input v-model="form.company_website" tabindex="-1" autocomplete="off" />
          </label>

          <div class="mt-6 flex flex-wrap gap-3">
            <button class="inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60" type="submit" value="send" :disabled="submitting">
              {{ submitting ? 'Sending…' : 'Send request' }}
            </button>
            <button class="inline-flex min-h-12 items-center justify-center rounded-md border border-brand px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white" type="submit" value="whatsapp">
              Send on WhatsApp instead
            </button>
          </div>
          <p class="mt-4 text-sm leading-6 text-muted">We’ll use your information only to respond to this request. Please don’t include passwords or sensitive personal information.</p>
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
