<script setup>
import { useId } from 'vue'
import { RouterLink } from 'vue-router'
import { brand } from '../data/siteContent'

// No mailing-list server is connected yet, so joining opens the visitor's
// email app with a short, pre-written request to info@.
defineProps({
  source: { type: String, default: 'home' },
})

const id = useId()
const subject = 'Please add me to the CLM mailing list'
const body = [
  'Hello CLM Consultants,',
  '',
  'Please add me to your mailing list for MEL insights, toolkit guides and training dates.',
  '',
  'Name:',
  'Organisation:',
].join('\n')
const joinHref = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
</script>

<template>
  <section class="bg-navy px-5 py-14 text-white md:py-16 lg:px-8" :aria-labelledby="`${id}-heading`">
    <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
      <div>
        <p class="text-sm font-bold uppercase tracking-wide text-[#c9a227]">Stay in the loop</p>
        <h2 :id="`${id}-heading`" class="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Practical MEL insights, in your inbox.</h2>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-200">New toolkit guides, training dates and lessons from our work in Tanzania. Occasional emails, no spam, unsubscribe at any time.</p>
      </div>

      <div class="rounded-xl bg-white/10 p-6">
        <p class="text-base leading-7 text-slate-200">Send us a one-line email and we will add you to the list.</p>
        <a class="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark" :href="joinHref">
          Join by email
        </a>
        <p class="mt-4 text-sm leading-6 text-slate-300">
          We use your address only to send these updates. See our <RouterLink class="font-semibold text-white underline underline-offset-2" to="/privacy">privacy notice</RouterLink>.
        </p>
      </div>
    </div>
  </section>
</template>
